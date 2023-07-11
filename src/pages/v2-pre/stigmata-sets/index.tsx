/** @jsxImportSource theme-ui */
import { Box, Card } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Link } from 'theme-ui'

import { StigmataSetCatalogItem } from '../../../lib/v2-pre/data/types'
import { loadStigmataSetCatalog } from '../../../lib/v2-pre/server/loadData'
import StigmaIcon from '../../../components/v2-pre/StigmaIcon'

interface StigmataSetListPageProps {
  stigmataSetCatalog: StigmataSetCatalogItem[]
}

const StigmataSetListPage = ({ stigmataSetCatalog }: StigmataSetListPageProps) => {
  return (
    <Box>
      <h1>Stigmata (Set)</h1>
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
