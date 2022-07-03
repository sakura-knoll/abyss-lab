import { runScript } from '../lib/utils'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { listStigmata } from '../../server/data/honkai3rd/stigmata'
import sortKeys from 'sort-keys'

const order = [
  'id',
  'version',
  'name',
  'krName',
  'type',
  'rarity',
  'hp',
  'atk',
  'def',
  'crt',
  'set',
  'skill',
  'description',
  'krDescription',
]

async function migrateStigmata() {
  const stigmataList = listStigmata()
  const newDataDir = path.join(__dirname, '../../../data/honkai3rd')

  const sortedData = sortKeys(stigmataList, {
    deep: true,
    compare: (a, b) => {
      return order.indexOf(a) - order.indexOf(b)
    },
  })
  fs.writeFileSync(
    path.join(newDataDir, 'stigmata.yaml'),
    yaml.stringify(sortedData)
  )
}

runScript(migrateStigmata)
