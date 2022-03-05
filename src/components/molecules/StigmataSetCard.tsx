/** @jsxImportSource theme-ui */
import { Box, Card, Flex, Text } from '@theme-ui/components'
import { useRouter } from 'next/router'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { StigmataSet } from '../../lib/honkai3rd/stigmata'
import { translate } from '../../lib/i18n'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface StigmataSetCardProps {
  stigmataSet: Pick<StigmataSet, 'id' | 'name' | 'krName' | 'rarity'>
}

const StigmataSetCard = ({ stigmataSet }: StigmataSetCardProps) => {
  const { locale } = useRouter()
  const stigmataSetName = translate(
    locale,
    { 'ko-KR': stigmataSet.krName },
    stigmataSet.name
  )

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
            src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${stigmataSet.id}-top.png`}
          />
          <SquareImageBox
            size={[80, 100]}
            alt={`${stigmataSet.id} Mid`}
            src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${stigmataSet.id}-mid.png`}
          />
          <SquareImageBox
            size={[80, 100]}
            alt={`${stigmataSet.id} Bottom`}
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
          <Text>{stigmataSetName}</Text>
        </Box>
        <Box sx={{ fontSize: 1, textAlign: 'center' }}>
          {'⭐'.repeat(stigmataSet.rarity)}
        </Box>
      </PageLink>
    </Card>
  )
}

export default StigmataSetCard
