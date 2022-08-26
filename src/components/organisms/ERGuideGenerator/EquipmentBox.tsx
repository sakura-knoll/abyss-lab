import { Box, Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'

const EquipmentBox = () => {
  return (
    <Box
      sx={{
        padding: '5px',
        position: 'absolute',
        bottom: '5px',
        left: 15,
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
          <Box>장비</Box>
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
            최선
          </Box>
          <Box sx={{ height: 60 }}>
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/weapons/basilisk-s-image-deathshroud.png`}
              width={40}
              height={40}
              sx={{ mr: '5px' }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-linnaeus-top.png`}
              width={40}
              height={40}
              sx={{ mr: '5px' }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-linnaeus-top.png`}
              width={40}
              height={40}
              sx={{ mr: '5px' }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-linnaeus-top.png`}
              width={40}
              height={40}
              sx={{ mr: '5px' }}
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
              backgroundColor: '#356D7E',
              borderTopLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              p: '0 7px',
              fontSize: 12,
            }}
          >
            차선
          </Box>
          <Box sx={{ height: 60 }}>
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/weapons/basilisk-s-image-deathshroud.png`}
              width={40}
              height={40}
              sx={{ mr: '5px' }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-linnaeus-top.png`}
              width={40}
              height={40}
              sx={{ mr: '5px' }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-linnaeus-top.png`}
              width={40}
              height={40}
              sx={{ mr: '5px' }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-linnaeus-top.png`}
              width={40}
              height={40}
              sx={{ mr: '5px' }}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default EquipmentBox
