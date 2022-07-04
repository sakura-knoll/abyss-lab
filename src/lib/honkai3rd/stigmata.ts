export interface StigmataSkill {
  name: string
  description: string
}

export interface StigmataData {
  id: string
  name: string
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
  altName: string
  twoSetSkill: StigmataSkill
  threeSetSkill: StigmataSkill
  rarity: 3 | 4 | 5
  version?: string
  hidden?: boolean
}
