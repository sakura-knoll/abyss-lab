import { Box, Flex, Image } from 'theme-ui'

interface SquareImageProps {
  src: string
  originalSize: number
  size?: number
  alt?: string
}

const SquareImage = ({ src, originalSize, size, alt }: SquareImageProps) => {
  if (size == null) {
    size = originalSize
  }

  const ratio = size / originalSize
  return (
    <Box sx={{ width: size, height: size, position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          left: (size - originalSize) / 2,
          top: (size - originalSize) / 2
        }}
      >
        <Flex
          sx={{
            position: 'absolute',
            width: originalSize,
            height: originalSize,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            transform: `scale(${ratio})`
          }}
        >
          <Image src={src} alt={alt} />
        </Flex>
      </Box>
    </Box>
  )
}

export default SquareImage
