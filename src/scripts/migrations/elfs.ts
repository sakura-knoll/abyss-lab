import { runScript } from '../lib/utils'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import sortKeys from 'sort-keys'
import { listElfs } from '../../server/data/honkai3rd/elfs'

const order = [
  'id',
  'version',
  'name',
  'krName',
  'baseRank',
  'features',
  'skillRows',
  'type',
  'description',
  'krDescription',
  'requiredRank',
]

async function migrateElfs() {
  const elfs = listElfs()
  const newDataDir = path.join(__dirname, '../../../data/honkai3rd')

  const sortedData = sortKeys(elfs, {
    deep: true,
    compare: (a, b) => {
      return order.indexOf(a) - order.indexOf(b)
    },
  })
  fs.writeFileSync(
    path.join(newDataDir, 'elfs.yaml'),
    yaml.stringify(sortedData)
  )
}

runScript(migrateElfs)
