/** @jsxImportSource theme-ui */
import { Box, Card, Flex, Text } from '@theme-ui/components'
import { StigmataSet } from '../../lib/honkai3rd/stigmata'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface StigmataSetCardProps {
  stigmataSet: Pick<StigmataSet, 'id' | 'name' | 'rarity'>
}

const StigmataSetCard = ({ stigmataSet }: StigmataSetCardProps) => {
  return (
    <Card
      sx={{
        width: ['280px', '340px'],
        padding: 2,
        margin: 2,
      }}
    >
      <PageLink href={`/honkai3rd/stigmata/${stigmataSet.id}-set`}>
        <Flex sx={{ justifyContent: 'space-around' }}>
          <SquareImageBox
            size={[80, 100]}
            alt={`${stigmataSet.id} Top`}
            src={`/assets/honkai3rd/stigmata/icon-${stigmataSet.id}-top.png`}
          />
          <SquareImageBox
            size={[80, 100]}
            alt={`${stigmataSet.id} Mid`}
            src={`/assets/honkai3rd/stigmata/icon-${stigmataSet.id}-mid.png`}
          />
          <SquareImageBox
            size={[80, 100]}
            alt={`${stigmataSet.id} Bottom`}
            src={`/assets/honkai3rd/stigmata/icon-${stigmataSet.id}-bot.png`}
          />
        </Flex>
        <Box
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          <Text>{stigmataSet.name}</Text>
        </Box>
        <Box sx={{ fontSize: 1, textAlign: 'center' }}>
          {'⭐'.repeat(stigmataSet.rarity)}
        </Box>
      </PageLink>
    </Card>
  )
}

export default StigmataSetCard
