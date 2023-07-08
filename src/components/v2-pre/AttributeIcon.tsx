import { Image, ThemeUIStyleObject } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { AttributeType } from '../../lib/v2-pre/data/types'

interface AttributeIconProps {
  attributeType: AttributeType
  size?: number
  className?: string
  sx?: ThemeUIStyleObject
}

const AttributeIcon = ({ size, attributeType, className, sx }: AttributeIconProps) => {
  return (
    <Image src={getAttributeIconSrc(attributeType)} width={size} className={className} sx={sx} alt={attributeType} />
  )
}

export default AttributeIcon

function getAttributeIconSrc(attributeType: AttributeType) {
  switch (attributeType) {
    case 'bio':
      return `${assetsBucketBaseUrl}/raw/avatarattricons/AvatarShengWu.png`
    case 'psy':
      return `${assetsBucketBaseUrl}/raw/avatarattricons/AvatarYiNeng.png`
    case 'mech':
      return `${assetsBucketBaseUrl}/raw/avatarattricons/AvatarJiXie.png`
    case 'qua':
      return `${assetsBucketBaseUrl}/raw/avatarattricons/AvatarLiangZi.png`
    case 'img':
      return `${assetsBucketBaseUrl}/raw/avatarattricons/AvatarXuShu.png`
    case 'none':
    default:
      return `${assetsBucketBaseUrl}/raw/avatarattricons/AvatarNone.png`
  }
}
