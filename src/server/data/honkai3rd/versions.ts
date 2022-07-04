import { format } from 'date-fns'
import { compareVersion } from '../../../lib/string'
import { VersionData } from '../../../lib/honkai3rd/versions'
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'
import { omit } from 'ramda'

let cachedData: any = null
export function listVersionData(locale?: string): VersionData[] {
  if (cachedData == null) {
    cachedData = yaml.parse(
      fs
        .readFileSync(path.join(process.cwd(), 'data/honkai3rd/versions.yaml'))
        .toString('utf-8')
    )
  }
  const versions = cachedData
  const localized = versions
    .map((version: any) => {
      return {
        ...omit(['krName'], version),
        name: locale === 'ko-KR' ? version.krName : version.name,
      }
    })
    .sort((a: any, b: any) => {
      return compareVersion(b.version, a.version)
    })

  return localized
}

export function getVersion(version: number | string, locale?: string) {
  return listVersionData(locale).find((versionData) => {
    return versionData.version.toString() === version.toString()
  })
}

export function getCurrentVersion(locale?: string) {
  const todayDateString = format(new Date(), 'yyyy-MM-dd')

  return listVersionData(locale).find((versionData) => {
    const [startDateString] = versionData.duration

    return startDateString.localeCompare(todayDateString) <= 0
  })
}
