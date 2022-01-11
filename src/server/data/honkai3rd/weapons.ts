import { readdirSync, readFileSync, readJsonFileSync } from '../fs'
import { compareVersion } from '../../../lib/string'
import { WeaponData } from '../../../lib/honkai3rd/weapons'

const weaponsFileNameList = readdirSync('honkai3rd/weapons')
const weaponDataList = weaponsFileNameList
  .map((fileName) => {
    const filePathname = 'honkai3rd/weapons/' + fileName
    const data = readJsonFileSync(filePathname) as WeaponData

    const krDataFilePath = `honkai3rd/ko-KR/weapons/${data.id}.md`
    try {
      const krData = parseWeaponData(readFileSync(krDataFilePath).toString())

      data.krName = krData.name
      data.skills.forEach((skill, index) => {
        skill.krName = krData.skills[index].name
        skill.krDescription = krData.skills[index].description
      })
    } catch (error) {
      // console.warn('Failed to read', krDataFilePath)
      // console.warn(error)
    }

    return data
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

function parseWeaponData(rawData: string) {
  const [name, ...skillSections] = rawData
    .replace(/\\\*/g, '*')
    .split('## ')
    .map((data) => data.replace(/#+\s/, '').trim())
  const skills = skillSections.map((skillSection) => {
    const [skillName, skillDescription] = skillSection.split('\n\n')

    return {
      name: skillName,
      description: skillDescription,
    }
  })

  return {
    name,
    skills,
  }
}
