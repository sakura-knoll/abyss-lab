/** @jsxImportSource theme-ui */
import { Card, Text, Flex } from '@theme-ui/components'
import { useRouter } from 'next/router'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { signetGroups } from '../../lib/honkai3rd/elysianRealm'
import { translate } from '../../lib/i18n'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

const SignetGroupNavigator = () => {
  const { locale } = useRouter()
  return (
    <Flex sx={{ flexWrap: 'wrap' }}>
      {signetGroups.map((signet) => {
        const signetName = translate(
          locale,
          { ['ko-KR']: signet.krName },
          signet.name
        )
        const signetAltName = translate(
          locale,
          { ['ko-KR']: signet.krAltName },
          signet.altName
        )
        return (
          <Card key={signet.id} sx={{ p: 1, m: 1, width: [135, 135, 200] }}>
            <PageLink href={`/honkai3rd/elysian-realm/signets/${signet.id}`}>
              <Flex
                sx={{
                  alignItems: 'center',
                }}
              >
                <SquareImageBox
                  size={30}
                  src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/signets/${signet.id}.png`}
                />
                <Text
                  sx={{
                    ml: 2,
                    overflow: 'hidden',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {signetAltName}({signetName})
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
