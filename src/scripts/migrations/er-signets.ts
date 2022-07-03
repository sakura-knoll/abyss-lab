import { runScript } from '../lib/utils'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import sortKeys from 'sort-keys'
import {
  signetGroupMap,
  krSignetGroupMap,
} from '../../server/data/honkai3rd/elysianRealm'

const order = [
  'id',
  'name',
  'krName',
  'altName',
  'krAltName',
  'description',
  'krDescription',
  'sets',
  'signets',
  'upgrades',
]

async function migrateErSupports() {
  const newDataDir = path.join(__dirname, '../../../data/honkai3rd')

  const groupMap = Object.entries(signetGroupMap).reduce(
    (map, [key, group]) => {
      const sets = group.sets.map((set, index) => {
        const signets = set.signets.map((signet, signetIndex) => {
          const upgrades = signet.upgrades.map((upgrade, upgradeIndex) => {
            return {
              ...upgrade,
              krName:
                krSignetGroupMap[key].sets[index].signets[signetIndex].upgrades[
                  upgradeIndex
                ].name,
              krDescription:
                krSignetGroupMap[key].sets[index].signets[signetIndex].upgrades[
                  upgradeIndex
                ].description,
            }
          })

          return {
            ...signet,
            krName: krSignetGroupMap[key].sets[index].signets[signetIndex].name,
            krDescription:
              krSignetGroupMap[key].sets[index].signets[signetIndex]
                .description,
            upgrades,
          }
        })

        return {
          ...set,
          krName: krSignetGroupMap[key].sets[index].name,
          signets,
        }
      })
      map[key] = {
        ...group,
        krName: krSignetGroupMap[key].name,
        krAltName: krSignetGroupMap[key].altName,
        sets,
      }
      return map
    },
    {} as any
  )

  const sortedData = sortKeys(groupMap, {
    deep: true,
    compare: (a, b) => {
      return order.indexOf(a) - order.indexOf(b)
    },
  })
  fs.writeFileSync(
    path.join(newDataDir, 'er-signets.yaml'),
    yaml.stringify(sortedData)
  )
}

runScript(migrateErSupports)
