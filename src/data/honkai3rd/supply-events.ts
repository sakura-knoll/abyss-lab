import { readdirSync, readJsonFileSync } from '../../lib/data'

export interface SupplyEvent {
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
    type: string
    id: string
    amount: number
  }[]
  drops: {
    type: string
    id: string
    rate: number
    amount: number | [number, number]
  }[]
}

const supplyEventFileNameList = readdirSync('supply-events/global-americas')
const supplyEventFileList = supplyEventFileNameList
  .map((fileName) => {
    const filePathname = 'supply-events/global-americas/' + fileName
    const data = readJsonFileSync(filePathname)

    return { ...data, id: fileName.replace(/\.json/, '') } as SupplyEvent
  })
  .sort((a, b) => {
    return -a.id.localeCompare(b.id)
  })

const supplyEventMap = supplyEventFileList.reduce((map, stigmata) => {
  map.set(stigmata.id, stigmata)
  return map
}, new Map<string, SupplyEvent>())

const versionSupplyEventListMap = supplyEventFileList.reduce(
  (map, supplyEvent) => {
    let supplyEvents = map.get(supplyEvent.version)
    if (supplyEvents == null) {
      supplyEvents = []
      map.set(supplyEvent.version, supplyEvents)
    }

    supplyEvents.push(supplyEvent)

    return map
  },
  new Map<number, SupplyEvent[]>()
)

export function listSupplyEvents() {
  return supplyEventFileList
}

export function getSupplyEventById(id: string) {
  return supplyEventMap.get(id)
}

export function getSupplyEventListByVersion(version: number) {
  return versionSupplyEventListMap.get(version) || []
}
