export interface VersionData {
  version: string
  previousVersion?: string
  nextVersion?: string
  name: string
  duration: [string, string]
  verified: boolean
  newBattlesuits: string[]
  newWeapons: string[]
  description: string
}
