import { readdirSync, readJsonFileSync } from '../../lib/data'

export interface WeaponSkill {
  name: string
  description: string
}

export interface WeaponData {
  id: string
  name: string
  atk: number
  crt: number
  category:
    | 'pistol'
    | 'cannon'
    | 'katana'
    | 'cross'
    | 'greatsword'
    | 'scythe'
    | 'lance'
    | 'gauntlet'
    | 'bow'
  rarity: number
  skills: WeaponSkill[]
  version?: number
}

const weaponsFileNameList = readdirSync('weapons')
const weaponDataList = weaponsFileNameList
  .map((fileName) => {
    const filePathname = 'weapons/' + fileName
    const data = readJsonFileSync(filePathname) as WeaponData

    return data
  })
  .sort((a, b) => {
    let compareResult = 0

    compareResult = b.rarity - a.rarity
    if (compareResult !== 0) {
      return compareResult
    }

    compareResult = (b.version || 0) - (a.version || 0)
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
