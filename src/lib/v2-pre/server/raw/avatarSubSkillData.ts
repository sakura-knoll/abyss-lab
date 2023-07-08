import { loadRawData } from './loadRawData'

export function getRawAvatarSubSkillDataMap(): RawAvatarSubSkillDataMap {
  return loadRawData('AvatarSubSkillData.json')
}

export type RawAvatarSubSkillDataMap = {
  [key: string]: RawAvatarSubSkillData
}

export interface RawAvatarSubSkillData {
  Name: number
  Info: number
  Brief: number
  ShowOrder: number
  SkillId: number
  IgnoreLeader: false
  IconPath: string
  UnlockStar: number
  UnlockSubStar: number
  UnlockLv: number
  UnlockLvAdd: number
  MaxLv: number
  UpLevelSubStarNeedList: [
    {
      Level: number
      StarNeed: number
      SubStarNeed: number
    }
  ]
  ScoinCalc: false
  UnlockScoin: number
  ScoinLvAdd: number
  ItemType: number
  SkillToggle: boolean
  ParamBase_1: number
  ParamAdd_1: number
  ParamBase_2: number
  ParamAdd_2: number
  ParamBase_3: number
  ParamAdd_3: number
  CanTry: false
  ArtifactSkillID: number
  UpLevelArtifactNeedList: [
    {
      ArtifactLevel: number
      SubSkillLevel: number
    }
  ]
  TagList: {
    Strength: number
    TagID: number
    TagComment: number
  }[]
}
