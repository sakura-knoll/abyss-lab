export interface StigmataSkill {
  name: string
  krName?: string
  description: string
  krDescription?: string
}

export interface StigmataData {
  id: string
  name: string
  krName?: string
  skill: StigmataSkill
  atk: number
  def: number
  crt: number
  set?: string
  type: 'top' | 'mid' | 'bot'
  hp: number
  rarity: 3 | 4 | 5
  version?: string
  hidden?: boolean
}

export interface StigmataSet {
  id: string
  name: string
  krName?: string
  altName: string
  krAltName?: string
  twoSetSkill: StigmataSkill
  threeSetSkill: StigmataSkill
  rarity: 3 | 4 | 5
  version?: string
  hidden?: boolean
}
