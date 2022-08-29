import { Box, Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { SupportSet } from './types'

interface SupportBoxProps {
  supportSets: SupportSet[]
}

const SupportBox = ({ supportSets }: SupportBoxProps) => {
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
            width: 55,
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
                      sx={{
                        borderRadius: '5px',
                        mr: '5px',
                        '&:last-child': { mr: 0 },
                      }}
                    />
                  )
                })}
              </Box>
              <Flex
                sx={{
                  height: 20,
                  fontSize: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {getSupportName(supportSet.battlesuitIds[0])}+
                {getSupportName(supportSet.battlesuitIds[1])}
              </Flex>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

export default SupportBox

function getSupportName(id: string) {
  switch (id) {
    case 'le':
      return '귀메'
    case 'vc':
      return '삐로냐'
    case 'ss':
      return '빙로냐'
    case 'sn':
      return '쩨레'
    case 'br':
      return '스메코'
    case 'ae':
      return '선인'
    case 'hb':
      return '브로니'
    case 'ma':
      return '레이븐'
    case 'dp':
      return '성녀'
    case 'bke':
      return '월백'
    case 'rc':
      return '파르도'
    case 'sa':
      return '테갈'
  }
}
