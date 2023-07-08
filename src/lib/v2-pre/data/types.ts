export type StarRank = 'b' | 'a' | 's' | 's1' | 's2' | 's3' | 'ss' | 'ss1' | 'ss2' | 'ss3' | 'sss'
export type AttributeType = 'bio' | 'mech' | 'psy' | 'qua' | 'img' | 'none'
export type WeaponType =
  | 'pistols'
  | 'cannon'
  | 'katana'
  | 'cross'
  | '2-handed'
  | 'scythe'
  | 'lance'
  | 'fists'
  | 'bow'
  | 'chakram'
  | 'javelin'

export type CharacterType =
  | 'kiana'
  | 'mei'
  | 'bronya'
  | 'himeko'
  | 'theresa'
  | 'fuhua'
  | 'rita'
  | 'sakura'
  | 'kallen'
  | 'olenyevas'
  | 'seele'
  | 'durandal'
  | 'fischl'
  | 'elysia'
  | 'mobius'
  | 'raven'
  | 'carole'
  | 'pardofelis'
  | 'aponia'
  | 'eden'
  | 'griseo'
  | 'vill-v'
  | 'sushang'
  | 'ai'
  | 'susannah'
  | 'hare'
  | 'prometheus'
  | 'kira'
  | 'asuka'

  // Event Only
  | 'keqing'

  // APHO
  | 'apho-mei'
  | 'apho-adam'
  | 'apho-carol'
  | 'apho-bronya'
  | 'apho-timido'

export type SkillType = 'leader' | 'passive' | 'evasion' | 'special' | 'ultimate' | 'basic' | 'sp' | 'none'

export type TagType =
  | 'branch'
  | 'charge'
  | 'physical-dmg'
  | 'fire-dmg'
  | 'ice-dmg'
  | 'lightning-dmg'
  | 'freeze'
  | 'paralyze'
  | 'stun'
  | 'ignite'
  | 'bleed'
  | 'heavy-atk'
  | 'weaken'
  | 'impair'
  | 'float'
  | 'slow-down'
  | 'time-mastery'
  | 'gather'
  | 'heal'
  | 'fast-atk'
  | 'aerial'
  | 'burst'
  | 'shield'
  | 'meele'
  | 'ranged'

export interface Battlesuit {
  id: string
  fullName: string
  shortName: string
  desc: string
  firstName: string
  lastName: string
  enFirstName: string
  enLastName: string
  isEasterner: boolean
  initialStar: StarRank
  attributeType: AttributeType
  weapon: WeaponType
  character: CharacterType
  skills: BattlesuitSkill[]
  tags: TagType[]
}

export type BattlesuitCatalogItem = Pick<
  Battlesuit,
  'id' | 'fullName' | 'attributeType' | 'weapon' | 'character' | 'initialStar'
>

export interface SkillTagItem {
  type: TagType
  strength: 1 | 2 | 3 | 4
  comment: string
}

export interface BattlesuitSkill {
  id: string
  name: string
  info: string
  icon: string
  skillType: SkillType
  tags: SkillTagItem[]
  paramSubId1: number
  paramSubId2: number
  paramSubId3: number
  subSkills: BattlesuitSubSkill[]
}

export interface BattlesuitSubSkill {
  id: string
  name: string
  info: string
  brief: string
  icon: string
  maxLv: number
  tags: SkillTagItem[]
  paramBase1: number
  paramBase2: number
  paramBase3: number
  paramAdd1: number
  paramAdd2: number
  paramAdd3: number
  unlockStar: StarRank
  toggle: boolean
}