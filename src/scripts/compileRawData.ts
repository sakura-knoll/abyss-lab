import { buildBattlesuitList } from '../lib/v2-pre/server/buildData'
import path from 'path'
import { createDirIfNotExist } from '../lib/v2-pre/server/fsUtils'
import fs from 'fs'
import YAML from 'yaml'
import { runScript } from './lib/utils'
import { battlesuitCatalogPath, battlesuitsDir, dataDir } from '../lib/v2-pre/server/loadData'
import { BattlesuitCatalogItem } from '../lib/v2-pre/data/types'

runScript(async () => {
  createDirIfNotExist(dataDir)
  writeBattlesuitData()
})

function writeBattlesuitData() {
  const battlesuitList = buildBattlesuitList()

  const simplifiedList: BattlesuitCatalogItem[] = battlesuitList.map(battlesuit => {
    return {
      id: battlesuit.id,
      fullName: battlesuit.fullName,
      attributeType: battlesuit.attributeType,
      weapon: battlesuit.weapon,
      character: battlesuit.character,
      initialStar: battlesuit.initialStar
    }
  })

  fs.writeFileSync(battlesuitCatalogPath, YAML.stringify(simplifiedList))

  createDirIfNotExist(battlesuitsDir)

  for (const battlesuit of battlesuitList) {
    const battlesuitDataPath = path.join(battlesuitsDir, `${battlesuit.id}.yaml`)
    fs.writeFileSync(battlesuitDataPath, YAML.stringify(battlesuit))
  }
}
