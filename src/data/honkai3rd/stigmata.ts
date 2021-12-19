import fs from 'fs'
import { readdirSync, readJsonFileSync, resolvePathname } from '../../lib/data'

export interface StigmataSkill {
  name: string
  description: string
}

export interface StigmataData {
  id: string
  name: string
  skill: StigmataSkill
  ttk: number
  def: number
  crt: number
  set?: string
  type: 'top' | 'mid' | 'bot'
  hp: number
  rarity: 3 | 4 | 5
  version?: number
  hidden?: boolean
}

export interface StigmataSet {
  id: string
  name: string
  altName: string
  twoSetSkill: StigmataSkill
  threeSetSkill: StigmataSkill
  version?: number
}

const stigmataDataFileNameList = readdirSync('stigmata')
const stigmataList = stigmataDataFileNameList
  .map((fileName) => {
    const filePathname = 'stigmata/' + fileName
    const data = readJsonFileSync(filePathname) as StigmataData

    return data
  })
  .filter((stigmataData) => !stigmataData.hidden)
  .sort((a, b) => {
    let compareResult = b.rarity - a.rarity
    if (compareResult !== 0) {
      return compareResult
    }
    compareResult = (b.version || 0) - (a.version || 0)
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
const stigmataMap = stigmataList.reduce((map, stigmata) => {
  map.set(stigmata.id, stigmata)
  return map
}, new Map<string, StigmataData>())

const stigmataSetStigmataDataListMap = stigmataList.reduce((map, stigmata) => {
  if (stigmata.set != null) {
    let stigmataList = map.get(stigmata.set)
    if (stigmataList == null) {
      stigmataList = []
      map.set(stigmata.set, stigmataList)
    }
    stigmataList.push(stigmata)
  }
  return map
}, new Map<string, StigmataData[]>())

const stigmataSetFileNameList = readdirSync('stigmata-sets')
const stigmataSetList = stigmataSetFileNameList.map((fileName) => {
  const filePathname = 'stigmata-sets/' + fileName
  const data = readJsonFileSync(filePathname) as StigmataSet

  return data
})

const stigmataSetMap = stigmataSetList.reduce((map, stigmataSet) => {
  map.set(stigmataSet.id, stigmataSet)
  return map
}, new Map<string, StigmataSet>())

export function listStigmata() {
  return stigmataList
}

export function getStigmataById(id: string) {
  return stigmataMap.get(id)
}

export function getStigmataListBySetId(setId: string) {
  return stigmataSetStigmataDataListMap.get(setId) || []
}

export function getStigmataSetBySetId(setId: string) {
  return stigmataSetMap.get(setId)
}
