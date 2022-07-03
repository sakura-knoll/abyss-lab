import { runScript } from '../lib/utils'
import { listBattlesuits } from '../../server/data/honkai3rd/battlesuits'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import sortKeys from 'sort-keys'

const order = [
  'id',
  'version',
  'name',
  'krName',
  'type',
  'valkyrie',
  'features',
  'equipment',
  'leader',
  'passive',
  'evasion',
  'special',
  'ultimate',
  'basic',
  'sp',
  'core',
  'description',
  'krDescription',
  'requiredRank',
]

async function migrateBattlesuits() {
  const battlesuits = listBattlesuits()
  const newDataDir = path.join(__dirname, '../../../data/honkai3rd')

  const sortedData = sortKeys(battlesuits, {
    deep: true,
    compare: (a, b) => {
      return order.indexOf(a) - order.indexOf(b)
    },
  })
  fs.writeFileSync(
    path.join(newDataDir, 'battlesuits.yaml'),
    yaml.stringify(sortedData)
  )
}

runScript(migrateBattlesuits)
