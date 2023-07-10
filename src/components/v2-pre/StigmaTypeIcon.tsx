import { Box } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { StigmaType } from '../../lib/v2-pre/data/types'

interface StigmaTypeIconProps {
  type: StigmaType
}

const StigmaTypeIcon = ({ type }: StigmaTypeIconProps) => {
  return (
    <Box
      sx={{
        borderRadius: 5,
        width: 30,
        height: 30,
        background: `no-repeat 50% 50% / 24px url(${assetsBucketBaseUrl}/raw/weapontypeicons/${getStigmaTypeIcon(
          type
        )}.png), #5a8cb0`
      }}
    ></Box>
  )
}
export default StigmaTypeIcon

function getStigmaTypeIcon(type: StigmaType) {
  switch (type) {
    case 'top':
      return 'Up'
    case 'mid':
      return 'Middle'
    case 'bot':
      return 'Down'
  }
}
