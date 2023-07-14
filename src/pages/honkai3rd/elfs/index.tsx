/** @jsxImportSource theme-ui */
import { Box, Card, Heading } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Link } from 'theme-ui'
import { ElfCatalogItem } from '../../../lib/v2/data/types'
import { loadElfCatalog } from '../../../lib/v2/server/loadData'
import RarityBar from '../../../components/v2/RarityBar'
import ElfIcon from '../../../components/v2/ElfIcon'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import Head from '../../../components/atoms/Head'
import { useTranslation } from 'next-i18next'
import { getI18NProps } from '../../../server/i18n'
import Breadcrumb from '../../../components/organisms/Breadcrumb'

interface ElfListPageProps {
  elfs: ElfCatalogItem[]
}

const ElfListPage = ({ elfs }: ElfListPageProps) => {
  const { t } = useTranslation()

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.elfs')} - ${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        description={t('weapons-list.description')}
        canonicalHref={`/honkai3rd/elfs`}
      />

      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/elfs', label: t('common.elfs') }
          ]}
        />
        <Heading as="h1">Elfs</Heading>
        <Flex sx={{ flexWrap: 'wrap' }}>
          {elfs
            .sort((a, b) => {
              const aId = getId(a.id)
              const bId = getId(b.id)
              return bId - aId

              function getId(id: string): number {
                return parseInt(id)
              }
            })
            .map(elf => {
              return (
                <Box key={elf.id} m={2}>
                  <Link href={`/honkai3rd/elfs/${elf.id}`}>
                    <Card p={1}>
                      <Box>
                        <ElfIcon icon={elf.cardIcon} />
                        <RarityBar rarity={elf.rarity} />
                      </Box>
                      <Box
                        sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {elf.fullName}
                      </Box>
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

export default ElfListPage

export async function getStaticProps({ locale }: NextPageContext) {
  const elfs = loadElfCatalog()

  return {
    props: { elfs, ...(await getI18NProps(locale)) }
  }
}
