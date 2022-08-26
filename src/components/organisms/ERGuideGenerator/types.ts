export type ExSignetType = 'start' | '1st' | '2nd' | 'backup' | 'na'

export interface ExSignet {
  type: ExSignetType
  name: string
}

export type DataUpdater = <T extends keyof Data>(key: T, value: Data[T]) => void

export interface SupportSet {
  type: 'util' | 'dps'
  battlesuitIds: [string, string]
}

export interface SigilSet {
  type: 'start' | 'mid' | 'end'
  sigilIds: [string, string]
}

export type Difficulty = 'abstinence' | 'corruption' | 'inferno'

export interface EquipmentSet {
  type: 'best' | 'alt'
  weapon: string
  top: string
  mid: string
  bot: string
}

export interface ERGGSignet {
  group: string
  type: 'core' | 'start' | 'sub'
  nexus: 1 | 2
  description: string
}

export type Data = {
  battlesuitId: string
  difficulty: Difficulty
  exSignets: ExSignet[]
  supportSets: SupportSet[]
  sigilSets: SigilSet[]
  equipmentSets: EquipmentSet[]
  signets: ERGGSignet[]
}
