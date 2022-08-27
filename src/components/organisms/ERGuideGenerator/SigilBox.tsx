import { memo } from 'react'
import { Box, Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { SigilSet } from './types'

interface SigilBoxProps {
  sigilSets: SigilSet[]
}

const SigilBox = ({ sigilSets }: SigilBoxProps) => {
  return (
    <Box
      sx={{
        padding: '5px',
        border: 'solid 1px gray',
      }}
    >
      <Flex sx={{ height: 60 }}>
        <Box
          sx={{
            backgroundColor: '#8E5B45',
            p: '5px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            mr: '5px',
          }}
        >
          <Box>회상의</Box>
          <Box>증명</Box>
        </Box>
        {sigilSets.map((sigilSet, index) => {
          return (
            <Box
              key={index}
              sx={{
                backgroundColor: '#615559',
                p: '15px 5px 5px',
                borderRadius: '5px',
                position: 'relative',
                mr: '5px',
                '&:last-child': {
                  mr: 0,
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: '#666887',
                  borderTopLeftRadius: '5px',
                  borderBottomRightRadius: '5px',
                  p: '0 7px',
                  fontSize: 12,
                }}
              >
                {sigilSet.type === 'start'
                  ? '초반'
                  : sigilSet.type === 'mid'
                  ? '중반'
                  : '후반'}
              </Box>
              <Box sx={{ height: 40 }}>
                <Image
                  alt=''
                  src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/${sigilSet.sigilIds[0]}.png`}
                  width={40}
                  height={40}
                  sx={{ mr: '5px', borderRadius: 5 }}
                />
                <Image
                  alt=''
                  src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/${sigilSet.sigilIds[1]}.png`}
                  width={40}
                  height={40}
                  sx={{ borderRadius: 5 }}
                />
              </Box>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

export default memo(SigilBox)
