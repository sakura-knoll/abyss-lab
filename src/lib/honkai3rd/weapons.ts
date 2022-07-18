import { SourceData } from './sources'

export interface WeaponSkill {
  name: string
  description: string
}

export interface WeaponData {
  id: string
  name: string
  atk: number
  crt: number
  category:
    | 'pistol'
    | 'cannon'
    | 'katana'
    | 'cross'
    | 'greatsword'
    | 'scythe'
    | 'lance'
    | 'gauntlet'
    | 'bow'
    | 'chakram'
  rarity: number
  skills: WeaponSkill[]
  version?: string
  battlesuits?: {
    id: string
    suitability?: number
    description?: string
  }[]
  priWeapon?: string
  originalWeapons?: string[]
  sources?: SourceData[]
}

export const weaponCategories = [
  {
    value: 'pistol',
    label: 'Pistols',
    krLabel: '쌍권총',
    icon: 'weapon-icons/weapon-pistol',
  },
  {
    value: 'katana',
    label: 'Katanas',
    krLabel: '태도',
    icon: 'weapon-icons/weapon-katana',
  },
  {
    value: 'cannon',
    label: 'Cannons',
    krLabel: '대포',
    icon: 'weapon-icons/weapon-cannon',
  },
  {
    value: 'greatsword',
    label: 'Greatswords',
    krLabel: '대검',
    icon: 'weapon-icons/weapon-claymore',
  },
  {
    value: 'cross',
    label: 'Crosses',
    krLabel: '십자가',
    icon: 'weapon-icons/weapon-cross',
  },
  {
    value: 'gauntlet',
    label: 'Gauntlets',
    krLabel: '건틀릿',
    icon: 'weapon-icons/weapon-gauntlet',
  },
  {
    value: 'scythe',
    label: 'Scythes',
    krLabel: '낫',
    icon: 'weapon-icons/weapon-scythe',
  },
  {
    value: 'lance',
    label: 'Lances',
    krLabel: '랜스',
    icon: 'weapon-icons/weapon-lance',
  },
  {
    value: 'bow',
    label: 'Bows',
    krLabel: '활',
    icon: 'weapon-icons/weapon-bow',
  },
  {
    value: 'chakram',
    label: 'Chakram',
    krLabel: '차크람',
    icon: 'weapon-icons/weapon-chakram',
  },
]
