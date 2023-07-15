import { EquipmentSkill, RootStigma, StigmataSet, StigmaType } from '../../data/types'
import { getRawEquipmentSetDataMap } from '../raw/equipmentSetData'
import { getRawEquipmentSkillDataMap } from '../raw/equipmentSkillData'
import { getRawStigmataDataMap } from '../raw/stigmataData'
import { convertEquipmentSkill, createGetText } from './utils'

export function compileStigmataData(locale: string) {
  const rawStigmataDataMap = getRawStigmataDataMap()
  const rawStigmataDataMapEntries = Object.entries(rawStigmataDataMap)
  const rawEquipmentSkillDataMap = getRawEquipmentSkillDataMap()
  const rawEquipmentSetDataMap = getRawEquipmentSetDataMap()
  const stigmaSetIdMainIdListMap = new Map<string, string[]>()
  const getText = createGetText(locale)

  const stigmataMainIdStigmataMap = rawStigmataDataMapEntries.reduce((map, [id, rawData]) => {
    // Bronya calorie has a dummy data
    if (id === '32274') {
      return map
    }
    // Mei Chrismas does not exist in the game
    if (rawData.StigmataMainID === 120443) {
      return map
    }
    const mainId = rawData.StigmataMainID.toString()
    let rootStigma = map.get(mainId)
    if (rootStigma == null) {
      rootStigma = {
        id: mainId,
        stigmata: []
      }
      map.set(mainId, rootStigma)

      const setId = rawData.SetID.toString()
      let mainIdList = stigmaSetIdMainIdListMap.get(setId)
      if (mainIdList == null) {
        mainIdList = []
        stigmaSetIdMainIdListMap.set(setId, mainIdList)
      }
      mainIdList.push(mainId)
    }
    const [, , icon] = rawData.IconPath.split('/')
    const [, , smallIcon] = rawData.SmallIcon.split('/')

    const skills = []
    if (rawData.Prop1ID !== 0) {
      const skillId = rawData.Prop1ID.toString()
      const rawSkill = rawEquipmentSkillDataMap[skillId]
      skills.push({
        id: skillId,
        ...convertEquipmentSkill(rawSkill, locale),
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
        ...convertEquipmentSkill(rawSkill, locale),
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
        ...convertEquipmentSkill(rawSkill, locale),
        param1: rawData.Prop3Param1,
        param1Add: rawData.Prop3Param1Add,
        param2: rawData.Prop3Param2,
        param2Add: rawData.Prop3Param2Add,
        param3: rawData.Prop3Param3,
        param3Add: rawData.Prop3Param3Add
      })
    }

    rootStigma.stigmata.push({
      id,
      rarity: rawData.Rarity,
      maxRarity: rawData.MaxRarity,
      maxLv: rawData.MaxLv,
      type: convertStigmataType(rawData.BaseType),
      hpBase: rawData.HPBase,
      hpAdd: rawData.HPAdd,
      attackBase: rawData.AttackBase,
      attackAdd: rawData.AttackAdd,
      defenceBase: rawData.DefenceBase,
      defenceAdd: rawData.DefenceAdd,
      criticalBase: rawData.CriticalBase,
      criticalAdd: rawData.CriticalAdd,
      icon,
      image: rawData.ImagePath,
      smallIcon,
      name: getText(rawData.DisplayTitle),
      description: getText(rawData.DisplayDescription),
      shortName: getText(rawData.ShortName),
      skills,
      rankUpMaterials: rawData.EvoMaterial.map(({ ID, Num }) => {
        return {
          id: ID.toString(),
          amount: Num
        }
      }),
      setId: rawData.SetID.toString(),
      mainId
    })

    return map
  }, new Map<string, RootStigma>())

  const stigmataSetList = Object.entries(rawEquipmentSetDataMap).map<StigmataSet>(([id, rawData]) => {
    const skills: EquipmentSkill[] = []

    if (rawData.Prop1ID !== 0) {
      const skillId = rawData.Prop1ID.toString()
      const rawSkill = rawEquipmentSkillDataMap[skillId]
      skills.push({
        id: skillId,
        ...convertEquipmentSkill(rawSkill, locale),
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
        ...convertEquipmentSkill(rawSkill, locale),
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
        ...convertEquipmentSkill(rawSkill, locale),
        param1: rawData.Prop3Param1,
        param1Add: rawData.Prop3Param1Add,
        param2: rawData.Prop3Param2,
        param2Add: rawData.Prop3Param2Add,
        param3: rawData.Prop3Param3,
        param3Add: rawData.Prop3Param3Add
      })
    }

    return {
      id,
      name: getText(rawData.SetName),
      desc: getText(rawData.SetDesc),
      skills,
      stigmaIdList: stigmaSetIdMainIdListMap.get(id) || []
    }
  })

  return {
    stigmataSetList,
    stigmataMainIdStigmataMap
  }
}

function convertStigmataType(rawType: number): StigmaType {
  switch (rawType) {
    case 1:
      return 'top'
    case 2:
      return 'mid'
    case 3:
      return 'bot'
    default:
      throw new Error(`Unknown Raw Stigmata Base Type (${rawType})`)
  }
}
