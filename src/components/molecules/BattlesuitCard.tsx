import { Box, Card, Text } from '@theme-ui/components'
import { BattlesuitData } from '../../lib/honkai3rd/battlesuits'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface BattlesuitCardProps {
  battlesuit: Pick<BattlesuitData, 'id' | 'name'>
  hidden?: boolean
}

const BattlesuitCard = ({ battlesuit, hidden }: BattlesuitCardProps) => {
  return (
    <Card
      className={hidden ? 'hidden' : ''}
      sx={{
        width: [140, 160],
        padding: 2,
        margin: 2,
        '&.hidden': {
          display: 'none',
        },
      }}
    >
      <PageLink
        href={`/honkai3rd/battlesuits/${battlesuit.id}`}
        key={battlesuit.id}
      >
        <SquareImageBox
          alt={battlesuit.name}
          src={`/assets/honkai3rd/battlesuits/portrait-${battlesuit.id}.png`}
          size={[120, 140]}
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
          <Text>{battlesuit.name}</Text>
        </Box>
      </PageLink>
    </Card>
  )
}

export default BattlesuitCard
