import { Box, Card, Text } from '@theme-ui/components'
import { WeaponData } from '../../lib/honkai3rd/weapons'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface WeaponCardProps {
  weapon: Pick<WeaponData, 'id' | 'name' | 'rarity'>
  hidden?: boolean
}

const WeaponCard = ({ weapon, hidden }: WeaponCardProps) => {
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
          src={`/assets/honkai3rd/weapons/${weapon.id}.png`}
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
