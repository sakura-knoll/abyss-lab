import { runScript } from '../lib/utils'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import sortKeys from 'sort-keys'
import { listWeapons } from '../../server/data/honkai3rd/weapons'

const order = [
  'id',
  'version',
  'name',
  'krName',
  'category',
  'rarity',
  'atk',
  'crt',
  'battlesuits',
  'originalWeapons',
  'sources',
  'skills',
  'description',
  'krDescription',
]

async function migrateWeapons() {
  const weapons = listWeapons()
  const newDataDir = path.join(__dirname, '../../../data/honkai3rd')

  const sortedData = sortKeys(weapons, {
    deep: true,
    compare: (a, b) => {
      return order.indexOf(a) - order.indexOf(b)
    },
  })
  fs.writeFileSync(
    path.join(newDataDir, 'weapons.yaml'),
    yaml.stringify(sortedData)
  )
}

runScript(migrateWeapons)
