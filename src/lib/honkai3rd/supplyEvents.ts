export interface SupplyEventData {
  id: string
  verified: boolean
  track: number
  name: string
  type: string
  token: string
  featured: {
    type: string
    id: string
  }[]
  extra: string[]
  version: number
  duration: [string, string]
  guarantees: {
    count: number
    recurring: boolean
    rewards: { type: string; id: string; amount: number | [number, number] }[]
  }[]
  mileages: {
    count: number
    rewardOptions: {
      type: string
      id: string
      amount: number
    }[]
  }[]
  drops: {
    type: string
    id: string
    rate: number
    amount: number | [number, number]
  }[]
}
