import { Box, Flex } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { repeat } from '../../lib/utils'

interface RarityBarProps {
  rarity: number
}

const starSize = 16

const RarityBar = ({ rarity }: RarityBarProps) => {
  return (
    <Flex sx={{ marginTop: -starSize / 2, justifyContent: 'center', width: '100%' }}>
      {repeat(rarity, index => (
        <Box
          key={index}
          sx={{
            width: starSize,
            height: starSize,
            zIndex: 1,
            background: `no-repeat 50% / 100% url(${assetsBucketBaseUrl}/raw-misc/StarBig.png)`
          }}
        />
      ))}
    </Flex>
  )
}

export default RarityBar
