/** @jsxImportSource theme-ui */
import { Box } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Link } from 'theme-ui'
import { loadBattlesuitCatalog } from '../../../../lib/v2/server/loadData'
import { BattlesuitCatalogItem } from '../../../../lib/v2/data/types'
import BattlesuitCatalogItemCard from '../../../../components/v2/BattlesuitCatalogItemCard'

interface BattlesuitListPageProps {
  battlesuitCatalog: BattlesuitCatalogItem[]
}

const BattlesuitListPage = ({ battlesuitCatalog }: BattlesuitListPageProps) => {
  return (
    <Box>
      <h1>Battlesuits</h1>
      <Flex sx={{ flexWrap: 'wrap' }}>
        {battlesuitCatalog.map(battlesuit => {
          return (
            <Box key={battlesuit.id}>
              <Link href={`/v2-pre/battlesuits/${battlesuit.id}`}>
                <BattlesuitCatalogItemCard battlesuit={battlesuit} />
              </Link>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

export default BattlesuitListPage

export async function getStaticProps({ locale }: NextPageContext) {
  const battlesuitCatalog = loadBattlesuitCatalog()

  return {
    props: { battlesuitCatalog }
  }
}
