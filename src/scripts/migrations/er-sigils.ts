import { runScript } from '../lib/utils'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import sortKeys from 'sort-keys'
import { getRemembranceSigils } from '../../server/data/honkai3rd/elysianRealm'

const order = ['id', 'name', 'krName', 'description', 'krDescription']

async function migrateErSigils() {
  const sigils = getRemembranceSigils()
  const krSigils = getRemembranceSigils('ko-KR')
  const merged = sigils.map((sigil, index) => {
    return {
      ...sigil,
      krName: krSigils[index].name,
      krDescription: krSigils[index].description,
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
    path.join(newDataDir, 'er-sigils.yaml'),
    yaml.stringify(sortedData)
  )
}

runScript(migrateErSigils)
