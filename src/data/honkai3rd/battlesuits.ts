import { readdirSync, readJsonFileSync } from '../../lib/data'

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

const battlesuitsFileNameList = readdirSync('battlesuits')
const battlesuitDataList = battlesuitsFileNameList
  .map((fileName) => {
    const filePathname = 'battlesuits/' + fileName
    const data = readJsonFileSync(filePathname) as BattlesuitData

    return data
  })
  .sort((a, b) => {
    let compareResult = a.name
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
