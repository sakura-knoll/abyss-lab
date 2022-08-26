import { Box, Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'

const SupportBox = () => {
  return (
    <Box
      sx={{
        padding: '5px',
        position: 'absolute',
        bottom: 165,
        left: 15,
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
        <Box
          sx={{
            backgroundColor: '#615559',
            p: '15px 5px 5px',
            borderRadius: '5px',
            position: 'relative',
            mr: '5px',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: '#356D7E',
              borderTopLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              p: '0 7px',
              fontSize: 12,
            }}
          >
            유틸
          </Box>
          <Box sx={{ height: 40 }}>
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-ae.png`}
              width={40}
              height={40}
              sx={{ mr: '5px' }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-le.png`}
              width={40}
              height={40}
            />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: '#615559',
            p: '15px 5px 5px',
            borderRadius: '5px',
            position: 'relative',
            mr: '5px',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: '#EE4D2A',
              borderTopLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              p: '0 7px',
              fontSize: 12,
            }}
          >
            딜링
          </Box>
          <Box sx={{ height: 40 }}>
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-ae.png`}
              width={40}
              height={40}
              sx={{ mr: '5px' }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-le.png`}
              width={40}
              height={40}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default SupportBox
