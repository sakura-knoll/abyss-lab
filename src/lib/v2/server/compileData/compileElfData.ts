import { ListMap } from '../../../utils'
import { Elf, ElfSkill } from '../../data/types'
import { getRawElfDataMap } from '../raw/elfData'
import { getRawElfSkillDataMap } from '../raw/elfSkillData'
import { convertTagType, getText } from './utils'

export function compileElfData() {
  const rawElfDataMap = getRawElfDataMap()
  const rawElfSkillDataMap = getRawElfSkillDataMap()

  const rawElfSkillMap = Object.entries(rawElfSkillDataMap).reduce<ListMap<string, ElfSkill>>(
    (map, [id, rawSkillData]) => {
      const elfId = rawSkillData.ElfID.toString()
      map.set(elfId, {
        id,
        elfId,
        name: getText(rawSkillData.Name),
        info: getText(rawSkillData.Info),
        skillType: getText(rawSkillData.SkillTypeTag),
        skillTypeId: rawSkillData.SkillType.toString(),
        icon: rawSkillData.IconPath.split('/').pop()!,
        row: rawSkillData.UIPointRow,
        col: rawSkillData.UIPointColumn,
        unlockStar: rawSkillData.UnlockStar,
        maxLv: rawSkillData.MaxLv,
        paramBase1: rawSkillData.AbilityParamBase_1,
        paramBase2: rawSkillData.AbilityParamBase_2,
        paramBase3: rawSkillData.AbilityParamBase_3,
        paramAdd1: rawSkillData.AbilityParamAdd_1,
        paramAdd2: rawSkillData.AbilityParamAdd_2,
        paramAdd3: rawSkillData.AbilityParamAdd_3
      })
      return map
    },
    new ListMap()
  )

  const elfs = Object.entries(rawElfDataMap).map<Elf>(([id, rawData]) => {
    const skills = rawElfSkillMap.get(id) || []
    return {
      id,
      fullName: getText(rawData.FullName),
      icon: rawData.IconPath.split('/').pop()!,
      cardIcon: rawData.StoryBGImg.split('/').pop()!,
      chibiIcon: rawData.ElfChibiIcon.split('/').pop()!,
      figureImage: rawData.StoryBGImg.split('/').pop()!,
      rarity: rawData.Rarity,
      cardId: rawData.ElfCardID,
      fragmentId: rawData.ElfFragmentID,
      storyDesc: getText(rawData.StoryDesc),
      ultSkillCd: rawData.UltraSkillCD,
      ultSkillCost: rawData.UltraSkillSPCost,
      skillBg: rawData.SkillTabBGImg.split('/').pop()!,
      tags: rawData.TagList.map(rawTag => {
        return {
          type: convertTagType(rawTag.TagID),
          comment: getText(rawTag.TagComment)
        }
      }),
      captainSkillIds: rawData.CaptainSkillIDs.map(rawId => rawId.toString()),
      skills
    }
  })

  return elfs
}
