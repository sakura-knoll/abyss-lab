import { ErBattlesuit, ErBattlesuitAbility, ErSigil, ErSignet, ErSupportBattlesuit } from '../../data/types'
import { getRawGodWarAvatarAbilityMap } from '../raw/godWarAvatarAbility'
import { getRawGodWarBuffMap } from '../raw/godWarBuff'
import { getRawGodWarExtraItemMap } from '../raw/godWarExxtraItem'
import { getRawGodWarMainAvatarMap } from '../raw/godWarMainAvatar'
import { getRawGodWarSupportAvatarMap } from '../raw/godWarSupportAvatar'
import { createGetText } from './utils'

export function compileGodWarData(locale: string) {
  const rawMainAvatarMap = getRawGodWarMainAvatarMap()['1']
  const rawGodWarAvatarAbilityMap = getRawGodWarAvatarAbilityMap()
  const rawGodWarBuffMap = getRawGodWarBuffMap()
  const rawGodWarSupportAvatarMap = getRawGodWarSupportAvatarMap()['1']
  const rawGodWarExtraItemMap = getRawGodWarExtraItemMap()
  const getText = createGetText(locale)

  const battlesuitIdRawBuffListMap = new Map<string, ErSignet[]>()
  const buffSuitBuffListMap = new Map<string, ErSignet[]>()

  Object.entries(rawGodWarBuffMap).forEach(([id1, rawbuffMap]) => {
    const rawBuffList = Object.entries(rawbuffMap)
    rawBuffList.forEach(([id2, rawBuff]) => {
      const buffSuit = rawBuff.BuffSuit.toString()
      // No data
      if (buffSuit === '0') {
        return
      }
      if (buffSuit === '8') {
        const buffGroupId = rawBuff.BuffGroup.toString()
        let buffList = battlesuitIdRawBuffListMap.get(buffGroupId)
        if (buffList == null) {
          buffList = []
          battlesuitIdRawBuffListMap.set(buffGroupId, buffList)
        }
        buffList.push({
          id: `${id1}-${id2}`,
          name: getText(rawBuff.BuffName),
          desc: getText(rawBuff.BuffDesc),
          buffSuit,
          quality: rawBuff.BuffQuality
        })
      } else {
        if (rawBuff.BuffSuit < 10 && id1.length > 4) {
          return
        }
        let buffList = buffSuitBuffListMap.get(buffSuit)
        if (buffList == null) {
          buffList = []
          buffSuitBuffListMap.set(buffSuit, buffList)
        }
        buffList.push({
          id: `${id1}-${id2}`,
          name: getText(rawBuff.BuffName),
          desc: getText(rawBuff.BuffDesc),
          buffSuit,
          quality: rawBuff.BuffQuality
        })
      }
    })
  })

  const mainAvatarList = Object.entries(rawMainAvatarMap).map<ErBattlesuit>(([id, rawData]) => {
    const abilities = rawData.AvatarAbilityID.map<ErBattlesuitAbility>(id => {
      const stringId = id.toString()
      const rawAbility = rawGodWarAvatarAbilityMap[stringId]

      return {
        id: stringId,
        type: rawAbility.AbilityType,
        name: getText(rawAbility.AbilityTitle),
        desc: getText(rawAbility.AbilityDes)
      }
    })
    const signets = battlesuitIdRawBuffListMap.get(id)!

    return {
      battlesuit: id,
      abilities,
      signets
    }
  })

  const supportAvatarList = Object.entries(rawGodWarSupportAvatarMap).map<ErSupportBattlesuit>(([id, rawData]) => {
    return {
      battlesuit: id,
      name: getText(rawData.SkillName),
      desc: getText(rawData.SkillDesc),
      cd: rawData.CD
    }
  })

  const sigilList = Object.entries(rawGodWarExtraItemMap).map<ErSigil>(([id, rawData]) => {
    return {
      id,
      name: getText(rawData.ExtraItemName),
      desc: getText(rawData.ExtraItemSkill),
      type: rawData.ExtraItemType,
      unlockHint: getText(rawData.UnlockExtraItemHint)
    }
  })

  return {
    buffSuitBuffListMap,
    mainAvatarList,
    supportAvatarList,
    sigilList
  }
}
