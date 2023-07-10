import { loadRawData } from './loadRawData'

export function getRawWeaponDataMap(): RawWeaponDataMap {
  return loadRawData('WeaponData.json')
}

export type RawWeaponDataMap = {
  [key: string]: RawWeaponData
}

export interface RawWeaponData {
  Rarity: 1 | 2 | 3 | 4 | 5 | 6
  MaxRarity: number
  SubRarity: number
  SubMaxRarity: number
  Cost: number
  PowerType: number
  MaxLv: number
  ExpType: number
  SellPriceBase: number
  SellPriceAdd: number
  GearExpProvideBase: number
  GearExpPorvideAdd: number
  BaseType: number
  BodyMod: string
  DisplayTitle: number
  DisplayDescription: number
  IconPath: string
  ImagePath: '0'
  HPBase: number
  HPAdd: number
  SPBase: number
  SPAdd: number
  AttackBase: number
  AttackAdd: number
  DefenceBase: number
  DefenceAdd: number
  CriticalBase: number
  CriticalAdd: number
  ResistanceBase: number
  ResistanceAdd: number
  EvoMaterial: {
    ID: number
    Num: number
  }[]
  EvoPlayerLevel: number
  EvoID: number
  Prop1ID: number
  Prop1Param1: number
  Prop1Param2: number
  Prop1Param3: number
  Prop1Param1Add: number
  Prop1Param2Add: number
  Prop1Param3Add: number
  Prop2ID: number
  Prop2Param1: number
  Prop2Param2: number
  Prop2Param3: number
  Prop2Param1Add: number
  Prop2Param2Add: number
  Prop2Param3Add: number
  Prop3ID: number
  Prop3Param1: number
  Prop3Param2: number
  Prop3Param3: number
  Prop3Param1Add: number
  Prop3Param2Add: number
  Prop3Param3Add: number
  Protect: boolean
  ExDisjoinCurrencyCost: number
  ExDisjoinAddMaterial: []
  DisjoinScoinCost: number
  DisjoinAddMaterial: []
  WeaponMainID: number
  LinkIDList: []
  WeaponQuality: number
  SellPriceID: number
  Transcendent: false
  Target: number
  GachaMainDropDisplayConfig: number[]
  GachaGiftDropDisplayConfig: []
  PreloadEffectFolderPath: string
  WeaponFilterList: number[]
  SoundBanks: []
  CollaborationWeaponID: number
  AvatarCustomDisplayID: number
}
