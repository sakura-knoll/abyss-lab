import {
  PopulatedSignetGroup,
  RemembranceSigil,
  SupportBattlesuit,
} from '../../../lib/honkai3rd/elysianRealm'
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'
import { omit } from 'ramda'

let cachedSignetGroupMap: any = null

export function getSignetGroupMap(locale?: string): {
  [key: string]: PopulatedSignetGroup
} {
  if (cachedSignetGroupMap == null) {
    cachedSignetGroupMap = yaml.parse(
      fs
        .readFileSync(
          path.join(process.cwd(), 'data/honkai3rd/er-signets.yaml')
        )
        .toString('utf-8')
    )
  }
  const signetGroupMap = cachedSignetGroupMap

  const localized = Object.entries(signetGroupMap as any).reduce(
    (map, [groupId, group]: [string, any]) => {
      const sets = group.sets.map((set: any) => {
        const signets = (set.signets as any[]).map((signet) => {
          return {
            ...localizeSignet(signet),
            upgrades: signet.upgrades.map(localizeSignet),
          }
        })
        return {
          ...omit(['krName'], set),
          name: locale === 'ko-KR' ? set.krName : set.name,
          signets,
        }
      })
      map[groupId] = {
        ...omit(['krName', 'krAltName'], group),
        name: locale === 'ko-KR' ? group.krName : group.name,
        altName: locale === 'ko-KR' ? group.krAltName : group.altName,
        sets,
      }
      return map
    },
    {} as any
  )

  return localized

  function localizeSignet(signet: any) {
    return {
      ...omit(['krName', 'krDescription'], signet),
      name: locale === 'ko-KR' ? signet.krName : signet.name,
      description:
        locale === 'ko-KR' ? signet.krDescription : signet.description,
    }
  }
}

export function getSignetGroupById(id: string, locale = 'en-US') {
  const signetGroup = getSignetGroupMap(locale)
  return signetGroup[id]
}

let cachedSupports: any = null

export function getSupportBattlesuits(locale?: string): SupportBattlesuit[] {
  if (cachedSupports == null) {
    cachedSupports = yaml.parse(
      fs
        .readFileSync(
          path.join(process.cwd(), 'data/honkai3rd/er-supports.yaml')
        )
        .toString('utf-8')
    )
  }
  const supports = cachedSupports

  const localized = supports.map((support: any) => {
    return {
      ...omit(['krName', 'krSkillName', 'krDescription'], support),
      name: locale === 'ko-KR' ? support.krName : support.name,
      skillName: locale === 'ko-KR' ? support.krSkillName : support.skillName,
      description:
        locale === 'ko-KR' ? support.krDescription : support.description,
    }
  })

  return localized
}

let cachedSigils: any = null

export function getRemembranceSigils(locale?: string): RemembranceSigil[] {
  if (cachedSigils == null) {
    cachedSigils = yaml.parse(
      fs
        .readFileSync(path.join(process.cwd(), 'data/honkai3rd/er-sigils.yaml'))
        .toString('utf-8')
    )
  }
  const sigils = cachedSigils

  const localized = sigils.map((sigil: any) => {
    return {
      ...omit(['krName', 'krDescription'], sigil),
      name: locale === 'ko-KR' ? sigil.krName : sigil.name,
      description: locale === 'ko-KR' ? sigil.krDescription : sigil.description,
    }
  })

  return localized
}
