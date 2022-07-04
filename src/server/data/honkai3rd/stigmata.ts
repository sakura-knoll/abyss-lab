import { compareVersion } from '../../../lib/string'
import { StigmataData } from '../../../lib/honkai3rd/stigmata'
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'
import { omit } from 'ramda'

let cachedStigmataData: any = null

export function listStigmata(locale?: string): StigmataData[] {
  if (cachedStigmataData == null) {
    cachedStigmataData = yaml.parse(
      fs
        .readFileSync(path.join(process.cwd(), 'data/honkai3rd/stigmata.yaml'))
        .toString('utf-8')
    )
  }
  const stigmata = cachedStigmataData

  const localized = (stigmata as any[])
    .map((stigma) => {
      return {
        ...omit(['krName', 'krDescription'], stigma),
        name: locale === 'ko-KR' ? stigma.krName : stigma.name,
        skill: localizeSkill(stigma.skill),
      } as any
    })
    .filter((stigmataData) => !stigmataData.hidden)
    .sort((a, b) => {
      let compareResult = b.rarity - a.rarity
      if (compareResult !== 0) {
        return compareResult
      }
      compareResult = compareVersion(b.version || '0.0', a.version || '0.0')
      if (compareResult !== 0) {
        return compareResult
      }
      compareResult = (a.set || 'ZZZZZ').localeCompare(b.set || 'ZZZZZ')
      if (compareResult !== 0) {
        return compareResult
      }
      compareResult = -a.type.localeCompare(b.type)
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

export function getStigmaById(id: string, locale?: string) {
  return listStigmata(locale).find((stigma) => stigma.id === id, locale)
}

let cachedStigmataSetsData: any = null

export function listStigmataSet(locale?: string): StigmataData[] {
  if (cachedStigmataSetsData == null) {
    cachedStigmataSetsData = yaml.parse(
      fs
        .readFileSync(
          path.join(process.cwd(), 'data/honkai3rd/stigmata-sets.yaml')
        )
        .toString('utf-8')
    )
  }
  const stigmataSets = cachedStigmataSetsData as any[]
  const localized = stigmataSets
    .map((stigmataSet) => {
      return {
        ...omit(['krName', 'krDescription'], stigmataSet),
        name: locale === 'ko-KR' ? stigmataSet.krName : stigmataSet.name,
        altName:
          locale === 'ko-KR' ? stigmataSet.krAltName : stigmataSet.altName,
        twoSetSkill: localizeSkill(stigmataSet.twoSetSkill),
        threeSetSkill: localizeSkill(stigmataSet.threeSetSkill),
      } as any
    })
    .filter((stigmataSet) => !stigmataSet.hidden)
    .sort((a, b) => {
      let compareResult = b.rarity - a.rarity
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
  return localized

  function localizeSkill(skill: any) {
    return {
      ...omit(['krName', 'krDescription'], skill),
      name: locale === 'ko-KR' ? skill.krName : skill.name,
      description: locale === 'ko-KR' ? skill.krDescription : skill.description,
    }
  }
}

export function getStigmataSetBySetId(setId: string, locale?: string) {
  return listStigmataSet(locale).find((set) => set.id === setId, locale)
}

export function getStigmataListBySetId(setId: string, locale?: string) {
  return ['top', 'mid', 'bot'].map((type) => {
    return getStigmaById(setId + '-' + type, locale)!
  })
}

export function getStigmataMapByIds(idList: string[], locale?: string) {
  return idList.reduce<{ [key: string]: StigmataData }>((map, id) => {
    const stigmata = getStigmaById(id, locale)
    if (stigmata != null) {
      map[id] = stigmata
    }
    return map
  }, {})
}
