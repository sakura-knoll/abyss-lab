/** @jsxImportSource theme-ui */
import { Box, Card, Text, Flex } from '@theme-ui/components'
import { useRouter } from 'next/router'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { BattlesuitData } from '../../lib/honkai3rd/battlesuits'
import { translate } from '../../lib/i18n'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface BattlesuitCardProps {
  battlesuit: Pick<BattlesuitData, 'id' | 'name' | 'krName'>
  hidden?: boolean
  size?: 'sm' | 'default'
  href?: string
  m?: number
}

const BattlesuitCard = ({
  battlesuit,
  hidden,
  size,
  href,
  m,
}: BattlesuitCardProps) => {
  const { locale } = useRouter()

  const battlesuitName = translate(
    locale,
    { 'ko-KR': battlesuit.krName },
    battlesuit.name
  )

  if (href == null) {
    href = `/honkai3rd/battlesuits/${battlesuit.id}`
  }

  if (size === 'sm') {
    return (
      <Card
        className={hidden ? 'hidden' : ''}
        sx={{
          p: 1,
          m: m == undefined ? 1 : m,
          '&.hidden': {
            display: 'none',
          },
        }}
      >
        <PageLink href={href}>
          <Flex sx={{ alignItems: 'center' }}>
            <SquareImageBox
              mr={2}
              alt={battlesuitName}
              src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${battlesuit.id}.png`}
              size={30}
            />
            <Text
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                whiteSpace: 'nowrap',
              }}
            >
              {battlesuitName}
            </Text>
          </Flex>
        </PageLink>
      </Card>
    )
  }

  return (
    <Card
      className={hidden ? 'hidden' : ''}
      sx={{
        width: 120,
        padding: 2,
        m: m == undefined ? 2 : m,
        '&.hidden': {
          display: 'none',
        },
      }}
    >
      <PageLink href={href}>
        <SquareImageBox
          alt={battlesuitName}
          src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${battlesuit.id}.png`}
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
