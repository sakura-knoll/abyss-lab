import { SupplyEventData } from '../../../lib/honkai3rd/supplyEvents'
import { readdirSync, readJsonFileSync } from '../fs'

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
