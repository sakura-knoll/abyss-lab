import { runScript } from '../lib/utils'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import sortKeys from 'sort-keys'
import { getSupportBattlesuits } from '../../server/data/honkai3rd/elysianRealm'

const order = [
  'id',
  'name',
  'krName',
  'skillName',
  'krSkillName',
  'cooldown',
  'description',
  'krDescription',
]

async function migrateErSupports() {
  const supports = getSupportBattlesuits()
  const krSupports = getSupportBattlesuits('ko-KR')
  const merged = supports.map((sigil, index) => {
    return {
      ...sigil,
      krName: krSupports[index].name,
      krSkillName: krSupports[index].skillName,
      krDescription: krSupports[index].description,
    }
  })
  const newDataDir = path.join(__dirname, '../../../data/honkai3rd')

  const sortedData = sortKeys(merged, {
    deep: true,
    compare: (a, b) => {
      return order.indexOf(a) - order.indexOf(b)
    },
  })
  fs.writeFileSync(
    path.join(newDataDir, 'er-supports.yaml'),
    yaml.stringify(sortedData)
  )
}

runScript(migrateErSupports)
