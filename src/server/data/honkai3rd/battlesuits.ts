import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { omit } from 'ramda'

let parsedData: any = null

export function listBattlesuits(locale?: string): BattlesuitData[] {
  if (parsedData == null) {
    parsedData = yaml.parse(
      fs
        .readFileSync(
          path.join(process.cwd(), 'data/honkai3rd/battlesuits.yaml')
        )
        .toString('utf-8')
    )
  }
  const battlesuits = parsedData

  const localized = (battlesuits as any[]).map((battlesuit) => {
    return {
      ...omit(['krName', 'krDescription'], battlesuit),
      name: locale === 'ko-KR' ? battlesuit.krName : battlesuit.name,
      leader: localizeSkillGroup(battlesuit.leader),
      passive: localizeSkillGroup(battlesuit.passive),
      evasion: localizeSkillGroup(battlesuit.evasion),
      special: localizeSkillGroup(battlesuit.special),
      ultimate: localizeSkillGroup(battlesuit.ultimate),
      basic: localizeSkillGroup(battlesuit.basic),
      sp: battlesuit.sp != null ? localizeSkillGroup(battlesuit.sp) : null,
    } as any
  })

  return localized

  function localizeSkillGroup(skillGroup: any) {
    return {
      core: localizeSkill(skillGroup.core),
      subskills: skillGroup.subskills.map((subskill: any) =>
        localizeSkill(subskill)
      ),
    }
  }

  function localizeSkill(skill: any) {
    return {
      ...omit(['krName', 'krDescription'], skill),
      name: locale === 'ko-KR' ? skill.krName : skill.name,
      description: locale === 'ko-KR' ? skill.krDescription : skill.description,
    }
  }
}

export function getBattlesuitById(id: string, locale?: string) {
  return listBattlesuits(locale).find((battlesuit) => battlesuit.id === id)
}

export function getBattlesuitMapByIds(idList: string[], locale?: string) {
  return idList.reduce<{ [key: string]: BattlesuitData }>((map, id) => {
    const battlesuit = getBattlesuitById(id, locale)
    if (battlesuit != null) {
      map[id] = battlesuit
    }
    return map
  }, {})
}
