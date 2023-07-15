import { BattlesuitSkill, CharacterType, TagType } from './types'

export function sortBattlesuitSkill(a: BattlesuitSkill, b: BattlesuitSkill) {
  return reversedSkillTypeOrder.indexOf(b.skillType) - reversedSkillTypeOrder.indexOf(a.skillType)
}

const reversedSkillTypeOrder = ['leader', 'passive', 'evasion', 'special', 'ultimate', 'basic', 'sp', 'none'].reverse()

export const characterFilterTypes: CharacterType[] = [
  'kiana',
  'mei',
  'bronya',
  'himeko',
  'theresa',
  'fuhua',
  'rita',
  'sakura',
  'kallen',
  'olenyevas',
  'seele',
  'durandal',
  'fischl',
  'elysia',
  'mobius',
  'raven',
  'carole',
  'pardofelis',
  'aponia',
  'eden',
  'griseo',
  'vill-v',
  'sushang',
  'ai',
  'susannah',
  'hare',
  'prometheus',
  'kira',
  'asuka',
  'keqing'
]

export const tagFilterTypes: TagType[] = [
  'physical-dmg',
  'fire-dmg',
  'ice-dmg',
  'lightning-dmg',
  'freeze',
  'paralyze',
  'stun',
  'ignite',
  'bleed',
  'heavy-atk',
  'weaken',
  'impair',
  'time-mastery',
  'gather',
  'heal',
  'fast-atk',
  'aerial',
  'burst'
]
