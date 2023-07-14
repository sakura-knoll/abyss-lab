import { TagType, WeaponType } from '../../data/types'
import { RawEquipmentSkillData } from '../raw/equipmentSkillData'
import { getRawTextMap } from '../raw/textMap'

export function getText(id: string | number) {
  const rawTextMap = getRawTextMap()
  return rawTextMap[id]?.Text || null
}

export function convertWeaponType(rawValue: number): WeaponType {
  switch (rawValue) {
    case 1:
      return 'pistols'
    case 2:
      return 'katana'
    case 3:
      return 'cannon'
    case 4:
      return '2-handed'
    case 5:
      return 'cross'
    case 6:
      return 'fists'
    case 7:
      return 'scythe'
    case 8:
      return 'lance'
    case 9:
      return 'bow'
    case 10:
      return 'chakram'
    case 11:
      return 'javelin'
    default:
      throw new Error(`Unsupported raw classId(weapon type) (${rawValue})`)
  }
}

export function convertTagType(rawTagId: number): TagType {
  switch (rawTagId) {
    case 1001:
      return 'branch'
    case 1002:
      return 'charge'
    case 1003:
      return 'physical-dmg'
    case 1004:
      return 'fire-dmg'
    case 1005:
      return 'ice-dmg'
    case 1006:
      return 'lightning-dmg'
    case 1007:
      return 'freeze'
    case 1008:
      return 'paralyze'
    case 1009:
      return 'stun'
    case 1010:
      return 'ignite'
    case 1011:
      return 'bleed'
    case 1012:
      return 'heavy-atk'
    case 1013:
      return 'weaken'
    case 1014:
      return 'impair'
    case 1015:
      return 'float'
    case 1016:
      return 'slow-down'
    case 1017:
      return 'time-mastery'
    case 1018:
      return 'gather'
    case 1019:
      return 'heal'
    case 1020:
      return 'fast-atk'
    case 1021:
      return 'burst'
    case 1022:
      return 'shield'
    case 1023:
      return 'aerial'
    case 1024:
      return 'ranged'
    case 1025:
      return 'meele'
  }

  throw new Error(`Unsupported raw show order(Skill) (${rawTagId})`)
}

export function convertEquipmentSkill(rawSkill: RawEquipmentSkillData) {
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
