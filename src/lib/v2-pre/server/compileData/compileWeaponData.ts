import { getRawEquipmentSkillDataMap, RawEquipmentSkillData } from '../raw/equipmentSkillData'
import { getRawWeaponDataMap } from '../raw/weaponData'
import { convertTagType, convertWeaponType, getText } from './utils'

export function compileWeaponData() {
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
        ...convertWeaponSkill(rawSkill)
      })
    }
    if (rawData.Prop2ID !== 0) {
      const skillId = rawData.Prop2ID.toString()
      const rawSkill = rawEquipmentSkillDataMap[skillId]
      skills.push({
        id: skillId,
        ...convertWeaponSkill(rawSkill)
      })
    }
    if (rawData.Prop3ID !== 0) {
      const skillId = rawData.Prop3ID.toString()
      const rawSkill = rawEquipmentSkillDataMap[skillId]
      skills.push({
        id: skillId,
        ...convertWeaponSkill(rawSkill)
      })
    }
    const icon = rawData.IconPath.split('/').pop()
    weaponList.push({
      id,
      rarity: rawData.Rarity,
      maxLv: rawData.MaxLv,
      type: convertWeaponType(rawData.BaseType),
      title: getText(rawData.DisplayTitle),
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
  }, new Map())

  const weaponIdList = [...rawWeaponMainIdWeaponDataMap.keys()]

  return weaponIdList.map(weaponId => {
    return {
      id: weaponId,
      weapons: rawWeaponMainIdWeaponDataMap.get(weaponId)
    }
  })

  function convertWeaponSkill(rawSkill: RawEquipmentSkillData) {
    const iconName = rawSkill.SkillIconPath.split('/').pop()
    return {
      name: getText(rawSkill.SkillName),
      info: getText(rawSkill.SkillDisplay),
      icon: iconName != null && iconName.length > 0 ? iconName : undefined,
      skillCd: rawSkill.SkillCD,
      skillSpCost: rawSkill.SPCost,
      skillSpNeed: rawSkill.SPNeed,
      tags: rawSkill.TagList.map(rawEquipmentSkillTag => {
        return {
          type: convertTagType(rawEquipmentSkillTag.TagID),
          comment: getText(rawEquipmentSkillTag.TagComment)
        }
      })
    }
  }
}
