import { Box, Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { StigmataData } from '../../../lib/honkai3rd/stigmata'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import { ERGGEquipmentSet } from './types'

interface EquipmentBoxProps {
  equipmentSets: ERGGEquipmentSet[]
  weapons: WeaponData[]
  stigmata: StigmataData[]
}

const EquipmentBox = ({
  equipmentSets,
  weapons,
  stigmata,
}: EquipmentBoxProps) => {
  return (
    <Box
      sx={{
        padding: '5px',
        border: 'solid 1px gray',
        boxSizing: 'border-box',
        backgroundColor: '#181614',
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
        >
          <Box>추천</Box>
          <Box>장비</Box>
        </Box>
        {equipmentSets.map((equipmentSet, index) => {
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
                    equipmentSet.type === 'best' ? '#EE4E2C' : '#9082BD',
                  borderTopLeftRadius: '5px',
                  borderBottomRightRadius: '5px',
                  p: '0 7px',
                  fontSize: 12,
                }}
              >
                {equipmentSet.type === 'best' ? '베스트' : '대체'}
              </Box>
              <Box sx={{ height: 40 }}>
                <Image
                  alt=''
                  src={`${assetsBucketBaseUrl}/honkai3rd/weapons/${equipmentSet.weapon}.png`}
                  width={40}
                  height={40}
                  sx={{ borderRadius: '5px', mr: '5px' }}
                />
                <Image
                  alt=''
                  src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${equipmentSet.top}.png`}
                  width={40}
                  height={40}
                  sx={{ borderRadius: '5px', mr: '5px' }}
                />
                <Image
                  alt=''
                  src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${equipmentSet.mid}.png`}
                  width={40}
                  height={40}
                  sx={{ borderRadius: '5px', mr: '5px' }}
                />
                <Image
                  alt=''
                  src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${equipmentSet.bot}.png`}
                  width={40}
                  height={40}
                  sx={{ borderRadius: '5px' }}
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
                {getWeaponName(equipmentSet.weapon)}+
                {getStigmataName(equipmentSet.top)}/
                {getStigmataName(equipmentSet.mid)}/
                {getStigmataName(equipmentSet.bot)}
              </Flex>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )

  function getWeaponName(id: string) {
    return weapons
      .find((weapon) => weapon.id === id)
      ?.name.split(' ')[0]
      .slice(0, 4)
      .trim()
  }
  function getStigmataName(id: string) {
    return stigmata.find((stigma) => stigma.id === id)?.name.slice(0, 3)
  }
}

export default EquipmentBox
