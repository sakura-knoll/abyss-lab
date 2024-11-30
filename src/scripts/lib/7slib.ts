import fs from 'fs'
import path from 'path'

export function compileNovel(locale: string, chapters: number[]) {
  const xmlDirPath = path.join(
    __dirname,
    `../../../public/novels/7s/${locale}/xml`
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
