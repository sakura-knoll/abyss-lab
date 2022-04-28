import path from 'path'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { existsSync, readFileSync, writeFileSync } from 'fs'

async function run() {
  const contentNumber = process.argv[2]

  const htmlFilePathname = path.join(
    process.cwd(),
    `dump/mihoyo-cn-wiki-${contentNumber}.html`
  )
  const url = getUrl(contentNumber)
  const data = await readOrFetch(htmlFilePathname, url)

  const $ = cheerio.load(data)

  const categories = $('.obc-tmpl-valkyrie__skill-item:nth-child(2n+1)')

  const skills: { title: string; description: string }[] = []
  categories.each((index, element) => {
    const $el = cheerio.load(element)
    const title = $el('.obc-tmpl-valkyrie__skill-item-title').text()
    const description = $el('.obc-tmpl-valkyrie__skill-item-desc').text()
    skills.push({ title, description })
  })

  const avatarImageSrc = $('.obc-tmpl-character__avatar > img').attr('src')

  writeFileSync(
    `dump/valkyrie-${contentNumber}.md`,
    [
      `![](${avatarImageSrc})`,
      '',
      ...skills.map(({ title, description }) => {
        return [`# ${title}`, '', description.trim(), ''].join('\n')
      }),
    ].join('\n')
  )
}

function getUrl(contentNumber: string) {
  return `https://bbs.mihoyo.com/bh3/wiki/content/${contentNumber}/detail`
}

run()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

async function readOrFetch(pathname: string, url: string) {
  if (existsSync(pathname)) {
    return readFileSync(pathname).toString()
  }
  const res = await fetch(url)
  const data = await res.text()
  writeFileSync(pathname, data)
  return data
}
