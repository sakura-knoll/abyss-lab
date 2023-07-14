import { loadRawData } from './loadRawData'

export function getRawElfDataMap(): RawElfDataMap {
  return loadRawData('ElfData.json')
}

export type RawElfDataMap = {
  [key: string]: RawElfData
}

export interface RawElfData {
  Index: number
  FullName: number
  ElfRegistryKey: string
  ElfUIModelPath: string
  ElfUIModelPosition: {
    X: 0.135
    Y: -0.32
    Z: 3.74
  }
  ElfUIModelRotation: {
    X: 0
    Y: -7.2
    Z: 0
  }
  IconPath: string // 'SpriteOutput/ElfIcon/Elf_01'
  ElfChibiIcon: string // 'SpriteOutput/AvatarChibiIcons/Elf_10001'
  PortraitCommonIcon: string // 'SpriteOutput/ElfCardIcons/Elf_10001'
  StoryBGImg: string // 'SpriteOutput/ElfCardFigures/Elf_10001'
  PresentBGImg: string // 'SpriteOutput/ElfCardFigures/Elf_10001'
  AIName: string // 'Behavior_Elf_01'
  IsFlight: number
  UnlockStar: number
  Rarity: number
  ElfCardID: number
  ElfFragmentID: number
  CarryPlayerLevel: number
  UISoundbankName: string
  StoryDesc: number
  RGBCGID: number
  AlphaCGID: number
  UltraSkillCD: number
  UltraSkillSPCost: number
  AttackSkillCD: number
  SkillTabBGImg: string // 'SpriteOutput/ElfTalentBg/TalentBg1'
  TalentTabBGImg: string // 'SpriteOutput/ElfTalentBg/TalentBg1'
  SelectAudio: string // 'VO_Elf_01_BloodEmbrace_SwitchIn'
  LevelUpAudio: string // 'VO_Elf_01_BloodEmbrace_LevelUp'
  CombatPointRarity: number
  TagList: {
    TagID: number
    TagComment: number
  }[]
  FeatureBrief: number
  TrialStageActivityList: number[]
  CaptainSkillIDs: number[]
}
