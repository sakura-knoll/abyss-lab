export type ExSignetType = 'start' | '1st' | '2nd' | 'backup' | 'na'

export interface ExSignet {
  type: ExSignetType
  name: string
}

export type DataUpdater = <T extends keyof Data>(key: T, value: Data[T]) => void

export type Data = {
  battlesuitId: string
  difficulty: 'abstinence' | 'corruption' | 'inferno'
  exSignets: ExSignet[]
}
