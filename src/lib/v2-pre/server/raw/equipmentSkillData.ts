import { loadRawData } from './loadRawData'

export function getRawEquipmentSkillDataMap(): RawEquipmentSkillDataMap {
  return loadRawData('EquipmentSkillData.json')
}

export type RawEquipmentSkillDataMap = {
  [key: string]: RawEquipmentSkillData
}

export interface RawEquipmentSkillData {
  SkillName: number
  SkillDisplay: number
  SkillIconPath: string
  SkillCD: number
  SPCost: number
  SPNeed: number
  MaxChargesCount: number
  TagList: {
    TagID: number
    TagComment: number
  }[]
}
