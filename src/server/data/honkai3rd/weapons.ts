import { readdirSync, readJsonFileSync } from '../fs'
import { compareVersion } from '../../../lib/string'
import { WeaponData } from '../../../lib/honkai3rd/weapons'

const weaponsFileNameList = readdirSync('honkai3rd/weapons')
const weaponDataList = weaponsFileNameList
  .map((fileName) => {
    const filePathname = 'honkai3rd/weapons/' + fileName
    const data = readJsonFileSync(filePathname) as WeaponData

    return data
  })
  .sort((a, b) => {
    let compareResult = 0

    compareResult = b.rarity - a.rarity
    if (compareResult !== 0) {
      return compareResult
    }

    compareResult = compareVersion(b.version || '0.0', a.version || '0.0')
    if (compareResult !== 0) {
      return compareResult
    }

    compareResult = a.name
      .replace(/ \(.\)/, '')
      .localeCompare(b.name.replace(/ \(.\)/, ''))

    return compareResult
  })
const weaponMap = weaponDataList.reduce((map, weapon) => {
  map.set(weapon.id, weapon)
  return map
}, new Map<string, WeaponData>())

export function listWeapons() {
  return weaponDataList
}

export function getWeaponById(id: string) {
  return weaponMap.get(id)
}
