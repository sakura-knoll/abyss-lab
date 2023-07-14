/** @jsxImportSource theme-ui */
import { Box, Card, Heading } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Link } from 'theme-ui'

import { StigmataSetCatalogItem } from '../../../../lib/v2/data/types'
import { loadStigmataSetCatalog } from '../../../../lib/v2/server/loadData'
import StigmaIcon from '../../../../components/v2/StigmaIcon'
import Honkai3rdLayout from '../../../../components/layouts/Honkai3rdLayout'
import Head from '../../../../components/atoms/Head'
import { useTranslation } from 'next-i18next'
import { getI18NProps } from '../../../../server/i18n'
import Breadcrumb from '../../../../components/organisms/Breadcrumb'

interface StigmataSetListPageProps {
  stigmataSetCatalog: StigmataSetCatalogItem[]
}

const StigmataSetListPage = ({ stigmataSetCatalog }: StigmataSetListPageProps) => {
  const { t } = useTranslation()
  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.stigmata')} - ${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        description={t('stigmata-set-list.description')}
        canonicalHref={`/honkai3rd/v2/stigmata`}
      />
      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/v2/stigmata-sets', label: t('common.stigmata-set') }
          ]}
        />
        <Heading as="h1">{t('stigmata-set-list.stigmata-set')}</Heading>

        <Box mb={3}>
          <Link href="/honkai3rd/v2/stigmata">{t('stigmata-set-list.show-signle-list')}</Link>
        </Box>

        <Flex sx={{ flexWrap: 'wrap' }}>
          {stigmataSetCatalog
            .sort((a, b) => {
              const aId = getId(a.id)
              const bId = getId(b.id)
              return bId - aId

              function getId(id: string): number {
                if (id === '1290') {
                  return 129.5
                }
                if (id === '132') {
                  return 0.2
                }
                if (id === '120') {
                  return 0.1
                }
                return parseInt(id)
              }
            })
            .map(stigmataSet => {
              return (
                <Box key={stigmataSet.id} m={1}>
                  <Link href={`/honkai3rd/v2/stigmata-sets/${stigmataSet.id}`}>
                    <Card p={1}>
                      <Flex sx={{ justifyContent: 'center' }}>
                        {stigmataSet.stigmataList.map(stigma => {
                          return <StigmaIcon key={stigma.id} icon={stigma.icon} rarity={stigma.maxRarity} />
                        })}
                      </Flex>
                      <Box
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          px: 1,
                          textAlign: 'center'
                        }}
                      >
                        {stigmataSet.name}
                      </Box>
                      {/* {stigma.id} */}
                    </Card>
                  </Link>
                </Box>
              )
            })}
        </Flex>
      </Box>
    </Honkai3rdLayout>
  )
}

export default StigmataSetListPage

export async function getStaticProps({ locale }: NextPageContext) {
  const stigmataSetCatalog = loadStigmataSetCatalog()

  return {
    props: { stigmataSetCatalog, ...(await getI18NProps(locale)) }
  }
}
