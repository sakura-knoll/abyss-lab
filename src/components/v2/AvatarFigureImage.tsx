import { Image, ThemeUICSSObject } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'

interface AvatarFigureImageProps {
  battlesuitId: string
  className?: string
  sx?: ThemeUICSSObject
}

const AvatarFigureImage = ({ battlesuitId, className, sx }: AvatarFigureImageProps) => {
  return <Image src={getAvatarFigureImageSrc(battlesuitId)} className={className} alt={battlesuitId} sx={sx} />
}

export default AvatarFigureImage

function getAvatarFigureImageSrc(battlesuitId: string) {
  if (battlesuitId.length < 4) {
    return `${assetsBucketBaseUrl}/raw/avatarcardfigures/60${battlesuitId}.png`
  }
  return `${assetsBucketBaseUrl}/raw/avatarcardfigures/6${battlesuitId}.png`
}
