import path from 'path'
import { createDirIfNotExist } from '../lib/v2-pre/server/fsUtils'
import fs from 'fs'
import YAML from 'yaml'
import { runScript } from './lib/utils'
import {
  battlesuitCatalogPath,
  battlesuitsDir,
  dataDir,
  weaopnCatalogPath,
  weaponsDir
} from '../lib/v2-pre/server/loadData'
import { BattlesuitCatalogItem, WeaponCatalogItem } from '../lib/v2-pre/data/types'
import { compileBattlesuitData } from '../lib/v2-pre/server/compileData/compileBattlesuitData'
import { compileWeaponData } from '../lib/v2-pre/server/compileData/compileWeaponData'

runScript(async () => {
  createDirIfNotExist(dataDir)
  writeBattlesuitData()
  writeWeaponData()
})

function writeBattlesuitData() {
  const battlesuitList = compileBattlesuitData()

  const catalogList: BattlesuitCatalogItem[] = battlesuitList.map(battlesuit => {
    return {
      id: battlesuit.id,
      fullName: battlesuit.fullName,
      attributeType: battlesuit.attributeType,
      weapon: battlesuit.weapon,
      character: battlesuit.character,
      initialStar: battlesuit.initialStar
    }
  })

  fs.writeFileSync(battlesuitCatalogPath, YAML.stringify(catalogList))

  createDirIfNotExist(battlesuitsDir)

  for (const battlesuit of battlesuitList) {
    const battlesuitDataPath = path.join(battlesuitsDir, `${battlesuit.id}.yaml`)
    fs.writeFileSync(battlesuitDataPath, YAML.stringify(battlesuit))
  }
}

function writeWeaponData() {
  const weaponDataList = compileWeaponData()

  const catalogList: WeaponCatalogItem[] = weaponDataList.map(weapon => {
    const maxedWeapon = weapon.weapons[weapon.weapons.length - 1]
    return {
      id: weapon.id,
      name: maxedWeapon.name,
      icon: maxedWeapon.icon,
      type: maxedWeapon.type,
      maxRarity: maxedWeapon.rarity
    }
  })

  fs.writeFileSync(weaopnCatalogPath, YAML.stringify(catalogList))

  createDirIfNotExist(weaponsDir)

  for (const weaponData of weaponDataList) {
    const weaponDataPath = path.join(weaponsDir, `${weaponData.id}.yaml`)
    fs.writeFileSync(weaponDataPath, YAML.stringify(weaponData))
  }
}
