import { loadRawData } from './loadRawData'

export function getRawGodWarSupportAvatarMap(): RawGodWarSupportAvataMap {
  return loadRawData('GodWarSupportAvatar.json')
}

export type RawGodWarSupportAvataMap = {
  [key: string]: {
    [key: string]: RawGodWarSupportAvatarData
  }
}

export interface RawGodWarSupportAvatarData {
  SkillFunctionName: string
  AbilityName: string
  ParamList: string[]
  CD: number
  SkillName: number
  SkillDesc: number
  SkillIcon: string
  UnlockSupportAvatarHint: number
  IsSkillChange: boolean
}
