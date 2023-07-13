import { loadRawData } from './loadRawData'

export function getRawGodWarBuffMap(): RawGodWarBuffMap {
  return loadRawData('GodWarBuff.json')
}

export type RawGodWarBuffMap = {
  [key: string]: {
    [key: string]: RawGodWarBuff
  }
}

export interface RawGodWarBuff {
  BuffSuit: number
  BuffQuality: number
  AbilityName: string
  ParamList: string[]
  BuffIcon: string // 'SpriteOutput/Rogue/BuffIcon/RogueGodIcon_1'
  BuffName: number
  BuffDesc: number
  BuffUpDesc: number
  SimpleBuffDesc: number
  BuffTagList: unknown[]
  ShowBuffIconEffect: boolean
  BuffGroup: number
}
