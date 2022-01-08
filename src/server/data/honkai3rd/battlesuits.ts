import { readdirSync, readFileSync, readJsonFileSync } from '../fs'
import { compareVersion } from '../../../lib/string'
import {
  BattlesuitData,
  BattlesuitSkillGroup,
} from '../../../lib/honkai3rd/battlesuits'

const battlesuitsFileNameList = readdirSync('honkai3rd/battlesuits')
const battlesuitDataList = battlesuitsFileNameList
  .map((fileName) => {
    const filePathname = 'honkai3rd/battlesuits/' + fileName
    const data = readJsonFileSync(filePathname) as BattlesuitData

    const krDataFilePath = `honkai3rd/ko-KR/battlesuits/${data.id}.md`
    try {
      const krData = parseSkillData(readFileSync(krDataFilePath).toString())

      data.krName = krData.name
      assignKrDataToSkill(data.leader, krData.leader)
      assignKrDataToSkill(data.passive, krData.passive)
      assignKrDataToSkill(data.evasion, krData.evasion)
      assignKrDataToSkill(data.special, krData.special)
      assignKrDataToSkill(data.ultimate, krData.ultimate)
      assignKrDataToSkill(data.basic, krData.basic)
      if (data.sp != null && krData.sp != null) {
        assignKrDataToSkill(data.sp, krData.sp)
      }
    } catch (error) {
      // console.warn('Failed to read', krDataFilePath)
      // console.warn(error)
    }
    return data
  })
  .sort((a, b) => {
    let compareResult = compareVersion(b.version || '0.0', a.version || '0.0')
    if (compareResult !== 0) {
      return compareResult
    }
    compareResult = a.name
      .replace(/ \(.\)/, '')
      .localeCompare(b.name.replace(/ \(.\)/, ''))

    return compareResult
  })
const battlesuitMap = battlesuitDataList.reduce((map, stigmata) => {
  map.set(stigmata.id, stigmata)
  return map
}, new Map<string, BattlesuitData>())

export function listBattlesuits() {
  return battlesuitDataList
}

export function getBattlesuitById(id: string) {
  return battlesuitMap.get(id)
}

function parseSkillData(rawData: string) {
  const [
    nameSection,
    leaderSection,
    passiveSection,
    evasionSection,
    specialSection,
    ultimateSection,
    basicSection,
    spSection,
  ] = rawData.split('\n## ')

  const name = nameSection.replace('#', '').trim()

  return {
    name,
    leader: parseSkillSection(leaderSection),
    passive: parseSkillSection(passiveSection),
    evasion: parseSkillSection(evasionSection),
    special: parseSkillSection(specialSection),
    ultimate: parseSkillSection(ultimateSection),
    basic: parseSkillSection(basicSection),
    sp: spSection != null ? parseSkillSection(spSection) : undefined,
  }
}

function parseSkillSection(rawData: string) {
  const [coreSection, ...subskillSections] = rawData.split('\n### ')

  const [coreName, ...descriptionLines] = coreSection.trim().split('\n')

  return {
    core: {
      name: coreName,
      description: descriptionLines.join('\n').trim(),
    },
    subskills: subskillSections.map((subskillSection) => {
      const [subskillName, ...subskillDescriptionLines] = subskillSection
        .trim()
        .split('\n')

      return {
        name: subskillName,
        description: subskillDescriptionLines.join('\n').trim(),
      }
    }),
  }
}

function assignKrDataToSkill(
  skillGroup: BattlesuitSkillGroup,
  krDataSkillGroup: BattlesuitSkillGroup
) {
  skillGroup.core.krName = krDataSkillGroup.core.name
  skillGroup.core.krDescription = krDataSkillGroup.core.description.replace(
    /\\\*/g,
    '*'
  )
  skillGroup.subskills.forEach((subskill, index) => {
    subskill.krName = krDataSkillGroup.subskills[index].name
    subskill.krDescription = krDataSkillGroup.subskills[
      index
    ].description.replace(/\\\*/g, '*')
  })
}
