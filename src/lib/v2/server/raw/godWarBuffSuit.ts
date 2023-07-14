import { loadRawData } from './loadRawData'

export function getRawGodWarBuffSuitMap(): RawGodWarBuffSuitMap {
  return loadRawData('GodWarBuffSuit.json')
}

export type RawGodWarBuffSuitMap = {
  [key: string]: RawGodWarBuffSuit
}

export interface RawGodWarBuffSuit {
  SuitIcon: string
  SuitName: number
  SuitDesc: number
  SuitImage: string
  ShowSuitIconEffect: boolean
  ShowFilterOption: boolean
}
