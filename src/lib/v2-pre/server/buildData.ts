import {
  AttributeType,
  Battlesuit,
  BattlesuitSkill,
  BattlesuitSubSkill,
  CharacterType,
  SkillTagItem,
  SkillType,
  TagType,
  WeaponType
} from '../data/types'
import { getRawAvatarDataMap } from './raw/avatarData'
import { getRawAvatarSkillDataMap } from './raw/avatarSkillData'
import { getRawAvatarSubSkillDataMap } from './raw/avatarSubSkillData'
import { getRawAvatarTagUnLockDataMap } from './raw/avatarTagUnLockData'
import { getRawTextMap } from './raw/textMap'

export function getText(id: string | number) {
  const rawTextMap = getRawTextMap()
  return rawTextMap[id]?.Text || null
}

export function buildBattlesuitList(): Battlesuit[] {
  const rawAvatarDataMap = getRawAvatarDataMap()
  const rawSkillDataMap = getRawAvatarSkillDataMap()
  const rawSubSkillDataMap = getRawAvatarSubSkillDataMap()
  const rawAvatarTagUnLockDataMap = getRawAvatarTagUnLockDataMap()

  const rawAvatarDataEntries = Object.entries(rawAvatarDataMap)
  const rawSubSkillEntries = Object.entries(rawSubSkillDataMap)

  const battlesuitList = rawAvatarDataEntries.map(([id, rawAvatarData]): Battlesuit => {
    try {
      return {
        id,
        fullName: getText(rawAvatarData.FullName),
        shortName: getText(rawAvatarData.ShortName),
        desc: getText(rawAvatarData.Desc),
        firstName: getText(rawAvatarData.FirstName),
        lastName: getText(rawAvatarData.LastName),
        enFirstName: getText(rawAvatarData.EnFirstName),
        enLastName: getText(rawAvatarData.EnLastName),
        attributeType: convertAttributeToAttributeType(rawAvatarData.Attribute),
        isEasterner: rawAvatarData.IsEasterner,
        weapon: convertClassIdToWeaponType(rawAvatarData.ClassID),
        character: convertRoleIdToCharacterType(rawAvatarData.RoleID),
        initialStar: convertStar(rawAvatarData.UnlockStar, 0),
        tags: rawAvatarData.TagUnlockList.map(rawTagId => {
          const rawAvatarTagUnLock = rawAvatarTagUnLockDataMap[rawTagId]

          return convertRawTagIdToTagType(rawAvatarTagUnLock.TagID)
        }),
        skills: rawAvatarData.SkillList.map<BattlesuitSkill>(rawSkillId => {
          const rawSkillData = rawSkillDataMap[rawSkillId]
          const skillIcon = rawSkillData.IconPath.split('/').pop()
          const subSkills = rawSubSkillEntries.reduce<BattlesuitSubSkill[]>((list, [subSkillId, rawSubSkillData]) => {
            if (rawSubSkillData.SkillId === rawSkillId) {
              const subSkillIcon = rawSubSkillData.IconPath.split('/').pop()
              list.push({
                id: subSkillId,
                name: getText(rawSubSkillData.Name),
                info: getText(rawSubSkillData.Info),
                brief: getText(rawSubSkillData.Brief),
                icon: subSkillIcon || '',
                maxLv: rawSubSkillData.MaxLv,
                paramBase1: rawSubSkillData.ParamBase_1,
                paramBase2: rawSubSkillData.ParamBase_2,
                paramBase3: rawSubSkillData.ParamBase_3,
                paramAdd1: rawSubSkillData.ParamAdd_1,
                paramAdd2: rawSubSkillData.ParamAdd_2,
                paramAdd3: rawSubSkillData.ParamAdd_3,
                tags: rawSubSkillData.TagList.map(convertRawSkillTag),
                toggle: rawSubSkillData.SkillToggle,
                unlockStar: convertStar(rawSubSkillData.UnlockStar, rawSubSkillData.UnlockSubStar)
              })
              return list
            }
            return list
          }, [])

          return {
            id: rawSkillId.toString(),
            name: getText(rawSkillData.Name),
            info: getText(rawSkillData.Info),
            icon: skillIcon || '',
            skillType: convertShowOrderToSkillType(rawSkillData.ShowOrder),
            tags: rawSkillData.TagList.map(convertRawSkillTag),
            paramSubId1: rawSkillData.ParamSubID_1,
            paramSubId2: rawSkillData.ParamSubID_2,
            paramSubId3: rawSkillData.ParamSubID_3,
            subSkills
          }
        })
      }
    } catch (error) {
      console.error(`Failed to converting valk data id:${id}, name: ${getText(rawAvatarData.FullName)}`)
      throw error
    }
  })

  return battlesuitList
}

