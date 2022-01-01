import { readdirSync, readJsonFileSync } from '../../../lib/data'
import { compareVersion } from '../../../lib/string'

export interface BattlesuitSkill {
  name: string
  description: string
  requiredRank: string
}
export interface BattlesuitSkillGroup {
  core: BattlesuitSkill
  subskills: BattlesuitSkill[]
}

export interface BattlesuitData {
  id: string
  version?: string
  name: string
  type: string
  valkyrie: string
  strengths: string[]
  leader: BattlesuitSkillGroup
  special: BattlesuitSkillGroup
  evasion: BattlesuitSkillGroup
  passive: BattlesuitSkillGroup
  ultimate: BattlesuitSkillGroup
  basic: BattlesuitSkillGroup
  sp?: BattlesuitSkillGroup
}

const battlesuitsFileNameList = readdirSync('honkai3rd/battlesuits')
const battlesuitDataList = battlesuitsFileNameList
  .map((fileName) => {
    const filePathname = 'honkai3rd/battlesuits/' + fileName
    const data = readJsonFileSync(filePathname) as BattlesuitData

    return data
  })
  .sort((a, b) => {
    let compareResult = compareVersion(b.version || '0.0', a.version || '0.0')
    if (compareResult !== 0) {
      return compareResult
    }
    compareResult = a.name
      .replace(/ \(.\)/, '')
      .localeCompare(b.name.replace(/ \(.\)/, ''))

    return compareResult
  })
const battlesuitMap = battlesuitDataList.reduce((map, stigmata) => {
  map.set(stigmata.id, stigmata)
  return map
}, new Map<string, BattlesuitData>())

export function listBattlesuits() {
  return battlesuitDataList
}

export function getBattlesuitById(id: string) {
  return battlesuitMap.get(id)
}
