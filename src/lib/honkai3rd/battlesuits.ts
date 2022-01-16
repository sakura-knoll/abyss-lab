export interface BattlesuitSkill {
  name: string
  krName?: string
  description: string
  krDescription?: string
  requiredRank?: string
}

export interface BattlesuitSkillGroup {
  core: BattlesuitSkill
  subskills: BattlesuitSkill[]
}

export interface BattlesuitData {
  id: string
  version?: string
  name: string
  krName?: string
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
  {
    icon: 'feature-icons/physical',
    value: 'physical',
    label: 'Physical',
    krLabel: '물리',
  },
  {
    icon: 'feature-icons/fire-dmg',
    value: 'fire-dmg',
    label: 'Fire DMG',
    krLabel: '화염 대미지',
  },
  {
    icon: 'feature-icons/ice-dmg',
    value: 'ice-dmg',
    label: 'Ice DMG',
    krLabel: '빙결 대미지',
  },
  {
    icon: 'feature-icons/lightning-dmg',
    value: 'lightning-dmg',
    label: 'Lightning DMG',
    krLabel: '뇌전 대미지',
  },
  {
    icon: 'feature-icons/freeze',
    value: 'freeze',
    label: 'Freeze',
    krLabel: '빙결',
  },
  {
    icon: 'feature-icons/paralyze',
    value: 'paralyze',
    label: 'Paralyze',
    krLabel: '마비',
  },
  { icon: 'feature-icons/stun', value: 'stun', label: 'Stun', krLabel: '기절' },
  {
    icon: 'feature-icons/ignite',
    value: 'ignite',
    label: 'Ignite',
    krLabel: '점화',
  },
  {
    icon: 'feature-icons/bleed',
    value: 'bleed',
    label: 'Bleed',
    krLabel: '출혈',
  },
  {
    icon: 'feature-icons/heavy-atk',
    value: 'heavy-atk',
    label: 'Heavy ATK',
    krLabel: '강타',
  },
  {
    icon: 'feature-icons/weaken',
    value: 'weaken',
    label: 'Weaken',
    krLabel: '허약',
  },
  {
    icon: 'feature-icons/impair',
    value: 'impair',
    label: 'Impair',
    krLabel: '취약',
  },
  {
    icon: 'feature-icons/time-mastery',
    value: 'time mastery',
    label: 'Time Mastery',
    krLabel: '시공',
  },
  {
    icon: 'feature-icons/gather',
    value: 'gather',
    label: 'Gather',
    krLabel: '흡인',
  },
  { icon: 'feature-icons/heal', value: 'heal', label: 'Heal', krLabel: '치료' },
  {
    icon: 'feature-icons/fast-atk',
    value: 'fast atk',
    label: 'Fast ATK',
    krLabel: '높은 빈도',
  },
  {
    icon: 'feature-icons/burst',
    value: 'burst',
    label: 'Burst',
    krLabel: '폭발, 버스트',
  },
  {
    icon: 'feature-icons/aerial',
    value: 'aerial',
    label: 'Aerial',
    krLabel: '대공',
  },
]

export const battlesuitTypes = [
  { value: 'mecha', icon: 'type-icons/mecha', label: 'Mecha', krLabel: '기계' },
  {
    value: 'biologic',
    icon: 'type-icons/biologic',
    label: 'Biologic',
    krLabel: '생물',
  },
  {
    value: 'psychic',
    icon: 'type-icons/psychic',
    label: 'Psychic',
    krLabel: '이능',
  },
  {
    value: 'quantum',
    icon: 'type-icons/quantum',
    label: 'Quantum',
    krLabel: '양자',
  },
  {
    value: 'imaginary',
    icon: 'type-icons/imaginary',
    label: 'Imaginary',
    krLabel: '허수',
  },
]

export const valkyries = [
  {
    value: 'kiana',
    icon: 'valkyrie-icons/kiana',
    label: 'Kiana',
    krLabel: '키아나',
  },
  { value: 'mei', icon: 'valkyrie-icons/mei', label: 'Mei', krLabel: '메이' },
  {
    value: 'bronya',
    icon: 'valkyrie-icons/bronya',
    label: 'Bronya',
    krLabel: '브로냐',
  },
  {
    value: 'himeko',
    icon: 'valkyrie-icons/himeko',
    label: 'Himeko',
    krLabel: '히메코',
  },
  {
    value: 'theresa',
    icon: 'valkyrie-icons/theresa',
    label: 'Theresa',
    krLabel: '테레사',
  },
  {
    value: 'fuhua',
    icon: 'valkyrie-icons/fuhua',
    label: 'Fu Hua',
    krLabel: '후카',
  },
  {
    value: 'rita',
    icon: 'valkyrie-icons/rita',
    label: 'Rita',
    krLabel: '리타',
  },
  {
    value: 'sakura',
    icon: 'valkyrie-icons/sakura',
    label: 'Sakura',
    krLabel: '야에 사쿠라',
  },
  {
    value: 'kallen',
    icon: 'valkyrie-icons/kallen',
    label: 'Kallen',
    krLabel: '카렌',
  },
  {
    value: 'olenyevas',
    icon: 'valkyrie-icons/olenyevas',
    label: 'Olenyevas',
    krLabel: '아린 자매',
  },
  {
    value: 'seele',
    icon: 'valkyrie-icons/seele',
    label: 'Seele',
    krLabel: '제레',
  },
  {
    value: 'durandal',
    icon: 'valkyrie-icons/durandal',
    label: 'Durandal',
    krLabel: '듀란달',
  },
  {
    value: 'fischl',
    icon: 'valkyrie-icons/fischl',
    label: 'Fischl',
    krLabel: '피슬',
  },
  {
    value: 'elysia',
    icon: 'valkyrie-icons/elysia',
    label: 'Elysia',
    krLabel: '엘리시아',
  },
  {
    value: 'mobius',
    icon: 'valkyrie-icons/mobius',
    label: 'Mobius',
    krLabel: '뫼비우스',
  },
  {
    value: 'raven',
    icon: 'valkyrie-icons/raven',
    label: 'Raven',
    krLabel: '레이븐',
  },
  {
    value: 'carole',
    icon: 'valkyrie-icons/carole',
    label: 'Carole',
    krLabel: '캐롤',
  },
  {
    value: 'asuka',
    icon: 'valkyrie-icons/asuka',
    label: 'Asuka',
    krLabel: '아스카',
  },
]
