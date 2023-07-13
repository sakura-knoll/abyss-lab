import { assetsBucketBaseUrl } from '../../lib/consts'
import SquareImage from './SquareImage'

interface MaterialIconProps {
  materialId: string
  size?: number
}

const MaterialIcon = ({ materialId, size = 50 }: MaterialIconProps) => {
  return (
    <SquareImage src={`${assetsBucketBaseUrl}/raw/materialfigures/${materialId}.png`} originalSize={250} size={50} />
  )
}

export default MaterialIcon
