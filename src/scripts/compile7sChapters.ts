import fs from 'fs'
import path from 'path'

const locales = ['ko-KR', 'en-US']
const chapters = [4, 6, 7, 11]

function compileNovel(locale: string) {
  const xmlDirPath = path.join(
    __dirname,
    `../../public/novels/7s/${locale}/xml`
  )

  // function splitScene(chapterNumber: number) {
  //   const xmlFilePath = path.join(xmlDirPath, `chapter${chapterNumber}.xml`)

  //   const data = fs.readFileSync(xmlFilePath).toString()

  //   const scriptContent = data
  //     .split('\n')
  //     .slice(3, -2)
  //     .map((line) => line.slice(4))
  //     .join('\n')
  //   const scenes = scriptContent
  //     .split('<scene')
  //     .map((splitted) => '<scene ' + splitted.trim())
  //     .slice(1)
  //   for (const scene of scenes) {
  //     const id = scene.match(/<scene id="([0-9]+)"/)![1]

  //     const sceneXmlPath = path.join(
  //       xmlDirPath,
  //       `scene-${chapterNumber}-${id}.xml`
  //     )

  //     fs.writeFileSync(sceneXmlPath, scene)
  //   }
  // }

  // chapters.forEach(splitScene)

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

locales.forEach(compileNovel)
