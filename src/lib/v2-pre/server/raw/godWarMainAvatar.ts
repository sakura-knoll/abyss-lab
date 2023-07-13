import { loadRawData } from './loadRawData'

export function getRawGodWarMainAvatarMap(): RawGodWarMainAvataMap {
  return loadRawData('GodWarMainAvatar.json')
}

export type RawGodWarMainAvataMap = {
  [key: string]: {
    [key: string]: RawGodWarAvatarData
  }
}

export interface RawGodWarAvatarData {
  AbilityName: string
  ParamList: string[]
  StepUnlockMissionMap: {
    MissionID: number
    StepID: number
  }[]
  AvatarAbilityID: number[]
  AvatarMissionList: number[]
  RecommendLink: string
  AvatarChallengeStageIDList: number[]
}
