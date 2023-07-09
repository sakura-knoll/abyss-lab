import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { BattlesuitCatalogItem, WeaponCatalogItem } from '../data/types'

export const dataDir = path.join(process.cwd(), 'data/v2-pre')

export const battlesuitsDir = path.join(dataDir, 'battlesuits')
export const battlesuitCatalogPath = path.join(dataDir, 'battlesuit-catalog.yaml')

export const weaponsDir = path.join(dataDir, 'weapons')
export const weaopnCatalogPath = path.join(dataDir, 'weapon-catalog.yaml')

export function loadBattlesuitCatalog(): BattlesuitCatalogItem[] {
  return readYamlFile(battlesuitCatalogPath)
}

export function loadBattlesuitData(id: string) {
  const battlesuitDataPath = path.join(battlesuitsDir, `${id}.yaml`)
  return readYamlFile(battlesuitDataPath)
}

export function loadWeaponCatalog(): WeaponCatalogItem[] {
  return readYamlFile(weaopnCatalogPath)
}

export function loadWeaponData(id: string) {
  const weaponDataPath = path.join(weaponsDir, `${id}.yaml`)
  return readYamlFile(weaponDataPath)
}

function readYamlFile(pathname: string) {
  return YAML.parse(fs.readFileSync(pathname).toString())
}
