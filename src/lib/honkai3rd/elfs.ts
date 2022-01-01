export interface ElfSkill {
  type: 'passive' | 'basic' | 'ultimate' | 'team'
  name: string
  requiredRank: number
  description: string
}

export interface ElfData {
  id: string
  name: string
  baseRank: number
  features: string[]
  skillRows: [ElfSkill[], ElfSkill[], ElfSkill[], ElfSkill[]]
  version: string
}
