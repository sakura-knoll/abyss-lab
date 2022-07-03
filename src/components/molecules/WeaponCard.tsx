/** @jsxImportSource theme-ui */
import { Box, Card, Text, Flex } from '@theme-ui/components'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { WeaponData } from '../../lib/honkai3rd/weapons'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface WeaponCardProps {
  weapon: Pick<WeaponData, 'id' | 'name' | 'rarity'>
  hidden?: boolean
  size?: 'sm' | 'default'
}

const WeaponCard = ({ weapon, hidden, size = 'default' }: WeaponCardProps) => {
  if (size === 'sm') {
    return (
      <Card
        className={hidden ? 'hidden' : ''}
        sx={{
          width: 'fit-content',
          p: 1,
          m: 1,
          '&.hidden': {
            display: 'none',
          },
        }}
      >
        <PageLink href={`/honkai3rd/weapons/${weapon.id}`}>
          <Flex>
            <SquareImageBox
              mr={2}
              size={30}
              alt={weapon.name}
              src={`${assetsBucketBaseUrl}/honkai3rd/weapons/${weapon.id}.png`}
            />
            <Box
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
            >
              <Text sx={{ lineHeight: '30px' }}>{weapon.name}</Text>
            </Box>
          </Flex>
        </PageLink>
      </Card>
    )
  }

  return (
    <Card
      className={hidden ? 'hidden' : ''}
      sx={{
        width: '120px',
        padding: 2,
        margin: 2,
        '&.hidden': {
          display: 'none',
        },
      }}
    >
      <PageLink href={`/honkai3rd/weapons/${weapon.id}`}>
        <SquareImageBox
          size={100}
          alt={weapon.name}
          src={`${assetsBucketBaseUrl}/honkai3rd/weapons/${weapon.id}.png`}
        />
        <Box
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          <Text>{weapon.name}</Text>
        </Box>
        <Box sx={{ fontSize: 1, textAlign: 'center' }}>
          {'⭐'.repeat(weapon.rarity)}
        </Box>
      </PageLink>
    </Card>
  )
}

export default WeaponCard
