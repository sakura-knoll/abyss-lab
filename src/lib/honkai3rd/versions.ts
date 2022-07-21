export interface VersionData {
  version: string
  previousVersion: string
  nextVersion: string
  name: string
  duration: [string, string]
  newBattlesuits: string[]
  newWeapons: string[]
  description: string
  supplyEvents: SupplyEventData[]
  superstring: [
    { label: string; boss: string },
    { label: string; boss: string }
  ][]
  ma: [
    { label: string; boss: string },
    { label: string; boss: string },
    { label: string; boss: string }
  ][]
}

export interface SupplyEventData {
  name: string
  duration: [string, string]
  track: number
  verified: boolean
  featured: {
    type: string
    id: string
  }[]
  others: {
    type: string
    id: string
  }[]
}
