export interface SupplyEventData {
  id: string
  verified: boolean
  track: number
  name: string
  featured: {
    type: string
    id: string
  }[]
  otherDrops: {
    type: string
    id: string
  }[]
  version: number
  duration: [string, string]
  note: string
}
