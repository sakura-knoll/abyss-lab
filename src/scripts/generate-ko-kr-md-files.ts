import { BattlesuitSkillGroup } from '../lib/honkai3rd/battlesuits'
import { existsSync, writeFileSync } from '../server/data/fs'
import { listBattlesuits } from '../server/data/honkai3rd/battlesuits'
import { listElfs } from '../server/data/honkai3rd/elfs'
import {
  listStigmata,
  listStigmataSet,
} from '../server/data/honkai3rd/stigmata'
import { listWeapons } from '../server/data/honkai3rd/weapons'

const locale = 'ko-KR'

export function generateStigmataData() {
  const stigmataList = listStigmata()

  stigmataList.forEach((stigmata) => {
    const krStigmataDataPath = `honkai3rd/${locale}/stigmata/${stigmata.id}.md`
    if (existsSync(krStigmataDataPath)) {
      return
    }

    writeFileSync(
      krStigmataDataPath,
      [
        `# ${stigmata.name}`,
        `## ${stigmata.skill.name}`,
        `${stigmata.skill.description}`,
      ].join('\n\n')
    )
  })
}

export function generateStigmataSetData() {
  const stigmataSetList = listStigmataSet()

  stigmataSetList.forEach((stigmataSet) => {
    const krStigmataSetDataPath = `honkai3rd/${locale}/stigmata-sets/${stigmataSet.id}.md`
    if (existsSync(krStigmataSetDataPath)) {
      return
    }

    writeFileSync(
      krStigmataSetDataPath,
      [
        `# ${stigmataSet.name}`,
        stigmataSet.altName,
        `## ${stigmataSet.twoSetSkill.name}`,
        `${stigmataSet.twoSetSkill.description}`,
        `## ${stigmataSet.threeSetSkill.name}`,
        `${stigmataSet.threeSetSkill.description}`,
      ].join('\n\n')
    )
  })
}

export function generateWeaponData() {
  const weaponList = listWeapons()

  weaponList.forEach((weapon) => {
    const krWeaponDataPath = `honkai3rd/${locale}/weapons/${weapon.id}.md`
    if (existsSync(krWeaponDataPath)) {
      return
    }

    writeFileSync(
      krWeaponDataPath,
      [
        `# ${weapon.name}`,
        ...weapon.skills.map((skill) => {
          return [`## ${skill.name}`, skill.description].join('\n\n')
        }),
      ].join('\n\n')
    )
  })
}

export function generateElfData() {
  const elfList = listElfs()

  elfList.forEach((elf) => {
    const krElfDataPath = `honkai3rd/${locale}/elfs/${elf.id}.md`
    if (existsSync(krElfDataPath)) {
      return
    }

    writeFileSync(
      krElfDataPath,
      [
        `# ${elf.name}`,
        ...elf.skillRows.map((skillRow) => {
          return skillRow
            .map((skill, index) => {
              return [
                `${index === 0 ? '##' : '###'} ${skill.name}`,
                skill.description,
              ].join('\n\n')
            })
            .join('\n\n')
        }),
      ].join('\n\n')
    )
  })
}

export function generateBattlesuitData() {
  const battlesuitList = listBattlesuits()

  battlesuitList.forEach((battlesuit) => {
    const krBattlesuitDataPath = `honkai3rd/${locale}/battlesuits/${battlesuit.id}.md`
    if (existsSync(krBattlesuitDataPath)) {
      return
    }

    writeFileSync(
      krBattlesuitDataPath,
      [
        `# ${battlesuit.name}`,
        stringifySkillGroup(battlesuit.leader),
        stringifySkillGroup(battlesuit.passive),
        stringifySkillGroup(battlesuit.evasion),
        stringifySkillGroup(battlesuit.special),
        stringifySkillGroup(battlesuit.ultimate),
        stringifySkillGroup(battlesuit.basic),
        battlesuit.sp != null ? stringifySkillGroup(battlesuit.sp) : '',
      ]
        .join('\n\n')
        .trim()
    )
  })
}
function stringifySkillGroup(skillGroup: BattlesuitSkillGroup) {
  return [
    `## ${skillGroup.core.name}`,
    skillGroup.core.description,
    ...skillGroup.subskills.map((subskill) => {
      return [`### ${subskill.name}`, subskill.description].join('\n\n')
    }),
  ]
    .join('\n\n')
    .trim()
}
