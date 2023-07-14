import { loadRawData } from './loadRawData'

export function getRawElfSkillDataMap(): RawElfSkillDataMap {
  return loadRawData('ElfSkillData.json')
}

export type RawElfSkillDataMap = {
  [key: string]: RawElfSkillData
}

export interface RawElfSkillData {
  ElfID: number
  Name: number
  Info: number
  SkillTypeTag: number
  MaxLv: number
  SkillType: number
  IconPath: string //'SpriteOutput/Elf_Skill_Icon/Skill_Elf_Attack_101'
  IconType: number
  UnlockStar: number
  UIPointRow: number
  UIPointColumn: number
  TagList: { TagID: number; TagComment: number }[]
  IconSpecial: number
  AbilityParamBase_1: number
  AbilityParamAdd_1: number
  AbilityParamBase_2: number
  AbilityParamAdd_2: number
  AbilityParamBase_3: number
  AbilityParamAdd_3: number
  HasNoRestrictionAbility: number
}
