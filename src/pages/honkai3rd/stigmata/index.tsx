/** @jsxImportSource theme-ui */
import { Box, Card, Heading } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Link } from 'theme-ui'

import { StigmataCatalogItem } from '../../../lib/v2/data/types'
import { loadStigmataCatalog } from '../../../lib/v2/server/loadData'
import StigmaIcon from '../../../components/v2/StigmaIcon'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { getI18NProps } from '../../../server/i18n'

interface StigmataListPageProps {
  stigmataCatalog: StigmataCatalogItem[]
}

const StigmataListPage = ({ stigmataCatalog }: StigmataListPageProps) => {
  return (
    <Honkai3rdLayout>
      <Box>
        <Heading as="h1">Stigmata (Single)</Heading>

        <Flex sx={{ flexWrap: 'wrap' }}>
          {stigmataCatalog
            .filter(filterStigmata)
            .sort(sortStigmata)
            .map(stigma => {
              return (
                <Box key={stigma.id} m={2}>
                  <Link href={`/v2-pre/stigmata/${stigma.id}`}>
                    <Card p={1}>
                      <Flex sx={{ justifyContent: 'center' }}>
                        <StigmaIcon icon={stigma.icon} rarity={stigma.maxRarity} />
                      </Flex>
                      <Box
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          px: 1,
                          width: 112,
                          textAlign: 'center'
                        }}
                      >
                        {stigma.name}
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

export default StigmataListPage

export async function getStaticProps({ locale }: NextPageContext) {
  const stigmataCatalog = loadStigmataCatalog()

  return {
    props: { stigmataCatalog, ...(await getI18NProps(locale)) }
  }
}

function filterStigmata(weapon: StigmataCatalogItem) {
  return true
}

function sortStigmata(a: StigmataCatalogItem, b: StigmataCatalogItem) {
  let aId = parseInt(a.id)

  let bId = parseInt(b.id)

  return bId - aId
}
