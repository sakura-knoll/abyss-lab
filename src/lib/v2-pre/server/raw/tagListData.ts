import { loadRawData } from './loadRawData'

export function getRawTagListDataMap(): RawTagListDataMap {
  return loadRawData('TagListData.json')
}

export type RawTagListDataMap = {
  [key: string]: RawTagListItem
}

export interface RawTagListItem {
  TagName: number
  TagDec: number
  Icon: string
  Type: number
  ShowInScreen: boolean
  DisplayWeaponList: number[]
  DisplayStigmataList: number[]
}
