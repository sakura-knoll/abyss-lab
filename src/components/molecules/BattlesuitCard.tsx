/** @jsxImportSource theme-ui */
import { Box, Card, Text } from '@theme-ui/components'
import { useRouter } from 'next/router'
import { BattlesuitData } from '../../lib/honkai3rd/battlesuits'
import { translate } from '../../lib/i18n'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface BattlesuitCardProps {
  battlesuit: Pick<BattlesuitData, 'id' | 'name' | 'krName'>
  hidden?: boolean
}

const BattlesuitCard = ({ battlesuit, hidden }: BattlesuitCardProps) => {
  const { locale } = useRouter()

  const battlesuitName = translate(
    locale,
    { 'ko-KR': battlesuit.krName },
    battlesuit.name
  )

  return (
    <Card
      className={hidden ? 'hidden' : ''}
      sx={{
        width: 120,
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
          alt={battlesuitName}
          src={`/assets/honkai3rd/battlesuits/portrait-${battlesuit.id}.png`}
          size={100}
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
          <Text>{battlesuitName}</Text>
        </Box>
      </PageLink>
    </Card>
  )
}

export default BattlesuitCard
