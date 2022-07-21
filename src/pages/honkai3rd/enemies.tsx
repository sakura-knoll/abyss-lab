/* eslint-disable jsx-a11y/alt-text */
import { times } from 'ramda'

interface BossSearchPageProps {}

// const AZArray = times((index) => {
//   const charCode = 'A'.charCodeAt(0) + index
//   const result = String.fromCharCode(charCode)
//   return result
// }, 26)
const NumberArray = times((index) => {
  if (index / 100 >= 1) {
    return index
  }
  if (index / 10 >= 1) {
    return '0' + index
  }
  return '00' + index
}, 1000)

const BossSearchPage = ({}: BossSearchPageProps) => {
  return NumberArray.map((item) => {
    return (
      <img
        key={item}
        src={`https://upload-os-bbs.mihoyo.com/game_record/honkai3rd/global/SpriteOutput/OpenWorld/QuestBossIcon/DG_${item}_M01.png`}
      />
    )
  })
  // return AZArray.reduce<string[]>((array, firstChar) => {
  //   return [
  //     ...array,
  //     ...AZArray.map((secondChar) => firstChar + secondChar + '_110.png'),
  //   ]
  // }, []).map((item) => {
  //   return (
  //     <img
  //       key={item}
  //       src={`https://upload-os-bbs.mihoyo.com/game_record/honkai3rd/global/SpriteOutput/OpenWorld/QuestBossIcon/${item}`}
  //     />
  //   )
  // })
}

export default BossSearchPage

// PSY : UL
// MECHA : RO
// BIO : DG
