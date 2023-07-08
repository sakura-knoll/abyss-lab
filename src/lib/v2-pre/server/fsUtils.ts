import fs from 'fs'

export function doesDirExist(pathname: string) {
  try {
    const stat = fs.statSync(pathname)
    if (stat.isDirectory()) {
      return true
    }
    throw new Error('exists but not a dir')
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return false
    }
    console.error(error)
    throw error
  }
}

export function createDirIfNotExist(pathname: string) {
  if (doesDirExist(pathname)) {
    return
  }

  fs.mkdirSync(pathname)
}
