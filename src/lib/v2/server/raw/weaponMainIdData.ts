import { loadRawData } from './loadRawData'

export function getRawWeaponMainIdDataMap(): RawWeaponMainIdDataMap {
  return loadRawData('WeaponMainIDData.json')
}

export type RawWeaponMainIdDataMap = {
  [key: string]: RawWeaponMainIdData
}

export interface RawWeaponMainIdData {
  ReforgeTargetIDList: number[]
}
