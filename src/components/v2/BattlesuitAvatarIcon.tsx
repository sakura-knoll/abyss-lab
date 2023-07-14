import { Box } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { AttributeType, BattlesuitCatalogItem } from '../../lib/v2/data/types'

interface BattlesuitAvatarIconProps {
  battlesuit: BattlesuitCatalogItem
}

const BattlesuitAvatarIcon = ({ battlesuit }: BattlesuitAvatarIconProps) => {
  return (
    <Box>
      <Box
        sx={{
          borderRadius: 5,
          background: `no-repeat 50% / 130px url(${assetsBucketBaseUrl}/raw/avataricon/${
            battlesuit.id
          }.png), no-repeat 50% / 130px url(${getAttributeBgImageSrc(battlesuit.attributeType)})`,
          width: 130,
          height: 120
        }}
      ></Box>
    </Box>
  )
}

export default BattlesuitAvatarIcon

function getAttributeBgImageSrc(attrId: AttributeType, square = false) {
  if (square) {
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
  switch (attrId) {
    case 'bio':
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrShengWu.png`
    case 'psy':
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrYiNeng.png`
    case 'mech':
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrJiXie.png`
    case 'qua':
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrLiangZi.png`
    case 'img':
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrXuShu.png`
    case 'none':
    default:
      return `${assetsBucketBaseUrl}/raw/avataricon/AttrDefault.png`
  }
}
