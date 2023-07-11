import { Box, Flex } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { repeat } from '../../lib/utils'

interface WeaponIconProps {
  icon: string
  rarity?: number
}

const starSize = 16

const WeaponIcon = ({ icon: fileName, rarity }: WeaponIconProps) => {
  return (
    <Box sx={{ width: 112 }}>
      <Box
        sx={{
          borderRadius: 4,
          width: (128 / 8) * 7,
          height: (112 / 8) * 7,
          background: ` no-repeat 100% 100% /100% url(${assetsBucketBaseUrl}/raw/weaponicons/${fileName}.png), ${getBackgroundByRarity(
            rarity
          )}`
        }}
      />
      {rarity != null && (
        <Flex sx={{ marginTop: -starSize / 2, justifyContent: 'center', width: '100%' }}>
          {repeat(rarity, index => (
            <Box
              key={index}
              sx={{
                width: starSize,
                height: starSize,
                background: `no-repeat 50% / 100% url(${assetsBucketBaseUrl}/raw-misc/StarBig.png)`
              }}
            />
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default WeaponIcon

function getBackgroundByRarity(rarity?: number) {
  switch (rarity) {
    case 6:
      return 'linear-gradient(180deg, #e18434, #fbd977)'
    case 5:
      return 'linear-gradient(transparent, #c86de0),#7630a3'
    case 4:
    case 3:
      return 'linear-gradient(transparent, #0ec1eb), #2368b1'
    case 2:
      return `linear-gradient(transparent, #52c389),#31756c`
    default:
      return 'transparent'
  }
}