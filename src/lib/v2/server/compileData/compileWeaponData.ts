import { RootWeaponData, WeaponData } from '../../data/types'
import { getRawEquipmentSkillDataMap } from '../raw/equipmentSkillData'
import { getRawWeaponDataMap } from '../raw/weaponData'
import { convertEquipmentSkill, convertWeaponType, getText } from './utils'

export function compileWeaponData(): RootWeaponData[] {
  const rawWeaponDataMap = getRawWeaponDataMap()
  const rawEquipmentSkillDataMap = getRawEquipmentSkillDataMap()

  const rawWeaponMainIdWeaponDataMap = Object.entries(rawWeaponDataMap).reduce((map, [id, rawData]) => {
    const rawWeaponMainId = rawData.WeaponMainID.toString()
    let weaponList = map.get(rawWeaponMainId)
    if (weaponList == null) {
      weaponList = []
      map.set(rawWeaponMainId, weaponList)
    }

    const skills = []
    if (rawData.Prop1ID !== 0) {
      const skillId = rawData.Prop1ID.toString()
      const rawSkill = rawEquipmentSkillDataMap[skillId]
      skills.push({
        id: skillId,
        ...convertEquipmentSkill(rawSkill),
        param1: rawData.Prop1Param1,
        param1Add: rawData.Prop1Param1Add,
        param2: rawData.Prop1Param2,
        param2Add: rawData.Prop1Param2Add,
        param3: rawData.Prop1Param3,
        param3Add: rawData.Prop1Param3Add
      })
    }
    if (rawData.Prop2ID !== 0) {
      const skillId = rawData.Prop2ID.toString()
      const rawSkill = rawEquipmentSkillDataMap[skillId]
      skills.push({
        id: skillId,
        ...convertEquipmentSkill(rawSkill),
        param1: rawData.Prop2Param1,
        param1Add: rawData.Prop2Param1Add,
        param2: rawData.Prop2Param2,
        param2Add: rawData.Prop2Param2Add,
        param3: rawData.Prop2Param3,
        param3Add: rawData.Prop2Param3Add
      })
    }
    if (rawData.Prop3ID !== 0) {
      const skillId = rawData.Prop3ID.toString()
      const rawSkill = rawEquipmentSkillDataMap[skillId]
      skills.push({
        id: skillId,
        ...convertEquipmentSkill(rawSkill),
        param1: rawData.Prop3Param1,
        param1Add: rawData.Prop3Param1Add,
        param2: rawData.Prop3Param2,
        param2Add: rawData.Prop3Param2Add,
        param3: rawData.Prop3Param3,
        param3Add: rawData.Prop3Param3Add
      })
    }
    const icon = rawData.IconPath.split('/').pop()!
    weaponList.push({
      id,
      rarity: rawData.Rarity,
      maxLv: rawData.MaxLv,
      type: convertWeaponType(rawData.BaseType),
      name: getText(rawData.DisplayTitle),
      description: getText(rawData.DisplayDescription),
      icon,
      hpBase: rawData.HPBase,
      hpAdd: rawData.HPAdd,
      spBase: rawData.SPBase,
      spAdd: rawData.SPAdd,
      attackBase: rawData.AttackBase,
      attackAdd: rawData.AttackAdd,
      defenceBase: rawData.DefenceBase,
      defenceAdd: rawData.DefenceAdd,
      criticalBase: rawData.CriticalBase,
      criticalAdd: rawData.CriticalAdd,
      resistanceBase: rawData.ResistanceBase,
      resistanceAdd: rawData.ResistanceAdd,
      skills,

      rankUpMaterials: rawData.EvoMaterial.map(rawMaterial => {
        return {
          id: rawMaterial.ID.toString(),
          amount: rawMaterial.Num
        }
      }),
      powerType: rawData.PowerType
    })
    return map
  }, new Map<string, WeaponData[]>())

  const weaponIdList = [...rawWeaponMainIdWeaponDataMap.keys()]

  return weaponIdList.map(weaponId => {
    return {
      id: weaponId,
      weapons: rawWeaponMainIdWeaponDataMap.get(weaponId) || []
    }
  })
}
