import { Box, Flex, Text } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { colors } from './styles'
import { ERGGExSignet, ERGGExSignetType } from './types'
import { getExSignetLabel } from './utils'

interface ValkBoxProps {
  battlesuitId: string
  exSignets: ERGGExSignet[]
}

const ValkBox = ({ battlesuitId, exSignets }: ValkBoxProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 100,
        top: 40,
        width: 460,
        height: 460,
      }}
    >
      {exSignets.map(({ type, name }, index) => {
        return (
          <ValkExSignetBox key={index} index={index} type={type} name={name} />
        )
      })}

      <Box
        sx={{
          borderRadius: '50%',
          border: 'solid 1px gray',
          boxShadow: '5px 5px 10px rgba(0,0,0,0.5)',
          width: 460,
          height: 460,
          backgroundImage: `url('${assetsBucketBaseUrl}/honkai3rd/battlesuits/${battlesuitId}.png')`,
          backgroundSize: 'cover',
          backgroundPosition: getBattlesuitImagePosition(battlesuitId),
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
      ></Box>
    </Box>
  )
}

function getBattlesuitImagePosition(battlesuitId: string) {
  switch (battlesuitId) {
    case 'meme':
      return '0 10px'
    default:
      return 'center'
  }
}

const ValkExSignetBox = ({
  index,
  type,
  name,
}: {
  index: number
  type: ERGGExSignetType
  name: string
}) => {
  const label = getExSignetLabel(name)
  const intervalAngle = 15
  const angle = -intervalAngle * (index + 1) - 24
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 230 - 230 * Math.cos((angle / 180) * Math.PI) - 25,
        left: 230 + 230 * Math.sin((angle / 180) * Math.PI) - 25,
        width: 50,
        height: 50,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          backgroundColor:
            type === 'start'
              ? '#C52CC5'
              : type === '1st'
              ? '#EE4D2A'
              : type === '2nd'
              ? '#9082BD'
              : type === 'backup'
              ? '#C4C4C4'
              : 'transparent',
          borderWidth: 1,
          borderStyle: 'solid',
          color: type === 'backup' ? 'black' : '#fff',
          borderColor: type === 'na' ? '#AA9FA3' : 'transparent',
          top: '5px',
          right: 25,
          whiteSpace: 'nowrap',
          paddingRight: '30px',
          paddingLeft: '10px',
          textAlign: 'right',
          lineHeight: 1.3,
          zIndex: 1,
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
        }}
      >
        {type === 'start'
          ? '시작'
          : type === '1st'
          ? '우선'
          : type === '2nd'
          ? '차선'
          : type === 'backup'
          ? '땜빵'
          : '미선택'}
      </Box>
      <Flex
        sx={{
          position: 'absolute',
          zIndex: 2,
          border: 'solid 1px gray',
          borderRadius: '50%',
          backgroundColor: colors.backgroundColor,
          boxShadow: '5px 5px 10px rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize:
            label.length > 3
              ? label.indexOf('\n') >= 0
                ? '14px'
                : '11px'
              : label.length > 2
              ? 16
              : 20,
          width: 50,
          height: 50,
          lineHeight: 1.2,
          textAlign: 'center',
          whiteSpace: 'pre',
        }}
        className='exSignetLabel'
      >
        <Text>{label}</Text>
      </Flex>
    </Box>
  )
}

export default ValkBox
