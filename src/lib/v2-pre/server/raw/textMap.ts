import { loadRawData } from './loadRawData'

export function getRawTextMap(): RawTextMap {
  return loadRawData('TextMap.json')
}

export type RawTextMap = { [key: string]: { Text: 'string' } }
