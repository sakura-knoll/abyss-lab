import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const numberOfChapters = 31

function getChapterXML(chapterNumber: number) {
  return `http://event.houkai3rd.com/avgAntiEntropy/lang_JP/xml/ch${chapterNumber}.xml`
}

async function run() {
  for (
    let chapterNumber = 1;
    chapterNumber <= numberOfChapters;
    chapterNumber++
  ) {
    const chapterUrl = getChapterXML(chapterNumber)
    const res = await fetch(chapterUrl)
    const xmlBuffer = Buffer.from(await res.arrayBuffer())
    const destinationPath = path.join(
      __dirname,
      '../../public/novels/ae/xml/',
      `ch${chapterNumber}.xml`
    )
    fs.writeFileSync(destinationPath, xmlBuffer)
  }
}

run()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
