export type ERGGExSignetType = 'start' | '1st' | '2nd' | 'backup' | 'na'

export interface ERGGExSignet {
  type: ERGGExSignetType
  name: string
}

export type ERGGDataUpdater = <T extends keyof ERGGData>(
  key: T,
  value: ERGGData[T] | ((previousData: ERGGData[T]) => ERGGData[T])
) => void

export interface ERGGSupportSet {
  type: 'util' | 'dps'
  battlesuitIds: [string, string]
}

export interface ERGGSigilSet {
  type: 'start' | 'mid' | 'end'
  sigilIds: [string, string]
}

export type ERGGDifficulty = 'abstinence' | 'corruption' | 'inferno'

export interface ERGGEquipmentSet {
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

export type ERGGData = {
  rank?: string
  tag: string
  signature: string
  battlesuitId: string
  difficulty: ERGGDifficulty
  exSignets: ERGGExSignet[]
  supportSets: ERGGSupportSet[]
  sigilSets: ERGGSigilSet[]
  equipmentSets: ERGGEquipmentSet[]
  signets: ERGGSignet[]
}
