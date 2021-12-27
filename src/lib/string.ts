export function isVersionString(version: string): boolean {
  return /[0-9]+\.[0-9]+(\.[0-9]+)?/.test(version)
}

export function compareVersion(aVersion: string, bVersion: string): number {
  const [aMajor, aMinor = '0', aPatch = '0'] = aVersion.split('.')
  const [bMajor, bMinor = '0', bPatch = '0'] = bVersion.split('.')

  let result = parseInt(aMajor, 10) - parseInt(bMajor, 10)

  if (result !== 0) {
    return result
  }

  result = parseInt(aMinor, 10) - parseInt(bMinor, 10)

  if (result !== 0) {
    return result
  }

  return parseInt(aPatch, 10) - parseInt(bPatch, 10)
}
