/** @jsxImportSource theme-ui */
import { Box, Heading, Flex, Card, Text } from '@theme-ui/components'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { getBattlesuitMapByIds } from '../../../server/data/honkai3rd/battlesuits'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import BattlesuitCard from '../../../components/molecules/BattlesuitCard'
import { NextPageContext } from 'next'
import { getI18NProps } from '../../../server/i18n'
import { useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { erVersions } from '../../../lib/honkai3rd/elysianRealm'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import PageLink from '../../../components/atoms/PageLink'
import SignetGroupNavigator from '../../../components/organisms/SignetGroupNavigator'
import {
  getRemembranceSigils as getRemembranceSigils,
  getSupportBattlesuits,
} from '../../../server/data/honkai3rd/elysianRealm'
import Link from 'next/link'

type BattlesuitListItemData = Pick<
  BattlesuitData,
  'id' | 'name' | 'features' | 'type' | 'valkyrie'
>

interface BattlesuitListPageProps {
  battlesuitMap: { [id: string]: BattlesuitListItemData }
  supportBattlesuits: { id: string; name: string }[]
  remembranceSigils: { id: string; name: string }[]
}

const ElysianRealmIndexPage = ({
  battlesuitMap,
  supportBattlesuits,
  remembranceSigils,
}: BattlesuitListPageProps) => {
  const { t } = useTranslation()

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.elysian-realm')} - ${t('common.honkai-3rd')} - ${t(
          'common.abyss-lab'
        )}`}
        description={t('common.elysian-realm')}
        canonicalHref={`/honkai3rd/elysian-realm`}
      />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: '/honkai3rd/elysian-realm',
              label: t('common.elysian-realm'),
            },
          ]}
        />

        <Heading as='h1'>{t('common.elysian-realm')}</Heading>

        <Heading as='h2'>{t('common.battlesuits')}</Heading>

        <Box sx={{ mb: 3 }}>
          {erVersions.map((erVersion) => {
            return (
              <Box key={erVersion.version} sx={{ mb: 2 }}>
                <Heading as='h3' m={0}>
                  {erVersion.version}
                </Heading>
                <Flex sx={{ flexWrap: 'wrap' }}>
                  {erVersion.battlesuits.map((battlesuitId) => {
                    return (
                      <Box
                        key={battlesuitId}
                        sx={{ width: [135, 135, 200], m: 1 }}
                      >
                        <BattlesuitCard
                          m={0}
                          battlesuit={battlesuitMap[battlesuitId]}
                          size={'sm'}
                          href={`/honkai3rd/elysian-realm/battlesuits/${battlesuitId}`}
                        />
                      </Box>
                    )
                  })}
                </Flex>
              </Box>
            )
          })}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Heading as='h2'>{t('elysian-realm.signets')}</Heading>

          <SignetGroupNavigator />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Heading as='h2'>{t('elysian-realm.supports')}</Heading>

          <Flex sx={{ flexWrap: 'wrap' }}>
            {supportBattlesuits.map((battlesuit) => {
              return (
                <Box key={battlesuit.id} sx={{ width: [135, 135, 200], m: 1 }}>
                  <BattlesuitCard
                    m={0}
                    battlesuit={battlesuit}
                    size={'sm'}
                    href={`/honkai3rd/elysian-realm/support-battlesuits#${battlesuit.id}`}
                  />
                </Box>
              )
            })}
          </Flex>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Heading as='h2'>{t('elysian-realm.remembrance-sigil')}</Heading>

          <Flex sx={{ flexWrap: 'wrap' }}>
            {remembranceSigils.map(({ id, name }) => {
              return (
                <Card
                  key={id}
                  sx={{ p: 1, m: 1, width: [135, 135, 200] }}
                  title={name}
                >
                  <PageLink
                    href={`/honkai3rd/elysian-realm/remembrance-sigils#${id}`}
                  >
                    <Flex sx={{ alignItems: 'center' }}>
                      <SquareImageBox
                        size={30}
                        src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/${id}.png`}
                      />
                      <Text
                        sx={{
                          ml: 2,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {name}
                      </Text>
                    </Flex>
                  </PageLink>
                </Card>
              )
            })}
          </Flex>
        </Box>
        <Box>
          <Link href='/honkai3rd/elysian-realm/utils/gen-guide'>
            Guide Generator (KR Only)
          </Link>
        </Box>
      </Box>
    </Honkai3rdLayout>
  )
}

export default ElysianRealmIndexPage

export async function getStaticProps({ locale }: NextPageContext) {
  const erBattlesuitIds = erVersions.reduce<string[]>((list, version) => {
    list.push(...version.battlesuits)
    return list
  }, [])

  const supportBattlesuits = getSupportBattlesuits(locale).map(
    ({ id, name }) => {
      return {
        id,
        name,
      }
    }
  )

  const remembranceSigils = getRemembranceSigils(locale).map(({ id, name }) => {
    return {
      id,
      name,
    }
  })

  return {
    props: {
      battlesuitMap: getBattlesuitMapByIds(erBattlesuitIds, locale),
      supportBattlesuits,
      remembranceSigils,
      ...(await getI18NProps(locale)),
    },
  }
}
