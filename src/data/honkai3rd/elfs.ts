import { readdirSync, readJsonFileSync } from '../../lib/data'

export interface ElfSkill {
  type: 'passive' | 'basic' | 'ultimate' | 'team'
  name: string
  requiredRank: number
  description: string
}

export interface ElfData {
  id: string
  name: string
  baseRank: number
  strengths: string[]
  skillRows: [ElfSkill[], ElfSkill[], ElfSkill[], ElfSkill[]]
  version: number
}

const elfFileNameList = readdirSync('elfs')
const elfDataList = elfFileNameList
  .map((fileName) => {
    const filePathname = 'elfs/' + fileName
    const data = readJsonFileSync(filePathname) as ElfData

    return data
  })
  .sort((a, b) => {
    let compareResult = 0

    compareResult = -a.version + b.version

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
