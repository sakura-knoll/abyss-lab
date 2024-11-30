import fs from 'fs'
import path from 'path'

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

compileArchives()
