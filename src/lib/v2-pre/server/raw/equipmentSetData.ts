import { loadRawData } from './loadRawData'

export function getRawEquipmentSetDataMap(): RawEquipmentSetDataMap {
  return loadRawData('EquipmentSetData.json')
}

export type RawEquipmentSetDataMap = {
  [key: string]: RawEquipmentSetData
}

export interface RawEquipmentSetData {
  SetName: number
  SetDesc: number
  Prop1ID: number
  SpellEffectNum1: number
  Prop1Param1: number
  Prop1Param2: number
  Prop1Param3: number
  Prop1Param1Add: number
  Prop1Param2Add: number
  Prop1Param3Add: number
  Prop2ID: number
  SpellEffectNum2: number
  Prop2Param1: number
  Prop2Param2: number
  Prop2Param3: number
  Prop2Param1Add: number
  Prop2Param2Add: number
  Prop2Param3Add: number
  Prop3ID: number
  SpellEffectNum3: number
  Prop3Param1: number
  Prop3Param2: number
  Prop3Param3: number
  Prop3Param1Add: number
  Prop3Param2Add: number
  Prop3Param3Add: number
}
