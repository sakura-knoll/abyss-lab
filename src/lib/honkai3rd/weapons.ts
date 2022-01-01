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
  rarity: number
  skills: WeaponSkill[]
  version?: string
}
