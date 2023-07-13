import { loadRawData } from './loadRawData'

export function getRawGodWarAvatarAbilityMap(): RawGodWarAvatarAbilityMap {
  return loadRawData('GodWarAvatarAbility.json')
}

export type RawGodWarAvatarAbilityMap = {
  [key: string]: RawGodWarAvatarAbility
}

export interface RawGodWarAvatarAbility {
  AbilityType: number
  AbilityTitle: number
  AbilityDes: number
  AbilityIcon: string
  IsShowInAvatarChallenge: boolean
}
