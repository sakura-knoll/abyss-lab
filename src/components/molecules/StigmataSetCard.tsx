/** @jsxImportSource theme-ui */
import { Box, Card, Flex, Text } from '@theme-ui/components'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { StigmataSet } from '../../lib/honkai3rd/stigmata'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface StigmataSetCardProps {
  stigmataSet: Pick<StigmataSet, 'id' | 'name' | 'rarity'>
  size?: 'sm' | 'default'
}

const StigmataSetCard = ({
  stigmataSet,
  size = 'default',
}: StigmataSetCardProps) => {
  if (size === 'sm') {
    return (
      <Card
        sx={{
          width: 'fit-content',
          p: 1,
          m: 1,
        }}
      >
        <PageLink href={`/honkai3rd/stigmata/${stigmataSet.id}-set`}>
          <Flex>
            <SquareImageBox
              size={30}
              alt={`${stigmataSet.name} Top`}
              src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${stigmataSet.id}-top.png`}
              mr={1}
            />
            <SquareImageBox
              size={30}
              alt={`${stigmataSet.name} Mid`}
              src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${stigmataSet.id}-mid.png`}
              mr={1}
            />
            <SquareImageBox
              size={30}
              alt={`${stigmataSet.name} Bottom`}
              src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${stigmataSet.id}-bot.png`}
              mr={1}
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
              <Text sx={{ lineHeight: '30px' }}>{stigmataSet.name}</Text>
            </Box>
          </Flex>
        </PageLink>
      </Card>
    )
  }
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
            alt={`${stigmataSet.name} Top`}
            src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${stigmataSet.id}-top.png`}
          />
          <SquareImageBox
            size={[80, 100]}
            alt={`${stigmataSet.name} Mid`}
            src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${stigmataSet.id}-mid.png`}
          />
          <SquareImageBox
            size={[80, 100]}
            alt={`${stigmataSet.name} Bottom`}
            src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${stigmataSet.id}-bot.png`}
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
