import fs from 'fs'
import path from 'path'

const cacheMap = new Map()

export function loadRawData(fileName: string): any {
  let result = cacheMap.get(fileName)
  if (result == null) {
    result = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'dump/out', fileName)).toString())
    cacheMap.set(fileName, result)
  }
  return result
}
