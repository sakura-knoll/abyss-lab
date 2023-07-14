import { loadRawData } from './loadRawData'

export function getRawAvatarTagUnLockDataMap(): RawAvatarTagUnLockDataMap {
  return loadRawData('AvatarTagUnLock.json')
}

export type RawAvatarTagUnLockDataMap = {
  [key: string]: RawAvatarTagUnLockData
}

export interface RawAvatarTagUnLockData {
  TagID: number
  TagSecondDesc: number
  UnlockSkillIDList: number[]
  UnlockSubSkillIDList: number[]
}
