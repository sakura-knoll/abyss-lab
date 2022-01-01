import { readdirSync, readJsonFileSync } from '../../../lib/data'

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

export function listSupplyEventsByVersion(version: string) {
  const supplyEventsDirectoryPathname = `honkai3rd/versions/${version}/supply-events`

  const supplyEventFileNameList = readdirSync(supplyEventsDirectoryPathname)
  const supplyEventList = supplyEventFileNameList
    .map((fileName) => {
      const filePathname = `${supplyEventsDirectoryPathname}/` + fileName
      const data = readJsonFileSync(filePathname)

      return { ...data, id: fileName.replace(/\.json/, '') } as SupplyEventData
    })
    .sort((a, b) => {
      return -a.id.localeCompare(b.id)
    })

  return supplyEventList
}
