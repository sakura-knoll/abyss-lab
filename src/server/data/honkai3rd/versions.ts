import { format } from 'date-fns'
import { readdirSync, readFileSync, readJsonFileSync } from '../../../lib/data'
import { compareVersion } from '../../../lib/string'

export interface VersionData {
  version: string
  previousVersion?: string
  nextVersion?: string
  name: string
  duration: [string, string]
  verified: boolean
  newBattlesuits: string[]
  newWeapons: string[]
  description: string
}

const versionDirectoryList = readdirSync('honkai3rd/versions')

const versionDataList = versionDirectoryList
  .map((directoryName) => {
    const directoryPathname = 'honkai3rd/versions/' + directoryName
    const data: VersionData = {
      version: directoryName,
      ...readJsonFileSync(directoryPathname + '/version-data.json'),
      description: readFileSync(
        directoryPathname + '/description.md'
      ).toString(),
    }

    return data
  })
  .sort((a, b) => {
    return compareVersion(b.version, a.version)
  })

export function listVersionData() {
  return versionDataList
}

export function getVersion(version: number | string) {
  return versionDataList.find((versionData) => {
    return versionData.version.toString() === version.toString()
  })
}

export function getCurrentVersion() {
  const todayDateString = format(new Date(), 'yyyy-MM-dd')

  return versionDataList.find((versionData) => {
    const [startDateString] = versionData.duration

    return startDateString.localeCompare(todayDateString) < 0
  })
}
