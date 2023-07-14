import { loadRawData } from './loadRawData'

export function getRawGodWarExtraItemMap(): RawGodWarExtraItemMap {
  return loadRawData('GodWarExtraItem.json')
}

export type RawGodWarExtraItemMap = {
  [key: string]: RawGodWarExtraItemData
}

export interface RawGodWarExtraItemData {
  GodWarID: number
  ExtraItemSkillType: number
  AbilityName: string
  ParamList: string[]
  ExtraItemStar: number
  ExtraItemName: number
  ExtraItemSkillOverall: number
  ExtraItemIcon: string // 'SpriteOutput/Rogue/MaterialFigures/119301'
  UnlockExtraItemHint: number
  ExtraItemSkill: number
  ExtraItemType: number
  ExtraItemSuitID: number
}
