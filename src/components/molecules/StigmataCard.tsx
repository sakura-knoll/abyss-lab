/** @jsxImportSource theme-ui */
import { Box, Card, Text } from '@theme-ui/components'
import { useRouter } from 'next/router'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { StigmataData } from '../../lib/honkai3rd/stigmata'
import { translate } from '../../lib/i18n'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface StigmataCardProps {
  stigmata: Pick<StigmataData, 'id' | 'name' | 'rarity' | 'krName'>
}

const StigmataCard = ({ stigmata }: StigmataCardProps) => {
  const { locale } = useRouter()
  const stigmataName = translate(
    locale,
    { 'ko-KR': stigmata.krName },
    stigmata.name
  )
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
          alt={stigmataName}
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
          <Text>{stigmataName}</Text>
        </Box>
        <Box sx={{ fontSize: 1, textAlign: 'center' }}>
          {'⭐'.repeat(stigmata.rarity)}
        </Box>
      </PageLink>
    </Card>
  )
}

export default StigmataCard
