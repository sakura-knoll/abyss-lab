/* eslint-disable jsx-a11y/alt-text */
import { Box, Flex, Image } from 'theme-ui'

interface ResizedImageProps {
  src: string | string[]
  originalWidth: number
  originalHeight: number
  ratio?: number
  alignItems?: string
}

const ResizedImage = ({ src, originalWidth, originalHeight, ratio = 1, alignItems = 'center' }: ResizedImageProps) => {
  if (typeof src === 'string') {
    src = [src]
  }
  const targetWidth = originalWidth * ratio
  const targetHeight = originalHeight * ratio
  return (
    <Box sx={{ width: targetWidth, height: targetHeight, position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          left: (targetWidth - originalWidth) / 2,
          top: (targetHeight - originalHeight) / 2
        }}
      >
        {src.map((aSrc, index) => {
          return (
            <Flex
              key={index}
              sx={{
                position: 'absolute',
                width: originalWidth,
                height: originalHeight,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                transform: `scale(${ratio})`
              }}
            >
              <Image src={aSrc} />
            </Flex>
          )
        })}
      </Box>
    </Box>
  )
}

export default ResizedImage
