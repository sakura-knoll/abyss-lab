import path from 'path'
import { createDirIfNotExist } from '../lib/v2-pre/server/fsUtils'
import fs from 'fs'
import YAML from 'yaml'
import { runScript } from './lib/utils'
import {
  battlesuitCatalogPath,
  battlesuitsDir,
  dataDir,
  stigmataCatalogPath,
  stigmataDir,
  weaopnCatalogPath,
  weaponsDir
} from '../lib/v2-pre/server/loadData'
import { BattlesuitCatalogItem, StigmataCatalogItem, WeaponCatalogItem } from '../lib/v2-pre/data/types'
import { compileBattlesuitData } from '../lib/v2-pre/server/compileData/compileBattlesuitData'
import { compileWeaponData } from '../lib/v2-pre/server/compileData/compileWeaponData'
import { compileStigmataData } from '../lib/v2-pre/server/compileData/compileStigmataData'

runScript(async () => {
  createDirIfNotExist(dataDir)
  // writeBattlesuitData()
  // writeWeaponData()
  writeStigmataData()
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

  const catalogList: WeaponCatalogItem[] = weaponDataList.map(rootWeapon => {
    const maxedWeapon = rootWeapon.weapons[rootWeapon.weapons.length - 1]
    return {
      id: rootWeapon.id,
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

function writeStigmataData() {
  const stigmataDataList = compileStigmataData()

  const catalogList: StigmataCatalogItem[] = stigmataDataList.map(rootStigma => {
    const maxedStigma = rootStigma.stigmata[rootStigma.stigmata.length - 1]
    return {
      id: rootStigma.id,
      name: maxedStigma.name,
      icon: maxedStigma.icon,
      type: maxedStigma.type,
      maxRarity: maxedStigma.maxRarity
    }
  })

  fs.writeFileSync(stigmataCatalogPath, YAML.stringify(catalogList))

  createDirIfNotExist(stigmataDir)

  for (const stigmataData of stigmataDataList) {
    const stigmaDataPath = path.join(stigmataDir, `${stigmataData.id}.yaml`)
    fs.writeFileSync(stigmaDataPath, YAML.stringify(stigmataData))
  }
}
