/** @jsxImportSource theme-ui */
import { Box } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Link } from 'theme-ui'
import { loadBattlesuitCatalog } from '../../../lib/v2/server/loadData'
import { BattlesuitCatalogItem } from '../../../lib/v2/data/types'
import BattlesuitCatalogItemCard from '../../../components/v2/BattlesuitCatalogItemCard'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { useTranslation } from 'next-i18next'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { getI18NProps } from '../../../server/i18n'

interface BattlesuitListPageProps {
  battlesuitCatalog: BattlesuitCatalogItem[]
}

const BattlesuitListPage = ({ battlesuitCatalog }: BattlesuitListPageProps) => {
  const { t } = useTranslation()
  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.battlesuits')} - ${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        description={t('battlesuits-list.description')}
        canonicalHref={`/honkai3rd/battlesuits`}
      />
      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: '/honkai3rd/v2/battlesuits',
              label: t('common.battlesuits')
            }
          ]}
        />
        <h1>{t('battlesuits-list.heading')}</h1>
        <Flex sx={{ flexWrap: 'wrap' }}>
          {battlesuitCatalog.map(battlesuit => {
            return (
              <Box key={battlesuit.id}>
                <Link href={`/honkai3rd/v2/battlesuits/${battlesuit.id}`}>
                  <BattlesuitCatalogItemCard battlesuit={battlesuit} />
                </Link>
              </Box>
            )
          })}
        </Flex>
      </Box>
    </Honkai3rdLayout>
  )
}

export default BattlesuitListPage

export async function getStaticProps({ locale }: NextPageContext) {
  const battlesuitCatalog = loadBattlesuitCatalog()

  return {
    props: { battlesuitCatalog, ...(await getI18NProps(locale)) }
  }
}
