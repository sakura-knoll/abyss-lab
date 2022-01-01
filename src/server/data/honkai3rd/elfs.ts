import { readdirSync, readJsonFileSync } from '../fs'
import { compareVersion } from '../../../lib/string'
import { ElfData } from '../../../lib/honkai3rd/elfs'

const elfFileNameList = readdirSync('honkai3rd/elfs')
const elfDataList = elfFileNameList
  .map((fileName) => {
    const filePathname = 'honkai3rd/elfs/' + fileName
    const data = readJsonFileSync(filePathname) as ElfData

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
