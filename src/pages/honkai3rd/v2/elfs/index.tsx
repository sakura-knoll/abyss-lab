/** @jsxImportSource theme-ui */
import { Box, Card } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Link } from 'theme-ui'
import { ElfCatalogItem } from '../../../../lib/v2-pre/data/types'
import { loadElfCatalog } from '../../../../lib/v2-pre/server/loadData'
import RarityBar from '../../../../components/v2-pre/RarityBar'
import ElfIcon from '../../../../components/v2-pre/ElfIcon'

interface ElfListPageProps {
  elfs: ElfCatalogItem[]
}

const ElfListPage = ({ elfs }: ElfListPageProps) => {
  return (
    <Box>
      <h1>Elfs</h1>
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
                <Link href={`/v2-pre/elfs/${elf.id}`}>
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
  )
}

export default ElfListPage

export async function getStaticProps({ locale }: NextPageContext) {
  const elfs = loadElfCatalog()

  return {
    props: { elfs }
  }
}
