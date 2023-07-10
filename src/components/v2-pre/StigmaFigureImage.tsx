import { Box, Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'

interface StigmaFigureImageProps {
  stigma: {
    name: string
    image: string
  }
  size?: number
}

const StigmaFigureImage = ({ size = 720, stigma }: StigmaFigureImageProps) => {
  const ratio = size / 720

  return (
    <Box sx={{ width: size, height: size, position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          left: (size - 720) / 2,
          top: (size - 720) / 2
        }}
      >
        <Flex
          sx={{
            position: 'absolute',
            width: 720,
            height: 720,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            transform: `scale(${ratio})`
          }}
        >
          <Image src={getStigmaFigureImageSrc(stigma.image)} />
        </Flex>
        <Flex
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 720,
            height: 720,
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${ratio})`
          }}
        >
          <Image src={getStigmaFigureTattooImageSrc(stigma.image)} />
        </Flex>
      </Box>
    </Box>
  )
  return (
    <Box
      sx={{
        transform: 'scale(1)',
        width: 720,
        height: 720,
        background: `no-repeat 50% url(${getStigmaFigureImageSrc(
          stigma.image
        )}), no-repeat 50% url(${getStigmaFigureTattooImageSrc(stigma.image)})`
      }}
    />
  )
}

export default StigmaFigureImage

function getStigmaFigureImageSrc(image: string) {
  const [set, type] = image.split('_')
  return `${assetsBucketBaseUrl}/raw/stigmatafigures/${set}_${type}.png`
}

function getStigmaFigureTattooImageSrc(image: string) {
  const [set] = image.split('_')
  return `${assetsBucketBaseUrl}/raw/stigmatafigures/${set}_Tattoo.png`
}
