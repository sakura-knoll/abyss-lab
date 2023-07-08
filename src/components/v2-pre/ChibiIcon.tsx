import { Box } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { CharacterType } from '../../lib/v2-pre/data/types'

interface ChibiIconProps {
  id: string
}

const ChibiIcon = ({ id }: ChibiIconProps) => {
  return (
    <Box
      sx={{
        width: 30,
        height: 30,
        background: `no-repeat 50% 50% / 30px url(${assetsBucketBaseUrl}/raw/avatarchibiicons/${getChibiIconName(
          id
        )}.png)`
      }}
    ></Box>
  )
}

export default ChibiIcon

export function getChibiIconName(idOrType: string | CharacterType) {
  switch (idOrType) {
    case 'kiana':
      return '106'
    case 'mei':
      return '206'
    case 'bronya':
      return '317'
    case 'himeko':
      return '412'
    case 'theresa':
      return '502_05_01'
    case 'fuhua':
      return '612'
    case 'rita':
      return '706'
    case 'sakura':
      return '212'
    case 'kallen':
      return '111'
    case 'olenyevas':
      return '422_05_01'
    case 'seele':
      return '713'
    case 'durandal':
      return '804'
    case 'fischl':
      return '2101'
    case 'elysia':
      return '2202'
    case 'mobius':
      return '2301'
    case 'raven':
      return '2401'
    case 'carole':
      return '2501'
    case 'pardofelis':
      return '2601'
    case 'aponia':
      return '2701'
    case 'eden':
      return '2801'
    case 'griseo':
      return '2901'
    case 'vill-v':
      return '3001'
    case 'sushang':
      return '3101'
    case 'ai':
      return '3201'
    case 'susannah':
      return '3301'
    case 'hare':
      return '3401'
    case 'prometheus':
      return '3501'
    case 'kira':
      return '3601'
    case 'asuka':
      return '901'
    case 'keqing':
      return '2001'
    default:
      return 'IconAvatarQuestion'
  }
}
