/** @jsxImportSource theme-ui */
import { Box } from '@theme-ui/components'
import Image from 'next/image'

interface SquareImageBoxProps {
  size: number | string
  src: string
  alt?: string
  m?: number | string
  mt?: number | string
  mb?: number | string
  ml?: number | string
  mr?: number | string
  mx?: number | string
  my?: number | string
}

const SquareImageBox = ({
  size,
  src,
  alt,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
}: SquareImageBoxProps) => {
  return (
    <Box
      m={m}
      mx={mx}
      my={my}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: size,
        height: size,
        borderRadius: 4,
        flexShrink: 0,
      }}
    >
      <Image alt={alt} layout='fill' objectFit='cover' src={src} />
    </Box>
  )
}

export default SquareImageBox
