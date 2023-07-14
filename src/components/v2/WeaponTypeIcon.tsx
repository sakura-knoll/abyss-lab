import { Box } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { WeaponType } from '../../lib/v2/data/types'

interface WeaponTypeIconProps {
  type: WeaponType
}

const WeaponTypeIcon = ({ type }: WeaponTypeIconProps) => {
  return (
    <Box
      sx={{
        borderRadius: 5,
        width: 30,
        height: 30,
        background: `no-repeat 50% 50% / 24px url(${assetsBucketBaseUrl}/raw/weapontypeicons/${getWeaponIconPath(
          type
        )}.png), #5a8cb0`
      }}
    ></Box>
  )
}
export default WeaponTypeIcon

function getWeaponIconPath(type: WeaponType) {
  switch (type) {
    case 'pistols':
      return 'DoublePistolType'
    case 'cannon':
      return 'MissileType'
    case 'katana':
      return 'SwordType'
    case 'cross':
      return 'CrossType'
    case '2-handed':
      return 'ClaymoreType'
    case 'scythe':
      return 'ScytheType'
    case 'lance':
      return 'LanceType'
    case 'fists':
      return 'FistType'
    case 'bow':
      return 'BowType'
    case 'chakram':
      return 'BladeRingType'
    case 'javelin':
      return 'JavelinType'
  }
}
