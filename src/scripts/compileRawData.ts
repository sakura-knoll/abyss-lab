import path from 'path'
import { createDirIfNotExist } from '../lib/v2/server/fsUtils'
import fs from 'fs'
import YAML from 'yaml'
import { runScript } from './lib/utils'
import {
  BattlesuitCatalogItem,
  ElfCatalogItem,
  StigmataCatalogItem,
  StigmataSetCatalogItem,
  WeaponCatalogItem
} from '../lib/v2/data/types'
import { compileBattlesuitData } from '../lib/v2/server/compileData/compileBattlesuitData'
import { compileWeaponData } from '../lib/v2/server/compileData/compileWeaponData'
import { compileStigmataData } from '../lib/v2/server/compileData/compileStigmataData'
import { compileGodWarData } from '../lib/v2/server/compileData/compileGodWarData'
import { compileElfData } from '../lib/v2/server/compileData/compileElfData'
import {
  getBattlesuitCatalogPath,
  getBattlesuitsDir,
  getDataDir,
  getElfCatalogPath,
  getElfsDir,
  getErBattlesuitCatalogPath,
  getErBattlesuitsDir,
  getErSigilsPath,
  getErSignetsDir,
  getErSupportsPath,
  getStigmataCatalogPath,
  getStigmataDir,
  getStigmataSetCatalogPath,
  getStigmataSetsDir,
  getWeaopnCatalogPath,
  getWeaponsDir
} from '../lib/v2/server/loadData'

runScript(async () => {
  writeDataFiles('ko-KR')
  writeDataFiles('en-US')
})

function writeDataFiles(locale: string) {
  createDirIfNotExist(getDataDir(locale))
  writeBattlesuitData(locale)
  writeWeaponData(locale)
  writeStigmataData(locale)
  writeErData(locale)
  writeElfData(locale)
}

function writeBattlesuitData(locale: string) {
  const battlesuitList = compileBattlesuitData(locale)

  const catalogList: BattlesuitCatalogItem[] = battlesuitList.map(battlesuit => {
    return {
      id: battlesuit.id,
      fullName: battlesuit.fullName,
      attributeType: battlesuit.attributeType,
      weapon: battlesuit.weapon,
      character: battlesuit.character,
      initialStar: battlesuit.initialStar,
      tags: battlesuit.tags
    }
  })

  fs.writeFileSync(getBattlesuitCatalogPath(locale), YAML.stringify(catalogList))

  createDirIfNotExist(getBattlesuitsDir(locale))

  for (const battlesuit of battlesuitList) {
    const battlesuitDataPath = path.join(getBattlesuitsDir(locale), `${battlesuit.id}.yaml`)
    fs.writeFileSync(battlesuitDataPath, YAML.stringify(battlesuit))
  }
}

function writeWeaponData(locale: string) {
  const weaponDataList = compileWeaponData(locale)

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

  fs.writeFileSync(getWeaopnCatalogPath(locale), YAML.stringify(catalogList))

  createDirIfNotExist(getWeaponsDir(locale))

  for (const weaponData of weaponDataList) {
    const weaponDataPath = path.join(getWeaponsDir(locale), `${weaponData.id}.yaml`)
    fs.writeFileSync(weaponDataPath, YAML.stringify(weaponData))
  }
}

function writeStigmataData(locale: string) {
  const { stigmataSetList, stigmataMainIdStigmataMap } = compileStigmataData(locale)
  const stigmataList = [...stigmataMainIdStigmataMap.values()]

  const catalogList: StigmataCatalogItem[] = stigmataList.map(rootStigma => {
    const maxedStigma = rootStigma.stigmata[rootStigma.stigmata.length - 1]
    return {
      id: rootStigma.id,
      name: maxedStigma.name,
      icon: maxedStigma.icon,
      type: maxedStigma.type,
      maxRarity: maxedStigma.maxRarity
    }
  })
  fs.writeFileSync(getStigmataCatalogPath(locale), YAML.stringify(catalogList))

  createDirIfNotExist(getStigmataDir(locale))
  for (const stigmataData of stigmataList) {
    const stigmaDataPath = path.join(getStigmataDir(locale), `${stigmataData.id}.yaml`)
    fs.writeFileSync(stigmaDataPath, YAML.stringify(stigmataData))
  }

  const setCatalogList: StigmataSetCatalogItem[] = stigmataSetList.map(stigmataSet => {
    return {
      id: stigmataSet.id,
      name: stigmataSet.name,
      stigmataList: stigmataSet.stigmaIdList.map(stigmaId => {
        const rootStigma = stigmataMainIdStigmataMap.get(stigmaId)!
        const maxedStigma = rootStigma.stigmata[rootStigma.stigmata.length - 1]

        return {
          id: stigmaId,
          icon: maxedStigma.icon,
          maxRarity: maxedStigma.maxRarity
        }
      })
    }
  })

  fs.writeFileSync(getStigmataSetCatalogPath(locale), YAML.stringify(setCatalogList))

  const stigmataSetsDir = getStigmataSetsDir(locale)
  createDirIfNotExist(stigmataSetsDir)
  for (const stigmataSet of stigmataSetList) {
    const stigmaSetDataPath = path.join(stigmataSetsDir, `${stigmataSet.id}.yaml`)
    fs.writeFileSync(stigmaSetDataPath, YAML.stringify(stigmataSet))
  }
}

function writeErData(locale: string) {
  const { buffSuitBuffListMap, mainAvatarList, supportAvatarList, sigilList } = compileGodWarData(locale)

  const erBattlesuitCatalog = mainAvatarList.map(mainAvatar => {
    return { battlesuit: mainAvatar.battlesuit }
  })

  fs.writeFileSync(getErBattlesuitCatalogPath(locale), YAML.stringify(erBattlesuitCatalog))

  const erBattlesuitsDir = getErBattlesuitsDir(locale)
  createDirIfNotExist(erBattlesuitsDir)
  for (const erBattlesuit of mainAvatarList) {
    const erBattlesuitPath = path.join(erBattlesuitsDir, `${erBattlesuit.battlesuit}.yaml`)
    fs.writeFileSync(erBattlesuitPath, YAML.stringify(erBattlesuit))
  }

  const erSignetsDir = getErSignetsDir(locale)
  createDirIfNotExist(erSignetsDir)
  for (const [buffSuit, list] of buffSuitBuffListMap) {
    const erSignetsPath = path.join(erSignetsDir, `${buffSuit}.yaml`)
    fs.writeFileSync(erSignetsPath, YAML.stringify(list))
  }

  fs.writeFileSync(getErSupportsPath(locale), YAML.stringify(supportAvatarList))
  fs.writeFileSync(getErSigilsPath(locale), YAML.stringify(sigilList))
}

function writeElfData(locale: string) {
  const elfs = compileElfData(locale)

  const elfCatalogList = elfs.map<ElfCatalogItem>(elf => {
    return {
      id: elf.id,
      fullName: elf.fullName,
      cardIcon: elf.cardIcon,
      icon: elf.icon,
      chibiIcon: elf.chibiIcon,
      rarity: elf.rarity
    }
  })

  fs.writeFileSync(getElfCatalogPath(locale), YAML.stringify(elfCatalogList))

  const elfsDir = getElfsDir(locale)
  createDirIfNotExist(elfsDir)
  for (const elf of elfs) {
    const elfDataPath = path.join(elfsDir, `${elf.id}.yaml`)
    fs.writeFileSync(elfDataPath, YAML.stringify(elf))
  }
}
