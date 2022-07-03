/** @jsxImportSource theme-ui */
import { Box, Card, Text, Flex } from '@theme-ui/components'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { BattlesuitData } from '../../lib/honkai3rd/battlesuits'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface BattlesuitCardProps {
  battlesuit: Pick<BattlesuitData, 'id' | 'name'>
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
              alt={battlesuit.name}
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
              {battlesuit.name}
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
          alt={battlesuit.name}
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
          <Text>{battlesuit.name}</Text>
        </Box>
      </PageLink>
    </Card>
  )
}

export default BattlesuitCard
