import { runScript } from '../lib/utils'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { listStigmataSet } from '../../server/data/honkai3rd/stigmata'
import sortKeys from 'sort-keys'

const order = [
  'id',
  'version',
  'name',
  'krName',
  'altName',
  'krAltName',
  'type',
  'rarity',
  'twoSetSkill',
  'threeSetSkill',
  'description',
  'krDescription',
]

async function migrateStigmataSets() {
  const stigmataSetList = listStigmataSet()
  const newDataDir = path.join(__dirname, '../../../data/honkai3rd')

  const sortedData = sortKeys(stigmataSetList, {
    deep: true,
    compare: (a, b) => {
      return order.indexOf(a) - order.indexOf(b)
    },
  })
  fs.writeFileSync(
    path.join(newDataDir, 'stigmata-sets.yaml'),
    yaml.stringify(sortedData)
  )
}

runScript(migrateStigmataSets)
