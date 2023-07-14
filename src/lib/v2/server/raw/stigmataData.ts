import { loadRawData } from './loadRawData'

export function getRawStigmataDataMap(): RawStigmataDataMap {
  return loadRawData('StigmataData.json')
}

export type RawStigmataDataMap = {
  [key: string]: RawStigmaData
}

export interface RawStigmaData {
  Rarity: 1 | 2 | 3 | 4 | 5
  MaxRarity: 1 | 2 | 3 | 4 | 5
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
  LabelPath: string
  DisplayTitle: number
  DisplayDescription: number
  DisplayNumber: number
  IconPath: string // 'SpriteOutput/StigmataIcons/S1A_1'
  ImagePath: string // 'S1A_1'
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
  DurabilityMax: number
  EvoMaterial: [
    {
      ID: number
      Num: number
    }
  ]
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
  SetID: number
  SmallIcon: string
  TattooPath: string
  OffsetX: number
  OffsetY: number
  Scale: number
  AffixTreeId: number
  CanRefine: boolean
  RecycleID: number
  DisjoinScoinCost: number
  DisjoinAddMaterial: [
    {
      ID: number
      Num: number
    }
  ]
  LinkIDList: number[]
  Quality: number
  StigmataMainID: number
  ShortName: number
  SellPriceID: number
  Transcendent: boolean
  Target: number
  IsSecurityProtect: boolean
  GachaMainDropDisplayConfig: number[]
  GachaGiftDropDisplayConfig: number[]
  StigmataFilterList: number[]
  CollaborationSetID: number
}
