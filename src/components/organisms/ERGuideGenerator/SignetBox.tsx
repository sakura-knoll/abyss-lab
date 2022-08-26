import { Box, Flex, Image, Paragraph } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'

interface SignetBoxProps {}

const SignetBox = ({}: SignetBoxProps) => {
  return (
    <>
      <Flex
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: 50,
          left: 40 + 460 - 30 - 50,
          backgroundColor: '#091B2D',
          height: 80,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 40,
          border: '2px solid #FBECE5',
        }}
      >
        <Image
          alt=''
          src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/signets/aponia.png`}
          width={50}
          height={50}
        />
        <Box
          sx={{
            backgroundColor: 'black',
            border: '2px solid #FBECE5',
            width: 30,
            height: 30,
            textAlign: 'center',
            borderRadius: 5,
            position: 'absolute',
            bottom: 0 - 15,
            right: 0,
          }}
        >
          I
        </Box>
      </Flex>
      <Box
        sx={{
          position: 'absolute',
          top: 50 + 40,
          borderBottom: '2px solid #FBECE5',
          height: 0,
          left: 40 + 460 - 30 - 50,
          right: 380,
        }}
      />
      <Flex
        sx={{
          top: 50,
          height: 80,
          border: '2px solid #FBECE5',
          padding: '5px',
          width: 370,
          position: 'absolute',
          right: 10,
          alignItems: 'center',
        }}
      >
        <Flex
          sx={{
            width: 60,
            height: 60,
            borderRight: '2px solid #FBECE5',
            justifyContent: 'center',
            alignItems: 'center',
            mr: '5px',
          }}
        >
          <Box sx={{ fontSize: 4, lineHeight: 1.3, fontWeight: 'bold' }}>
            <Box>핵심</Box>
          </Box>
        </Flex>
        <Paragraph>어쩌고 저쩌고</Paragraph>
      </Flex>
    </>
  )
}

export default SignetBox
