import { Box, Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import { SupportSet } from './types'

interface SupportBoxProps {
  supportSets: SupportSet[]
  battlesuits: BattlesuitData[]
}

const SupportBox = ({ supportSets }: SupportBoxProps) => {
  return (
    <Box
      sx={{
        padding: '5px',
        border: 'solid 1px gray',
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
          }}
        >
          <Box>지원</Box>
          <Box>발키리</Box>
        </Box>
        {supportSets.map((supportSet, index) => {
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
                  backgroundColor:
                    supportSet.type === 'util' ? '#356D7E' : '#EE4D2A',
                  borderTopLeftRadius: '5px',
                  borderBottomRightRadius: '5px',
                  p: '0 7px',
                  fontSize: 12,
                }}
              >
                {supportSet.type === 'util' ? '유틸' : '딜링'}
              </Box>
              <Box sx={{ height: 40 }}>
                {supportSet.battlesuitIds.map((battlesuitId) => {
                  return (
                    <Image
                      key={battlesuitId}
                      alt=''
                      src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${battlesuitId}.png`}
                      width={40}
                      height={40}
                      sx={{ mr: '5px', '&:last-child': { mr: 0 } }}
                    />
                  )
                })}
              </Box>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

export default SupportBox