function convertStar(rawStarValue: number, rawSubStarValue: number) {
  switch (rawStarValue) {
    case 1:
      return 'b'
    case 2:
      return 'a'
    case 3:
      switch (rawSubStarValue) {
        case 1:
          return 's1'
        case 2:
          return 's2'
        case 3:
          return 's3'
        case 0:
          return 's'
      }
    case 4:
      switch (rawSubStarValue) {
        case 1:
          return 'ss1'
        case 2:
          return 'ss2'
        case 3:
          return 'ss3'
        case 0:
          return 'ss'
      }
    case 5:
      return 'sss'
  }
  throw new Error(`Unsupported Raw Star Value (${rawStarValue}, ${rawSubStarValue})`)
}

function convertAttributeToAttributeType(rawValue: number): AttributeType {
  switch (rawValue) {
    case 1:
      return 'bio'
    case 2:
      return 'psy'
    case 3:
      return 'mech'
    case 4:
      return 'qua'
    case 5:
      return 'img'
    case 0:
      return 'none'
    default:
      throw new Error(`Unsupported Raw Attribute(avatar type) (${rawValue})`)
  }
}

function convertClassIdToWeaponType(rawValue: number): WeaponType {
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

function convertRoleIdToCharacterType(rawValue: number): CharacterType {
  switch (rawValue) {
    case 1:
      return 'kiana'
    case 2:
      return 'mei'
    case 3:
      return 'bronya'
    case 4:
      return 'himeko'
    case 5:
      return 'theresa'
    case 6:
      return 'fuhua'
    case 7:
      return 'rita'
    case 8:
      return 'olenyevas'
    case 9:
      return 'seele'
    case 10:
      return 'durandal'
    case 11:
      return 'asuka'
    case 12:
      return 'keqing'
    case 13:
      return 'fischl'
    case 14:
      return 'elysia'
    case 15:
      return 'mobius'
    case 16:
      return 'raven'
    case 17:
      return 'pardofelis'
    case 18:
      return 'aponia'
    case 19:
      return 'eden'
    case 20:
      return 'griseo'
    case 21:
      return 'vill-v'
    case 22:
      return 'sushang'
    case 23:
      return 'ai'
    case 24:
      return 'susannah'
    case 25:
      return 'hare'
    case 26:
      return 'prometheus'
    case 27:
      return 'kira'
    case 101:
      return 'sakura'
    case 102:
      return 'kallen'
    case 103:
      return 'apho-mei'
    case 104:
      return 'apho-adam'
    case 105:
      return 'apho-carol'
    case 106:
      return 'apho-bronya'
    case 107:
      return 'apho-timido'
    default:
      throw new Error(`Unsupported raw roleId(character type) (${rawValue})`)
  }
}

function convertShowOrderToSkillType(rawShowOrder: number): SkillType {
  switch (rawShowOrder) {
    case 1:
      return 'basic'
    case 2:
      return 'special'
    case 3:
      return 'evasion'
    case 4:
      return 'ultimate'
    case 5:
      return 'leader'
    case 6:
      return 'passive'
    case 7:
      return 'sp'
    case 0:
      return 'none'
    default:
      throw new Error(`Unsupported raw show order(Skill) (${rawShowOrder})`)
  }
}

function convertRawTagIdToTagType(rawTagId: number): TagType {
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

function convertRawSkillTag(rawSkillTag: { Strength: number; TagID: number; TagComment: number }): SkillTagItem {
  const comment = getText(rawSkillTag.TagComment)
  return {
    type: convertRawStrengthToType(rawSkillTag.Strength),
    strength: convertRawTagIdToStrength(rawSkillTag.TagID),
    comment
  }

  function convertRawStrengthToType(rawStrength: number): TagType {
    switch (rawStrength) {
      case 239:
        return 'freeze'
      case 240:
        return 'paralyze'
      case 241:
        return 'stun'
      case 242:
        return 'ignite'
      case 243:
        return 'bleed'
      case 244:
        return 'heavy-atk'
    }
    throw new Error(`Invalid raw strength (raw: ${rawStrength}, comment: ${comment})`)
  }

  function convertRawTagIdToStrength(rawTagId: number): 1 | 2 | 3 | 4 {
    switch (rawTagId) {
      case 16777219:
        return 1
      case 33554435:
        return 2
      case 50331651:
        return 3
      case 67108867:
        return 4
    }
    throw new Error(`Invalid raw tag Id (raw: ${rawTagId}, comment: ${comment})`)
  }
}
