export interface BattlesuitSkill {
  name: string
  description: string
  requiredRank: string
}
export interface BattlesuitSkillGroup {
  core: BattlesuitSkill
  subskills: BattlesuitSkill[]
}

export interface BattlesuitData {
  id: string
  version?: string
  name: string
  type: string
  valkyrie: string
  features: string[]
  leader: BattlesuitSkillGroup
  special: BattlesuitSkillGroup
  evasion: BattlesuitSkillGroup
  passive: BattlesuitSkillGroup
  ultimate: BattlesuitSkillGroup
  basic: BattlesuitSkillGroup
  sp?: BattlesuitSkillGroup
}

export const battlesuitFeatures = [
  { icon: 'feature-icons/physical', value: 'physical', label: 'Physical' },
  { icon: 'feature-icons/fire-dmg', value: 'fire-dmg', label: 'Fire DMG' },
  { icon: 'feature-icons/ice-dmg', value: 'ice-dmg', label: 'Ice DMG' },
  {
    icon: 'feature-icons/lightning-dmg',
    value: 'lightning-dmg',
    label: 'Lightning DMG',
  },
  { icon: 'feature-icons/freeze', value: 'freeze', label: 'Freeze' },
  { icon: 'feature-icons/paralyze', value: 'paralyze', label: 'Paralyze' },
  { icon: 'feature-icons/stun', value: 'stun', label: 'Stun' },
  { icon: 'feature-icons/ignite', value: 'ignite', label: 'Ignite' },
  { icon: 'feature-icons/bleed', value: 'bleed', label: 'Bleed' },
  { icon: 'feature-icons/heavy-atk', value: 'heavy-atk', label: 'heavy-atk' },
  { icon: 'feature-icons/weaken', value: 'weaken', label: 'Weaken' },
  { icon: 'feature-icons/impair', value: 'impair', label: 'Impair' },
  {
    icon: 'feature-icons/time-mastery',
    value: 'time mastery',
    label: 'Time Mastery',
  },
  { icon: 'feature-icons/gather', value: 'gather', label: 'Gather' },
  { icon: 'feature-icons/heal', value: 'heal', label: 'Heal' },
  { icon: 'feature-icons/fast-atk', value: 'fast atk', label: 'Fast ATK' },
  { icon: 'feature-icons/burst', value: 'burst', label: 'Burst' },
  { icon: 'feature-icons/aerial', value: 'aerial', label: 'Aerial' },
]

export const battlesuitTypes = [
  { value: 'mecha', icon: 'type-icons/mecha', label: 'Mecha' },
  { value: 'biologic', icon: 'type-icons/biologic', label: 'Biologic' },
  { value: 'psychic', icon: 'type-icons/psychic', label: 'Psychic' },
  { value: 'quantum', icon: 'type-icons/quantum', label: 'Quantum' },
  { value: 'imaginary', icon: 'type-icons/imaginary', label: 'Imaginary' },
]

export const valkyries = [
  { value: 'kiana', icon: 'valkyrie-icons/kiana', label: 'Kiana' },
  { value: 'mei', icon: 'valkyrie-icons/mei', label: 'Mei' },
  { value: 'bronya', icon: 'valkyrie-icons/bronya', label: 'Bronya' },
  { value: 'himeko', icon: 'valkyrie-icons/himeko', label: 'Himeko' },
  { value: 'theresa', icon: 'valkyrie-icons/theresa', label: 'Theresa' },
  { value: 'fuhua', icon: 'valkyrie-icons/fuhua', label: 'Fu Hua' },
  { value: 'rita', icon: 'valkyrie-icons/rita', label: 'Rita' },
  { value: 'sakura', icon: 'valkyrie-icons/sakura', label: 'Sakura' },
  { value: 'kallen', icon: 'valkyrie-icons/kallen', label: 'Kallen' },
  { value: 'olenyevas', icon: 'valkyrie-icons/olenyevas', label: 'Olenyevas' },
  { value: 'seele', icon: 'valkyrie-icons/seele', label: 'Seele' },
  { value: 'durandal', icon: 'valkyrie-icons/durandal', label: 'Durandal' },
  { value: 'fischl', icon: 'valkyrie-icons/fischl', label: 'Fischl' },
  { value: 'elysia', icon: 'valkyrie-icons/elysia', label: 'Elysia' },
  { value: 'mobius', icon: 'valkyrie-icons/mobius', label: 'Mobius' },
  { value: 'raven', icon: 'valkyrie-icons/raven', label: 'Raven' },
  { value: 'carole', icon: 'valkyrie-icons/carole', label: 'Carole' },
]
