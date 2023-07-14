import path from 'path'
import { createDirIfNotExist } from '../lib/v2/server/fsUtils'
import fs from 'fs'
import YAML from 'yaml'
import { runScript } from './lib/utils'
import {
  battlesuitCatalogPath,
  battlesuitsDir,
  dataDir,
  elfCatalogPath,
  elfsDir,
  erBattlesuitCatalogPath,
  erBattlesuitsDir,
  erSigilsPath,
  erSignetsDir,
  erSupportsPath,
  stigmataCatalogPath,
  stigmataDir,
  stigmataSetCatalogPath,
  stigmataSetsDir,
  weaopnCatalogPath,
  weaponsDir
} from '../lib/v2/server/loadData'
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

runScript(async () => {
  createDirIfNotExist(dataDir)
  writeBattlesuitData()
  writeWeaponData()
  writeStigmataData()
  writeErData()
  writeElfData()
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
  const { stigmataSetList, stigmataMainIdStigmataMap } = compileStigmataData()
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
  fs.writeFileSync(stigmataCatalogPath, YAML.stringify(catalogList))

  createDirIfNotExist(stigmataDir)
  for (const stigmataData of stigmataList) {
    const stigmaDataPath = path.join(stigmataDir, `${stigmataData.id}.yaml`)
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

  fs.writeFileSync(stigmataSetCatalogPath, YAML.stringify(setCatalogList))

  createDirIfNotExist(stigmataSetsDir)
  for (const stigmataSet of stigmataSetList) {
    const stigmaSetDataPath = path.join(stigmataSetsDir, `${stigmataSet.id}.yaml`)
    fs.writeFileSync(stigmaSetDataPath, YAML.stringify(stigmataSet))
  }
}

function writeErData() {
  const { buffSuitBuffListMap, mainAvatarList, supportAvatarList, sigilList } = compileGodWarData()

  const erBattlesuitCatalog = mainAvatarList.map(mainAvatar => {
    return { battlesuit: mainAvatar.battlesuit }
  })

  fs.writeFileSync(erBattlesuitCatalogPath, YAML.stringify(erBattlesuitCatalog))

  createDirIfNotExist(erBattlesuitsDir)
  for (const erBattlesuit of mainAvatarList) {
    const erBattlesuitPath = path.join(erBattlesuitsDir, `${erBattlesuit.battlesuit}.yaml`)
    fs.writeFileSync(erBattlesuitPath, YAML.stringify(erBattlesuit))
  }

  createDirIfNotExist(erSignetsDir)
  for (const [buffSuit, list] of buffSuitBuffListMap) {
    const erSignetsPath = path.join(erSignetsDir, `${buffSuit}.yaml`)
    fs.writeFileSync(erSignetsPath, YAML.stringify(list))
  }

  fs.writeFileSync(erSupportsPath, YAML.stringify(supportAvatarList))
  fs.writeFileSync(erSigilsPath, YAML.stringify(sigilList))
}

function writeElfData() {
  const elfs = compileElfData()

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

  fs.writeFileSync(elfCatalogPath, YAML.stringify(elfCatalogList))

  createDirIfNotExist(elfsDir)
  for (const elf of elfs) {
    const elfDataPath = path.join(elfsDir, `${elf.id}.yaml`)
    fs.writeFileSync(elfDataPath, YAML.stringify(elf))
  }
}
