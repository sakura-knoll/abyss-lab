import { ErBattlesuit, ErBattlesuitAbility, ErSignet, ErSignetGroup } from '../../data/types'
import { getRawGodWarAvatarAbilityMap } from '../raw/godWarAvatarAbility'
import { getRawGodWarBuffMap } from '../raw/godWarBuff'
import { getRawGodWarBuffSuitMap } from '../raw/godWarBuffSuit'
import { getRawGodWarMainAvatarMap } from '../raw/godWarMainAvatar'
import { getText } from './utils'

export function compileGodWarData() {
  const rawMainAvatarMap = getRawGodWarMainAvatarMap()['1']
  const rawGodWarAvatarAbilityMap = getRawGodWarAvatarAbilityMap()
  const rawGodWarBuffMap = getRawGodWarBuffMap()
  const rawGodWarBuffSuitMap = getRawGodWarBuffSuitMap()
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

  return {
    buffSuitBuffListMap,
    mainAvatarList
  }
}
