import { Box, Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { AttributeType, BattlesuitCatalogItem } from '../../lib/v2-pre/data/types'

interface BattlesuitAvatarIconProps {
  battlesuit: BattlesuitCatalogItem
  ratio?: number
}

const width = 136
const height = 120

const BattlesuitSmallIcon = ({ battlesuit, ratio = 1 }: BattlesuitAvatarIconProps) => {
  const targetWidth = 136 * ratio
  const targetHeight = height * ratio
  return (
    <Box sx={{ width: targetWidth, height: targetHeight, position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          left: (targetWidth - 136) / 2,
          top: (targetHeight - 120) / 2
        }}
      >
        <Flex
          sx={{
            position: 'absolute',
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            transform: `scale(${ratio})`
          }}
        >
          <Image src={getBattlesuitCardIconSrc(battlesuit)} />
        </Flex>
        <Flex
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${ratio})`
          }}
        >
          <Image src={getAttributeBgImageSrc(battlesuit.attributeType)} />
        </Flex>
      </Box>
    </Box>
  )
  return (
    <Box>
      <Box
        sx={{
          borderRadius: 5,
          background: `no-repeat 50% url(${getBattlesuitCardIconSrc(
            battlesuit
          )}), no-repeat 50% url(${getAttributeBgImageSrc(battlesuit.attributeType)})`,
          width: 130,
          height: 120
        }}
      ></Box>
    </Box>
  )
}

export default BattlesuitSmallIcon

function getAttributeBgImageSrc(attrId: AttributeType) {
  switch (attrId) {
    case 'bio':
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrShengWu1.png`
    case 'psy':
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrYiNeng1.png`
    case 'mech':
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrJiXie1.png`
    case 'qua':
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrLiangZi1.png`
    case 'img':
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrXuShu1.png`
    case 'none':
    default:
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrDefault.png`
  }
}

function getBattlesuitCardIconSrc(battlesuit: BattlesuitCatalogItem) {
  return `${assetsBucketBaseUrl}/raw/avatarcardicons/${
    battlesuit.id.length > 3 ? `6${battlesuit.id}` : `60${battlesuit.id}`
  }.png`
}
