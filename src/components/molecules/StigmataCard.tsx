/** @jsxImportSource theme-ui */
import { Box, Card, Text, Flex } from '@theme-ui/components'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { StigmataData } from '../../lib/honkai3rd/stigmata'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface StigmataCardProps {
  stigmata: Pick<StigmataData, 'id' | 'name' | 'rarity'>
  size?: 'sm' | 'default'
}

const StigmataCard = ({ stigmata, size }: StigmataCardProps) => {
  if (size === 'sm') {
    return (
      <Card
        sx={{
          width: 'fit-content',
          p: 1,
          margin: 1,
          '&.hidden': {
            display: 'none',
          },
        }}
      >
        <PageLink href={`/honkai3rd/stigmata/${stigmata.id}`}>
          <Flex>
            <SquareImageBox
              mr={2}
              alt={stigmata.name}
              src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${stigmata.id}.png`}
              size={30}
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
              <Text sx={{ lineHeight: '30px' }}>{stigmata.name}</Text>
            </Box>
          </Flex>
        </PageLink>
      </Card>
    )
  }

  return (
    <Card
      sx={{
        width: [85, 120],
        padding: [1, 2],
        margin: [1, 2],
      }}
    >
      <PageLink href={`/honkai3rd/stigmata/${stigmata.id}`}>
        <SquareImageBox
          size={[75, 100]}
          alt={stigmata.name}
          src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${stigmata.id}.png`}
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
