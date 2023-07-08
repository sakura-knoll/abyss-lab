import { loadRawData } from './loadRawData'

export function getRawAvatarDataMap(): RawAvatarDataMap {
  return loadRawData('AvatarData.json')
}

export type RawAvatarDataMap = {
  [key: string]: RawAvatarData
}

export interface RawAvatarData {
  ClassID: number
  RoleID: number
  AvatarType: number
  FullName: number
  ShortName: number
  RomaName: number
  Desc: number
  AvatarRegistryKey: number
  WeaponBaseTypeList: number[]
  UnlockStar: number
  SkillList: number[]
  Attribute: number
  InitialWeapon: number
  AvatarCardID: number
  AvatarFragmentID: number
  ArtifactFragmentID: number
  UltraSkillID: number
  CaptainSkillID: number
  SKL01SP: number
  SKL01SPNeed: number
  SKL01Charges: number
  SKL01CD: number
  SKL02SP: number
  SKL02SPNeed: number
  SKL02Charges: number
  SKL02CD: number
  SKL03SP: number
  SKL03SPNeed: number
  SKL03Charges: number
  SKL03CD: number
  SKL02ArtifactCD: number
  SKL02ArtifactSP: number
  SKL02ArtifactSPNeed: number
  BaseAvatarID: number
  FirstName: number
  LastName: number
  EnFirstName: number
  EnLastName: number
  UISelectVoice: string
  UILevelUpVoice: string
  DA_Name: string
  DA_Type: string
  ArtifactID: number
  IsEasterner: boolean
  FaceAnimationGroupName: string
  AvatarEffects: number[]
  TagUnlockList: number[]
  DefaultDressId: number
  AvatarStarUpType: number
  AvatarStarSourceID: number[]
  IsCollaboration: boolean
  StarUpBG: string
}
