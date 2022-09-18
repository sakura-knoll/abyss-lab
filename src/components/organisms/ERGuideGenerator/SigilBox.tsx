import { memo } from 'react'
import { Box, Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { RemembranceSigil } from '../../../lib/honkai3rd/elysianRealm'
import { ERGGSigilSet } from './types'

interface SigilBoxProps {
  sigilSets: ERGGSigilSet[]
  sigils: RemembranceSigil[]
}

const SigilBox = ({ sigilSets, sigils }: SigilBoxProps) => {
  return (
    <Box
      sx={{
        padding: '5px',
        border: 'solid 1px gray',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(0,0,0,0.5)',
        boxShadow: '5px 5px 10px rgba(0,0,0,0.5)',
      }}
    >
      <Flex>
        <Box
          sx={{
            backgroundColor: '#8E5B45',
            p: '5px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            mr: '5px',
            width: 55,
          }}
          className='leftBottomBoxLabel'
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
                p: '15px 5px 0',
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
                  backgroundColor:
                    sigilSet.type === 'start'
                      ? '#666480'
                      : sigilSet.type === 'mid'
                      ? '#8A6A5C'
                      : '#C06848',
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
              <Flex
                sx={{
                  height: 20,
                  fontSize: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {getSigilName(sigilSet.sigilIds[0])}+
                {getSigilName(sigilSet.sigilIds[1])}
              </Flex>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )

  function getSigilName(id: string) {
    return sigils.find((sigil) => sigil.id === id)?.name.slice(0, 3)
  }
}

export default memo(SigilBox)
