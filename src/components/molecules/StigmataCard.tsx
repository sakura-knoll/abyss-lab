/** @jsxImportSource theme-ui */
import { Box, Card, Text } from '@theme-ui/components'
import { StigmataData } from '../../lib/honkai3rd/stigmata'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface StigmataCardProps {
  stigmata: Pick<StigmataData, 'id' | 'name' | 'rarity'>
}

const StigmataCard = ({ stigmata }: StigmataCardProps) => {
  return (
    <Card
      sx={{
        width: '120px',
        padding: 2,
        margin: 2,
      }}
    >
      <PageLink href={`/honkai3rd/stigmata/${stigmata.id}`}>
        <SquareImageBox
          size={100}
          alt={stigmata.name}
          src={`/assets/honkai3rd/stigmata/icon-${stigmata.id}.png`}
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
          <Text>{stigmata.name}</Text>
        </Box>
        <Box sx={{ fontSize: 1, textAlign: 'center' }}>
          {'⭐'.repeat(stigmata.rarity)}
        </Box>
      </PageLink>
    </Card>
  )
}

export default StigmataCard
