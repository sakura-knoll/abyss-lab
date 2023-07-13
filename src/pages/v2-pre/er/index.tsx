/** @jsxImportSource theme-ui */
import { Box, Heading, Flex, Link, Card } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { loadBattlesuitCatalog, loadErBattlesuitCatalog } from '../../../lib/v2-pre/server/loadData'
import { BattlesuitCatalogItem, ErBattlesuitCatalogItem } from '../../../lib/v2-pre/data/types'
import { useMemo } from 'react'
import BattlesuitCatalogItemCard from '../../../components/v2-pre/BattlesuitCatalogItemCard'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import SquareImage from '../../../components/v2-pre/SquareImage'
import { signetGroups } from '../../../lib/v2-pre/data/er'

interface ErPageProps {
  erBattlesuitCatalog: ErBattlesuitCatalogItem[]
  battlesuitCatalog: BattlesuitCatalogItem[]
}

const ErPage = ({ erBattlesuitCatalog, battlesuitCatalog }: ErPageProps) => {
  const battlesuitCatalogMap = useMemo(() => {
    return battlesuitCatalog.reduce((map, item) => {
      map.set(item.id, item)
      return map
    }, new Map<string, BattlesuitCatalogItem>())
  }, [battlesuitCatalog])
  return (
    <Box>
      <h1>Elysian Realm</h1>
      <Heading as="h2">Signets</Heading>
      <Flex sx={{ flexWrap: 'wrap' }}>
        {signetGroups.map(signetGroup => {
          return (
            <Link href={`/v2-pre/er/signets/${signetGroup.id}`} key={signetGroup.id}>
              <Card p={1} m={1}>
                <Flex sx={{ alignItems: 'center' }}>
                  <SquareImage
                    src={`${assetsBucketBaseUrl}/raw/supportbufficon/${signetGroup.icon}.png`}
                    originalSize={120}
                    size={40}
                  />
                  <Box p={1}>{signetGroup.name}</Box>
                </Flex>
              </Card>
            </Link>
          )
        })}
      </Flex>

      <Heading as="h2">Battlesuits</Heading>
      <Flex sx={{ flexWrap: 'wrap' }}>
        {erBattlesuitCatalog.map(erBattlesuit => {
          const battlesuit = battlesuitCatalogMap.get(erBattlesuit.battlesuit)!
          return (
            <Box key={battlesuit.id}>
              <Link href={`/v2-pre/er/battlesuits/${battlesuit.id}`}>
                <BattlesuitCatalogItemCard battlesuit={battlesuit} />
              </Link>
            </Box>
          )
        })}
      </Flex>

      <Heading as="h2">Supports</Heading>
    </Box>
  )
}

export default ErPage

export async function getStaticProps({ locale }: NextPageContext) {
  const erBattlesuitCatalog = loadErBattlesuitCatalog()
  const battlesuitCatalog = loadBattlesuitCatalog()

  return {
    props: { erBattlesuitCatalog, battlesuitCatalog }
  }
}
