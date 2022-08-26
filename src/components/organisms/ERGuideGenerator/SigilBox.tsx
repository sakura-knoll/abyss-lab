import { Box, Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'

const SigilBox = () => {
  return (
    <Box
      sx={{
        padding: '5px',
        position: 'absolute',
        bottom: 85,
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
          <Box>회상의</Box>
          <Box>증명</Box>
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
              backgroundColor: '#666887',
              borderTopLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              p: '0 7px',
              fontSize: 12,
            }}
          >
            초반
          </Box>
          <Box sx={{ height: 40 }}>
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/burden.png`}
              width={40}
              height={40}
              sx={{ mr: '5px', borderRadius: 5 }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/burden.png`}
              width={40}
              height={40}
              sx={{ mr: '5px', borderRadius: 5 }}
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
              backgroundColor: '#666887',
              borderTopLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              p: '0 7px',
              fontSize: 12,
            }}
          >
            중반
          </Box>
          <Box sx={{ height: 40 }}>
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/burden.png`}
              width={40}
              height={40}
              sx={{ mr: '5px', borderRadius: 5 }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/burden.png`}
              width={40}
              height={40}
              sx={{ mr: '5px', borderRadius: 5 }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: '#615559',
            p: '15px 5px 5px',
            borderRadius: '5px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: '#C56A52',
              borderTopLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              p: '0 7px',
              fontSize: 12,
            }}
          >
            후반
          </Box>
          <Box sx={{ height: 40 }}>
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/burden.png`}
              width={40}
              height={40}
              sx={{ mr: '5px', borderRadius: 5 }}
            />
            <Image
              alt=''
              src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/burden.png`}
              width={40}
              height={40}
              sx={{ mr: '5px', borderRadius: 5 }}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default SigilBox
