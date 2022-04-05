/** @jsxImportSource theme-ui */
import { Card, Text, Flex } from '@theme-ui/components'
import { useRouter } from 'next/router'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { signetGroups } from '../../lib/honkai3rd/elysianRealm'
import { translate } from '../../lib/i18n'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface SignetGroupNavigatorProps {
  size?: 'sm' | 'default'
}

const SignetGroupNavigator = ({
  size = 'default',
}: SignetGroupNavigatorProps) => {
  const { locale } = useRouter()
  return (
    <Flex sx={{ flexWrap: 'wrap' }}>
      {signetGroups.map((signet) => {
        const signetName = translate(
          locale,
          { ['ko-KR']: signet.krName },
          signet.name
        )
        return (
          <Card key={signet.id} sx={{ p: 1, m: 1 }}>
            <PageLink href={`/honkai3rd/elysian-realm/signets/${signet.id}`}>
              <Flex
                sx={{
                  flexDirection: size === 'default' ? 'column' : 'row',
                  justifyContent: 'center',
                }}
              >
                <SquareImageBox
                  size={size === 'default' ? 70 : 30}
                  src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/signets/${signet.id}.png`}
                />
                <Text
                  sx={{ textAlign: 'center', ml: size === 'default' ? 0 : 1 }}
                >
                  {signetName}
                </Text>
              </Flex>
            </PageLink>
          </Card>
        )
      })}
    </Flex>
  )
}

export default SignetGroupNavigator
