import { compareVersion } from '../../../lib/string'
import { ElfData } from '../../../lib/honkai3rd/elfs'
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'
import { omit } from 'ramda'

let cachedData: any = null

export function listElfs(locale?: string): ElfData[] {
  if (cachedData == null) {
    cachedData = yaml.parse(
      fs
        .readFileSync(path.join(process.cwd(), 'data/honkai3rd/elfs.yaml'))
        .toString('utf-8')
    )
  }
  const elfs = cachedData

  const localized = (elfs as any[])
    .map((elf) => {
      return {
        ...omit(['krName', 'krDescription'], elf),
        name: locale === 'ko-KR' ? elf.krName : elf.name,
        skillRows: elf.skillRows.map((row: any[]) => row.map(localizeSkill)),
      } as any
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

  return localized

  function localizeSkill(skill: any) {
    return {
      ...omit(['krName', 'krDescription'], skill),
      name: locale === 'ko-KR' ? skill.krName : skill.name,
      description: locale === 'ko-KR' ? skill.krDescription : skill.description,
    }
  }
}

export function getElfById(id: string, locale?: string) {
  return listElfs(locale).find((elf) => elf.id === id, locale)
}
