/** @jsxImportSource theme-ui */
import { Box, Card } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Link } from 'theme-ui'

import { StigmataCatalogItem, StigmataSetCatalogItem } from '../../../lib/v2-pre/data/types'
import { loadStigmataCatalog, loadStigmataSetCatalog } from '../../../lib/v2-pre/server/loadData'
import StigmaIcon from '../../../components/v2-pre/StigmaIcon'

interface StigmataSetListPageProps {
  stigmataSetCatalog: StigmataSetCatalogItem[]
}

const StigmataSetListPage = ({ stigmataSetCatalog }: StigmataSetListPageProps) => {
  return (
    <Box>
      <h1>Stigmata (Set)</h1>
      <Flex sx={{ flexWrap: 'wrap' }}>
        {stigmataSetCatalog.map(stigmataSet => {
          return (
            <Box key={stigmataSet.id} m={2}>
              <Link href={`/v2-pre/stigmata-sets/${stigmataSet.id}`}>
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
  )
}

export default StigmataSetListPage

export async function getStaticProps({ locale }: NextPageContext) {
  const stigmataSetCatalog = loadStigmataSetCatalog()

  return {
    props: { stigmataSetCatalog }
  }
}
