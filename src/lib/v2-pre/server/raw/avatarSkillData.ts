import { loadRawData } from './loadRawData'

export function getRawAvatarSkillDataMap(): RawAvatarSkillDataMap {
  return loadRawData('AvatarSkillData.json')
}

export type RawAvatarSkillDataMap = {
  [key: string]: RawAvatarSkillData
}

export interface RawAvatarSkillData {
  Name: number
  Info: number
  ShowOrder: number
  UnlockLv: number
  UnlockStar: number
  SkillStep: number
  IconPath: string
  IconPathInLevel: string
  ButtonName: string
  ParamBase_1: number
  ParamLogic_1: number
  ParamSubID_1: number
  ParamSubIndex_1: number
  ParamBase_2: number
  ParamLogic_2: number
  ParamSubID_2: number
  ParamSubIndex_2: number
  ParamBase_3: number
  ParamLogic_3: number
  ParamSubID_3: number
  ParamSubIndex_3: number
  CanTry: number
  TagList: {
    Strength: number
    TagID: number
    TagComment: number
  }[]
  UnlockItemList: number[]
}
