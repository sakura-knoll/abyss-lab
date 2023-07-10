import { RootStigma, StigmaType } from '../../data/types'
import { getRawEquipmentSkillDataMap } from '../raw/equipmentSkillData'
import { getRawStigmataDataMap } from '../raw/stigmataData'
import { convertEquipmentSkill, getText } from './utils'

export function compileStigmataData() {
  const rawStigmataDataMap = getRawStigmataDataMap()
  const rawStigmataDataMapEntries = Object.entries(rawStigmataDataMap)
  const rawEquipmentSkillDataMap = getRawEquipmentSkillDataMap()

  const stigmataMainIdStigmataMap = rawStigmataDataMapEntries.reduce((map, [id, rawData]) => {
    const mainId = rawData.StigmataMainID.toString()
    let rootStigma = map.get(mainId)
    if (rootStigma == null) {
      rootStigma = {
        id: mainId,
        stigmata: []
      }
      map.set(mainId, rootStigma)
    }
    const [, , icon] = rawData.IconPath.split('/')
    const [, , smallIcon] = rawData.SmallIcon.split('/')

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
      mainId
    })

    return map
  }, new Map<string, RootStigma>())

  return [...stigmataMainIdStigmataMap.values()]
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
