import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import {
  BattlesuitCatalogItem,
  Elf,
  ElfCatalogItem,
  ErBattlesuit,
  ErBattlesuitCatalogItem,
  ErSigil,
  ErSignet,
  ErSupportBattlesuit,
  RootStigma,
  StigmataCatalogItem,
  StigmataSet,
  StigmataSetCatalogItem,
  WeaponCatalogItem
} from '../data/types'

// export const dataDir = path.join(process.cwd(), 'data/ko-KR')
export function getDataDir(locale?: string) {
  if (locale == null) {
    return path.join(process.cwd(), 'data', 'en-US')
  }
  return path.join(process.cwd(), 'data', locale)
}

export function getBattlesuitsDir(locale?: string) {
  return path.join(getDataDir(locale), 'battlesuits')
}
export function getBattlesuitCatalogPath(locale?: string) {
  return path.join(getDataDir(locale), 'battlesuit-catalog.yaml')
}

export function getWeaponsDir(locale?: string) {
  return path.join(getDataDir(locale), 'weapons')
}
export function getWeaopnCatalogPath(locale?: string) {
  return path.join(getDataDir(locale), 'weapon-catalog.yaml')
}

export function getStigmataDir(locale?: string) {
  return path.join(getDataDir(locale), 'stigmata')
}
export function getStigmataCatalogPath(locale?: string) {
  return path.join(getDataDir(locale), 'stigmata-catalog.yaml')
}

export function getStigmataSetsDir(locale?: string) {
  return path.join(getDataDir(locale), 'stigmata-sets')
}
export function getStigmataSetCatalogPath(locale?: string) {
  return path.join(getDataDir(locale), 'stigmata-set-catalog.yaml')
}

export function getErBattlesuitCatalogPath(locale?: string) {
  return path.join(getDataDir(locale), 'er-battlesuits-catalog.yaml')
}
export function getErBattlesuitsDir(locale?: string) {
  return path.join(getDataDir(locale), 'er-battlesuits')
}
export function getErSignetsDir(locale?: string) {
  return path.join(getDataDir(locale), 'er-signets')
}
export function getErSupportsPath(locale?: string) {
  return path.join(getDataDir(locale), 'er-supports.yaml')
}
export function getErSigilsPath(locale?: string) {
  return path.join(getDataDir(locale), 'er-sigils.yaml')
}

export function getElfsDir(locale?: string) {
  return path.join(getDataDir(locale), 'elfs')
}
export function getElfCatalogPath(locale?: string) {
  return path.join(getDataDir(locale), 'elf-catalog.yaml')
}

export function loadBattlesuitCatalog(locale?: string): BattlesuitCatalogItem[] {
  return readYamlFile(getBattlesuitCatalogPath(locale))
}

export function loadBattlesuitData(id: string, locale?: string) {
  const battlesuitDataPath = path.join(getBattlesuitsDir(locale), `${id}.yaml`)
  return readYamlFile(battlesuitDataPath)
}

export function loadWeaponCatalog(locale?: string): WeaponCatalogItem[] {
  return readYamlFile(getWeaopnCatalogPath(locale))
}

export function loadWeaponData(id: string, locale?: string) {
  const weaponDataPath = path.join(getWeaponsDir(locale), `${id}.yaml`)
  return readYamlFile(weaponDataPath)
}

export function loadStigmataCatalog(locale?: string): StigmataCatalogItem[] {
  return readYamlFile(getStigmataCatalogPath(locale))
}

export function loadStigmaData(id: string, locale?: string): RootStigma {
  const stigmaDataPath = path.join(getStigmataDir(locale), `${id}.yaml`)
  return readYamlFile(stigmaDataPath)
}

export function loadStigmataSetCatalog(locale?: string): StigmataSetCatalogItem[] {
  return readYamlFile(getStigmataSetCatalogPath(locale))
}

export function loadStigmataSetData(id: string, locale?: string): StigmataSet {
  const stigmataSetPath = path.join(getStigmataSetsDir(locale), `${id}.yaml`)
  return readYamlFile(stigmataSetPath)
}

export function loadErBattlesuitCatalog(locale?: string): ErBattlesuitCatalogItem[] {
  return readYamlFile(getErBattlesuitCatalogPath(locale))
}

export function loadErBattlesuit(id: string, locale?: string): ErBattlesuit {
  const erBattlesuitPath = path.join(getErBattlesuitsDir(locale), `${id}.yaml`)
  return readYamlFile(erBattlesuitPath)
}

export function loadErSignets(id: string, locale?: string): ErSignet[] {
  const erSignetsPath = path.join(getErSignetsDir(locale), `${id}.yaml`)
  return readYamlFile(erSignetsPath)
}

export function loadErSupports(locale?: string): ErSupportBattlesuit[] {
  return readYamlFile(getErSupportsPath(locale))
}

export function loadErSigils(locale?: string): ErSigil[] {
  return readYamlFile(getErSigilsPath(locale))
}

export function loadElfCatalog(locale?: string): ElfCatalogItem[] {
  return readYamlFile(getElfCatalogPath(locale))
}

export function loadElfData(id: string, locale?: string): Elf {
  const elfDataPath = path.join(getElfsDir(locale), `${id}.yaml`)
  return readYamlFile(elfDataPath)
}

function readYamlFile(pathname: string) {
  return YAML.parse(fs.readFileSync(pathname).toString())
}
