export type ExSignetType = 'start' | '1st' | '2nd' | 'backup' | 'na'

export interface ExSignet {
  type: ExSignetType
  name: string
}

export type DataUpdater = <T extends keyof Data>(key: T, value: Data[T]) => void

export type SupportSet = {
  type: 'util' | 'dps'
  battlesuitIds: [string, string]
}

export type SigilSet = {
  type: 'start' | 'mid' | 'end'
  sigilIds: [string, string]
}

export type Difficulty = 'abstinence' | 'corruption' | 'inferno'

export type Data = {
  battlesuitId: string
  difficulty: Difficulty
  exSignets: ExSignet[]
  supportSets: SupportSet[]
  sigilSets: SigilSet[]
}
