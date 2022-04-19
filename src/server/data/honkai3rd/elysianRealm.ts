import { readFileSync, readJsonFileSync } from '../fs'
import {
  parseSignetId,
  PopulatedSignetGroup,
  RemembranceSigil,
  remembranceSigilIds,
  SignetData,
  signetGroups,
  SignetSet,
  SupportBattlesuit,
  supportBattlesuitIds,
} from '../../../lib/honkai3rd/elysianRealm'
import { getBattlesuitById } from './battlesuits'

const signetGroupMap = signetGroups.reduce<{
  [key: string]: PopulatedSignetGroup
}>((map, group) => {
  let populatedGroup = map[group.id]
  if (populatedGroup == null) {
    populatedGroup = {
      id: group.id,
      name: group.name,
      altName: group.altName,
      sets: [],
    }
  }

  for (const setId of group.setIds) {
    const rawSetData = readFileSync(
      `honkai3rd/elysianRealm/signets/${setId}.md`
    ).toString()

    const [, setType, setIndex] = parseSignetId(setId)

    const name =
      group.id === 'elysia'
        ? `${getBattlesuitById(setType)!.name} Exclusive Signets`
        : `${setType === 'nexus' ? 'Nexus Signets' : 'Normal Signets'}${
            setIndex != null ? ` ${setIndex}` : ''
          }`
    const signetSet: SignetSet = {
      id: setId,
      name,
      signets: [],
    }

    if (setId.startsWith('elysia-') || setId.endsWith('normal')) {
      const signets = parseNormalSignetsRawData(setId, rawSetData)
      signetSet.signets.push(...signets)
    } else {
      const signets = parseNexusSignetsRawData(setId, rawSetData)
      signetSet.signets.push(...signets)
    }

    populatedGroup.sets.push(signetSet)
  }
  map[group.id] = populatedGroup

  return map
}, {})

const krSignetGroupMap = signetGroups.reduce<{
  [key: string]: PopulatedSignetGroup
}>((map, group) => {
  let populatedGroup = map[group.id]
  if (populatedGroup == null) {
    populatedGroup = {
      id: group.id,
      name: group.krName,
      altName: group.krAltName,
      sets: [],
    }
  }

  for (const setId of group.setIds) {
    const rawSetData = readFileSync(
      `honkai3rd/ko-KR/elysianRealm/signets/${setId}.md`
    ).toString()

    const [, setType, setIndex] = parseSignetId(setId)

    const name =
      group.id === 'elysia'
        ? `${getBattlesuitById(setType)!.krName} 전용 각인`
        : `${setType === 'nexus' ? '증폭 각인' : '일반 각인'}${
            setIndex != null ? ` ${setIndex}` : ''
          }`
    const signetSet: SignetSet = {
      id: setId,
      name,
      signets: [],
    }

    if (setId.startsWith('elysia-') || setId.endsWith('normal')) {
      const signets = parseNormalSignetsRawData(setId, rawSetData)
      signetSet.signets.push(...signets)
    } else {
      const signets = parseNexusSignetsRawData(setId, rawSetData)
      signetSet.signets.push(...signets)
    }

    populatedGroup.sets.push(signetSet)
  }
  map[group.id] = populatedGroup

  return map
}, {})

export function getSignetGroupById(id: string, locale = 'en-US') {
  if (locale === 'ko-KR') {
    return krSignetGroupMap[id]
  }
  return signetGroupMap[id]
}

export function getSupportBattlesuits(locale?: string) {
  return supportBattlesuitIds.map<SupportBattlesuit>((battlesuitId) => {
    const battlesuit = getBattlesuitById(battlesuitId)!
    const {
      skillName,
      description,
      cooldown,
    }: { skillName: string; description: string; cooldown: number } =
      readJsonFileSync(
        `honkai3rd/elysianRealm/supportBattlesuits/${battlesuitId}.json`
      )

    let localizedName = battlesuit.name
    let localizedSkillName = skillName
    let localizedDescription = description

    if (locale === 'ko-KR') {
      const [krSkillName, ...krDescriptionLines] = readFileSync(
        `honkai3rd/ko-KR/elysianRealm/supportBattlesuits/${battlesuitId}.md`
      )
        .toString()
        .trim()
        .slice(2)
        .split('\n\n')

      localizedName = battlesuit.krName!
      localizedSkillName = krSkillName
      localizedDescription = krDescriptionLines.join('\n').trim()
    }

    return {
      id: battlesuitId,
      name: localizedName,
      skillName: localizedSkillName,
      description: localizedDescription,
      cooldown,
    }
  })
}
export function getRemembranceSigils(locale?: string) {
  return remembranceSigilIds.map<RemembranceSigil>((sigilId) => {
    const rawDataPathname =
      locale === 'ko-KR'
        ? `honkai3rd/ko-KR/elysianRealm/remembranceSigils/${sigilId}.md`
        : `honkai3rd/elysianRealm/remembranceSigils/${sigilId}.md`
    const [name, ...descriptionLines] = readFileSync(rawDataPathname)
      .toString()
      .trim()
      .slice(2)
      .split('\n\n')

    return {
      id: sigilId,
      name: name.trim(),
      description: descriptionLines.join('\n').trim(),
    }
  })
}

function parseNormalSignetsRawData(setId: string, data: string) {
  const signetSections = data.replace(/\\\*/g, '*').slice(2).split('\n# ')
  const signets: SignetData[] = []
  for (const index in signetSections) {
    const section = signetSections[index]
    const [name, description, ...upgradeTextBlocks] = section.split('\n\n')
    const upgradeList = upgradeTextBlocks
      .join('\n\n')
      .split('## ')
      .slice(1)
      .map((upgradeTextBlock) => {
        const [name, description] = upgradeTextBlock.split('\n\n')
        return {
          name,
          description,
          krName: name,
          krDescription: description,
        }
      })
    signets.push({
      id: `${setId}-${index + 1}`,
      name,
      description,
      upgrades: upgradeList,
    })
  }
  return signets
}

function parseNexusSignetsRawData(setId: string, data: string) {
  const signetSections = data.replace(/\\\*/g, '*').slice(2).split('\n## ')
  const coreSignetSection = signetSections.shift()
  const [coreSignetName, coreSignetDescription] =
    coreSignetSection!.split('\n\n')
  const coreSignet = {
    id: `${setId}-1`,
    name: coreSignetName,
    description: coreSignetDescription,
    krName: coreSignetName,
    krDescription: coreSignetDescription,
    upgrades: [],
  }
  const signets: SignetData[] = []
  signets.push(coreSignet)
  for (const index in signetSections) {
    const section = signetSections[index]
    const [name, description, ...upgradeTextBlocks] = section.split('\n\n')
    const upgradeList = upgradeTextBlocks
      .join('\n\n')
      .split('### ')
      .slice(1)
      .map((upgradeTextBlock) => {
        const [name, description] = upgradeTextBlock.split('\n\n')
        return {
          name,
          description,
          krName: name,
          krDescription: description,
        }
      })
    signets.push({
      id: `${setId}-${index + 2}`,
      name,
      description,
      upgrades: upgradeList,
    })
  }
  return signets
}
