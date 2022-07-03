import { runScript } from '../lib/utils'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import sortKeys from 'sort-keys'
import { listVersionData } from '../../server/data/honkai3rd/versions'
import { listSupplyEventsByVersion } from '../../server/data/honkai3rd/supplyEvents'

const order = [
  'id',
  'version',
  'name',
  'krName',
  'duration',
  'newBattlesuits',
  'newWeapons',
  'description',
  'supplyEvents',
  'track',
  'verified',
  'featured',
  'others',
]

async function migrateVersions() {
  const versions = listVersionData()
  const newDataDir = path.join(__dirname, '../../../data/honkai3rd')

  const merged = versions.map((version) => {
    return {
      ...version,
      supplyEvents: listSupplyEventsByVersion(version.version).map((event) => {
        return {
          track: event.track,
          name: event.name,
          verified: event.verified,
          featured: event.featured,
          duration: event.duration,
          others:
            (event as any).drops != null
              ? (event as any).drops
                  .map((drop: any) => {
                    const item = drop.items[0]
                    return {
                      id: item.id,
                      type: item.type,
                    }
                  })
                  .filter((item: any) => {
                    return !event.featured.some(({ id }) => item.id === id)
                  })
              : (event as any).others != null
              ? (event as any).others
              : [],
        }
      }),
    }
  })

  const sortedData = sortKeys(merged, {
    deep: true,
    compare: (a, b) => {
      return order.indexOf(a) - order.indexOf(b)
    },
  })
  fs.writeFileSync(
    path.join(newDataDir, 'versions.yaml'),
    yaml.stringify(sortedData)
  )
}

runScript(migrateVersions)
