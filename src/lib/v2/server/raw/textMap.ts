import { loadRawData } from './loadRawData'

export function getRawTextMap(locale?: string): RawTextMap {
  if (locale === 'en-US') {
    return loadRawData('TextMap_en.json')
  }
  return loadRawData('TextMap.json')
}

export type RawTextMap = { [key: string]: { Text: 'string' } }
