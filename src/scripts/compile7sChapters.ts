import fs from 'fs'
import path from 'path'

const locales = ['ko-KR', 'en-US']
const chapters = [4, 6, 7, 11]

function compileNovel(locale: string) {
  const xmlDirPath = path.join(
    __dirname,
    `../../public/novels/7s/${locale}/xml`
  )

  const list = fs.readdirSync(xmlDirPath)

  function concatScenes(chapterNumber: number) {
    const sceneFileNames = list.filter((item) =>
      item.startsWith(`scene-${chapterNumber}`)
    )
    const scenes = sceneFileNames.map((fileName) => {
      return fs
        .readFileSync(path.join(xmlDirPath, fileName))
        .toString()
        .split('\n')
        .map((line) => '    ' + line)
        .join('\n')
    })

    const chapter = `<?xml version="1.0" encoding="utf-8"?>
  <data>
    <scripts>
  ${scenes.join('\n')}
    </scripts>
  </data>
  `

    const sceneXmlPath = path.join(xmlDirPath, `compiled-${chapterNumber}.xml`)

    fs.writeFileSync(sceneXmlPath, chapter)
  }

  chapters.forEach(concatScenes)
}

function compileArchives() {
  const fileNames = fs
    .readdirSync(path.join(__dirname, '../../public/novels/7s/ko-KR/archives'))
    .filter((fileName) => fileName.endsWith('.txt'))
  const archiveMap: { [key: string]: string } = {}
  for (const fileName of fileNames) {
    const filePath = path.join(
      __dirname,
      '../../public/novels/7s/ko-KR/archives',
      fileName
    )

    const description = fs.readFileSync(filePath).toString()
    const [id] = fileName.split('.')
    archiveMap[id] = description
  }

  fs.writeFileSync(
    path.join(__dirname, '../../public/novels/7s/ko-KR/archives.js'),
    `const archiveMap = ${JSON.stringify(archiveMap)}`
  )
}

locales.forEach(compileNovel)

compileArchives()
