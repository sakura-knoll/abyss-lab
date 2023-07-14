import { NextPageContext } from 'next'
import { useMemo } from 'react'
import { Box, Card, Flex, Heading } from 'theme-ui'
import BattlesuitSmallIcon from '../../../../components/v2-pre/BattlesuitSmallIcon'
import { BattlesuitCatalogItem, ErSupportBattlesuit } from '../../../../lib/v2-pre/data/types'
import { loadBattlesuitCatalog, loadErSupports } from '../../../../lib/v2-pre/server/loadData'

interface SupportsPageProps {
  battlesuitCatalog: BattlesuitCatalogItem[]
  erSupports: ErSupportBattlesuit[]
}

const SupportsPage = ({
  battlesuitCatalog,

  erSupports
}: SupportsPageProps) => {
  const battlesuitCatalogMap = useMemo(() => {
    return battlesuitCatalog.reduce((map, item) => {
      map.set(item.id, item)
      return map
    }, new Map<string, BattlesuitCatalogItem>())
  }, [battlesuitCatalog])
  return (
    <Box>
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
  )
}

export default SupportsPage

export async function getStaticProps({ locale }: NextPageContext) {
  const battlesuitCatalog = loadBattlesuitCatalog()
  const erSupports = loadErSupports()

  return {
    props: { battlesuitCatalog, erSupports }
  }
}
