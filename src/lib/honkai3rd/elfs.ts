export interface ElfSkill {
  type: 'passive' | 'basic' | 'ultimate' | 'team'
  name: string
  krName?: string
  requiredRank: number
  description: string
  krDescription?: string
}

export interface ElfData {
  id: string
  name: string
  krName?: string
  baseRank: number
  features: string[]
  skillRows: [ElfSkill[], ElfSkill[], ElfSkill[], ElfSkill[]]
  version: string
}
