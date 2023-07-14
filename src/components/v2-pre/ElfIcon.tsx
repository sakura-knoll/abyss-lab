import { assetsBucketBaseUrl } from '../../lib/consts'
import ResizedImage from './ResizedImage'

interface ElfIconProps {
  icon: string
}

const ElfIcon = ({ icon }: ElfIconProps) => {
  return (
    <ResizedImage
      src={`${assetsBucketBaseUrl}/raw/elfcardicons/${icon}.png`}
      originalHeight={120}
      originalWidth={140}
      ratio={0.8}
      alignItems="end"
    />
  )
}

export default ElfIcon
