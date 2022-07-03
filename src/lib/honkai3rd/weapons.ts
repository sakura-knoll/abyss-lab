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
