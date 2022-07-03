import { compareVersion } from '../../../lib/string'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'
import { omit } from 'ramda'

let cachedData: any = null

export function listWeapons(locale?: string): WeaponData[] {
  if (cachedData == null) {
    cachedData = yaml.parse(
      fs
        .readFileSync(path.join(process.cwd(), 'data/honkai3rd/weapons.yaml'))
        .toString('utf-8')
    )
  }
  const weapons = cachedData

  const localized = (weapons as any[])
    .map((weapon) => {
      return {
        ...omit(['krName', 'krDescription'], weapon),
        name: locale === 'ko-KR' ? weapon.krName : weapon.name,
        skills: weapon.skills.map((skill: any) => localizeSkill(skill)),
      } as any
    })
    .sort((a, b) => {
      let compareResult = 0

      compareResult = compareVersion(b.version || '0.0', a.version || '0.0')
      if (compareResult !== 0) {
        return compareResult
      }

      compareResult = b.rarity - a.rarity
      if (compareResult !== 0) {
        return compareResult
      }

      compareResult = a.name
        .replace(/ \(.\)/, '')
        .localeCompare(b.name.replace(/ \(.\)/, ''))

      return compareResult
    })

  return localized

  function localizeSkill(skill: any) {
    return {
      ...omit(['krName', 'krDescription'], skill),
      name: locale === 'ko-KR' ? skill.krName : skill.name,
      description: locale === 'ko-KR' ? skill.krDescription : skill.description,
    }
  }
}

export function getWeaponById(id: string, locale?: string) {
  return listWeapons(locale).find((weapon) => weapon.id === id, locale)
}

export function getWeaponMapByIds(idList: string[], locale?: string) {
  return idList.reduce<{ [key: string]: WeaponData }>((map, id) => {
    const weapon = getWeaponById(id, locale)
    if (weapon != null) {
      map[id] = weapon
    }
    return map
  }, {})
}
