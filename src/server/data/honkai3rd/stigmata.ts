import { readdirSync, readFileSync, readJsonFileSync } from '../fs'
import { compareVersion } from '../../../lib/string'
import { StigmataData, StigmataSet } from '../../../lib/honkai3rd/stigmata'

const stigmataDataFileNameList = readdirSync('honkai3rd/stigmata')
const stigmataList = stigmataDataFileNameList
  .map((fileName) => {
    const filePathname = 'honkai3rd/stigmata/' + fileName
    const data = readJsonFileSync(filePathname) as StigmataData

    const krDataFilePath = `honkai3rd/ko-KR/stigmata/${data.id}.md`
    try {
      const krData = parseStigmataData(readFileSync(krDataFilePath).toString())

      data.krName = krData.name
      data.skill.krName = krData.skill.name
      data.skill.krDescription = krData.skill.description
    } catch (error) {
      // console.warn('Failed to read', krDataFilePath)
      // console.warn(error)
    }

    return data
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

const stigmataSetFileNameList = readdirSync('honkai3rd/stigmata-sets')
const stigmataSetList = stigmataSetFileNameList
  .map((fileName) => {
    const filePathname = 'honkai3rd/stigmata-sets/' + fileName
    const data = readJsonFileSync(filePathname) as StigmataSet

    const krDataFilePath = `honkai3rd/ko-KR/stigmata-sets/${data.id}.md`
    try {
      const krData = parseStigmataSetData(
        readFileSync(krDataFilePath).toString()
      )

      data.krName = krData.name
      data.krAltName = krData.altName
      data.twoSetSkill.krName = krData.twoSetSkill.name
      data.twoSetSkill.krDescription = krData.twoSetSkill.description
      data.threeSetSkill.krName = krData.threeSetSkill.name
      data.threeSetSkill.krDescription = krData.threeSetSkill.description
    } catch (error) {
      // console.warn('Failed to read', krDataFilePath)
      // console.warn(error)
    }

    return data
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

export function listStigmataSet() {
  return stigmataSetList
}

export function getStigmataListBySetId(setId: string) {
  return stigmataSetStigmataDataListMap.get(setId) || []
}

export function getStigmataSetBySetId(setId: string) {
  return stigmataSetMap.get(setId)
}

function parseStigmataData(rawData: string) {
  const [name, skillName, skillDescription] = rawData
    .replace(/\\\*/g, '*')
    .split('\n\n')
    .map((data) => data.replace(/#+\s/, '').trim())

  return {
    name,
    skill: {
      name: skillName,
      description: skillDescription,
    },
  }
}

function parseStigmataSetData(rawData: string) {
  const [
    name,
    altName,
    twoSetSkillName,
    twoSetSkillDescription,
    threeSetSkillName,
    threeSetSkillDescription,
  ] = rawData
    .replace(/\\\*/g, '*')
    .split('\n\n')
    .map((data) => data.replace(/#+\s/, '').trim())

  return {
    name,
    altName,
    twoSetSkill: {
      name: twoSetSkillName,
      description: twoSetSkillDescription,
    },
    threeSetSkill: {
      name: threeSetSkillName,
      description: threeSetSkillDescription,
    },
  }
}
