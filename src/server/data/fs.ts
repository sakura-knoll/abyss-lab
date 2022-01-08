import fs from 'fs'
import path from 'path'

const basePathname = path.join(process.cwd(), 'public/data')

export function resolvePathname(pathname: string) {
  return path.join(basePathname, pathname)
}

export function readdirSync(pathname: string) {
  const fileList = fs.readdirSync(resolvePathname(pathname))

  return fileList
}

export function readFileSync(pathname: string) {
  return fs.readFileSync(resolvePathname(pathname))
}

export function readJsonFileSync(pathname: string) {
  const rawData = readFileSync(pathname).toString()

  return JSON.parse(rawData)
}

export function writeFileSync(pathname: string, content: string) {
  return fs.writeFileSync(resolvePathname(pathname), content)
}

export function existsSync(pathname: string) {
  return fs.existsSync(resolvePathname(pathname))
}
