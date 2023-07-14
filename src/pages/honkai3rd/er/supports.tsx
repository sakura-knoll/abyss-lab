import { NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { Box, Card, Flex, Heading } from 'theme-ui'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import BattlesuitSmallIcon from '../../../components/v2/BattlesuitSmallIcon'
import { BattlesuitCatalogItem, ErSupportBattlesuit } from '../../../lib/v2/data/types'
import { loadBattlesuitCatalog, loadErSupports } from '../../../lib/v2/server/loadData'
import { getI18NProps } from '../../../server/i18n'

interface SupportsPageProps {
  battlesuitCatalog: BattlesuitCatalogItem[]
  erSupports: ErSupportBattlesuit[]
}

const SupportsPage = ({
  battlesuitCatalog,

  erSupports
}: SupportsPageProps) => {
  const { t } = useTranslation()

  const battlesuitCatalogMap = useMemo(() => {
    return battlesuitCatalog.reduce((map, item) => {
      map.set(item.id, item)
      return map
    }, new Map<string, BattlesuitCatalogItem>())
  }, [battlesuitCatalog])
  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('elysian-realm.supports')} (${t('common.elysian-realm')}) - ${t('common.honkai-3rd')} - ${t(
          'common.abyss-lab'
        )}`}
        description={`${t('common.elysian-realm')} ${t('elysian-realm.supports')}`}
        canonicalHref={`/honkai3rd/elysian-realm/support-battlesuits`}
      />

      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: '/honkai3rd/er',
              label: t('common.elysian-realm')
            },
            {
              href: '/honkai3rd/er/supports',
              label: t('elysian-realm.supports')
            }
          ]}
        />
        <Heading as="h1">ER Supports</Heading>

        <Card mb={3}>
          {erSupports.map(support => {
            const battlesuit = battlesuitCatalogMap.get(support.battlesuit)!
            return (
              <Flex key={support.battlesuit} sx={{ borderBottom: 'default' }}>
                <Box sx={{ flexShrink: 0, p: 1, borderRight: 'default' }}>
                  <BattlesuitSmallIcon battlesuit={battlesuit} ratio={0.8} />
                </Box>
                <Box>
                  <Flex sx={{ p: 1, borderBottom: 'default', flexGrow: 1 }}>
                    <Heading as="h3" sx={{ m: 0 }} id={support.battlesuit}>
                      {support.name}
                    </Heading>

                    <Box sx={{ ml: 1, color: 'textMuted' }}>(CD {support.cd}s)</Box>
                  </Flex>
                  <Box p={1}>{support.desc}</Box>
                </Box>
              </Flex>
            )
          })}
        </Card>
      </Box>
    </Honkai3rdLayout>
  )
}

export default SupportsPage

export async function getStaticProps({ locale }: NextPageContext) {
  const battlesuitCatalog = loadBattlesuitCatalog()
  const erSupports = loadErSupports()

  return {
    props: { battlesuitCatalog, erSupports, ...(await getI18NProps(locale)) }
  }
}
