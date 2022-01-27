import { readdirSync, readFileSync, readJsonFileSync } from '../fs'
import { compareVersion } from '../../../lib/string'
import { ElfData } from '../../../lib/honkai3rd/elfs'

const elfFileNameList = readdirSync('honkai3rd/elfs')
const elfDataList = elfFileNameList
  .map((fileName) => {
    const filePathname = 'honkai3rd/elfs/' + fileName
    const data = readJsonFileSync(filePathname) as ElfData

    const krDataFilePath = `honkai3rd/ko-KR/elfs/${data.id}.md`
    try {
      const krData = parseElfData(readFileSync(krDataFilePath).toString())
      data.krName = krData.name
      data.skillRows.forEach((skillRow, skillRowIndex) => {
        skillRow.forEach((skill, skillIndex) => {
          if (krData.skillRows?.[skillRowIndex]?.[skillIndex]?.name != null) {
            skill.krName = krData.skillRows?.[skillRowIndex]?.[skillIndex]?.name
          }
          if (
            krData.skillRows?.[skillRowIndex]?.[skillIndex]?.description != null
          ) {
            skill.krDescription =
              krData.skillRows?.[skillRowIndex]?.[skillIndex]?.description
          }
        })
      })
    } catch (error) {
      // console.warn('Failed to read', krDataFilePath)
      // console.warn(error)
    }

    return data
  })
  .sort((a, b) => {
    let compareResult = 0

    compareResult = compareVersion(b.version, a.version)

    if (compareResult !== 0) {
      return compareResult
    }
    compareResult = a.name
      .replace(/ \(.\)/, '')
      .localeCompare(b.name.replace(/ \(.\)/, ''))

    return compareResult
  })

const elfMap = elfDataList.reduce((map, elf) => {
  map.set(elf.id, elf)
  return map
}, new Map<string, ElfData>())

export function listElfs() {
  return elfDataList
}

export function getElfById(id: string) {
  return elfMap.get(id)
}

function parseElfData(rawData: string) {
  const [name, ...skillRowSections] = rawData.split('\n## ')
  const skillRows = skillRowSections.map((skillRowSection) => {
    const skillSections = skillRowSection.split('\n### ')
    return skillSections.map((skillSection) => {
      const [name, description] = skillSection
        .split('\n\n')
        .map((data) => data.replace(/#+\s/, '').trim())
      return {
        name,
        description: description.replace(/\\\*/g, '*'),
      }
    })
  })

  return {
    name: name.replace(/#+\s/, '').trim(),
    skillRows,
  }
}
