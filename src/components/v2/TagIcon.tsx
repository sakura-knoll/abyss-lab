import { Box } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { TagType } from '../../lib/v2/data/types'

interface TagIconProps {
  type: TagType
  strength?: 1 | 2 | 3 | 4
  size?: 'sm' | 'md'
  comment?: string
}

const TagIcon = ({ type, strength, size = 'md', comment }: TagIconProps) => {
  const boxSizePx = size === 'md' ? '30px' : '20px'
  const iconSizePx = size === 'md' ? '24px' : '16px'
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          right: '2px',
          top: '-2px',
          fontSize: 0,
          color: 'white',
          textShadow:
            '#555 0px 0px 1px,   #555 0px 0px 1px,   #555 0px 0px 1px,#555 0px 0px 1px,   #555 0px 0px 1px,   #555 0px 0px 1px'
        }}
      >
        {strength}
      </Box>
      <Box
        title={comment}
        sx={{
          borderRadius: 5,
          width: boxSizePx,
          height: boxSizePx,
          background: `no-repeat 50% / ${iconSizePx} ${iconSizePx} url(${assetsBucketBaseUrl}/raw/newstateicon/${getTagIconFileName(
            type
          )}.png), #5a8cb0`
        }}
      />
    </Box>
  )
}

export default TagIcon

function getTagIconFileName(type: TagType) {
  switch (type) {
    case 'branch':
      return 'State_Branch'
    case 'charge':
      return 'State_Charge'
    case 'physical-dmg':
      return 'State_Physical'
    case 'fire-dmg':
      return 'State_Fire'
    case 'ice-dmg':
      return 'State_Ice'
    case 'lightning-dmg':
      return 'State_Lightning'
    case 'freeze':
      return 'State_Frozen'
    case 'paralyze':
      return 'State_Paralysis'
    case 'stun':
      return 'State_Stun'
    case 'ignite':
      return 'State_Burn'
    case 'bleed':
      return 'State_Bleading'
    case 'heavy-atk':
      return 'State_Smash'
    case 'weaken':
      return 'State_Weak'
    case 'impair':
      return 'State_Fragile'
    case 'float':
      return 'State_Float'
    case 'time-mastery':
      return 'State_WitchTime'
    case 'gather':
      return 'State_SlowDown'
    case 'heal':
      return 'State_Heal'
    case 'fast-atk':
      return 'State_HighFreq'
    case 'burst':
      return 'State_Burst'
    case 'shield':
      return 'State_Shield'
    case 'aerial':
      return 'State_AntiAir'
    case 'ranged':
      return 'State_Remote'
    case 'meele':
      return 'State_Meele'
  }
}
