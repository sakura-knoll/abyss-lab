/** @jsxImportSource theme-ui */
import { Box, Heading, Flex, Link, Card } from '@theme-ui/components'
import { NextPageContext } from 'next'
import {
  loadBattlesuitCatalog,
  loadErBattlesuitCatalog,
  loadErSigils,
  loadErSupports
} from '../../../../lib/v2-pre/server/loadData'
import { BattlesuitCatalogItem, ErBattlesuitCatalogItem } from '../../../../lib/v2-pre/data/types'
import { useMemo } from 'react'
import BattlesuitCatalogItemCard from '../../../../components/v2-pre/BattlesuitCatalogItemCard'
import { assetsBucketBaseUrl } from '../../../../lib/consts'
import SquareImage from '../../../../components/v2-pre/SquareImage'
import { signetGroups } from '../../../../lib/v2-pre/data/er'
import BattlesuitSmallIcon from '../../../../components/v2-pre/BattlesuitSmallIcon'
import MaterialIcon from '../../../../components/v2-pre/MaterialIcon'

interface ErPageProps {
  erBattlesuitCatalog: ErBattlesuitCatalogItem[]
  battlesuitCatalog: BattlesuitCatalogItem[]
  erSupports: string[]
  erSigils: { id: string; name: string }[]
}

const ErPage = ({ erBattlesuitCatalog, battlesuitCatalog, erSupports, erSigils }: ErPageProps) => {
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

      <Flex sx={{ flexWrap: 'wrap' }}>
        {erSupports.map(support => {
          const battlesuit = battlesuitCatalogMap.get(support)!
          return (
            <Box key={support}>
              <Link href={`/v2-pre/er/supports#${support}`}>
                <Box sx={{ p: 1, m: 1, width: 110 }}>
                  <BattlesuitSmallIcon battlesuit={battlesuit} ratio={0.8} />
                  <Box sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {battlesuit.fullName}
                  </Box>
                </Box>
                {/* <BattlesuitCatalogItemCard battlesuit={battlesuit} /> */}
              </Link>
            </Box>
          )
        })}
      </Flex>

      <Heading as="h2">Sigils</Heading>

      <Flex sx={{ flexWrap: 'wrap' }}>
        {erSigils.map(sigil => {
          return (
            <Card key={sigil.id} p={1} m={1}>
              <Link href={`/v2-pre/er/sigils#${sigil.id}`}>
                <MaterialIcon materialId={sigil.id} />
              </Link>
            </Card>
          )
        })}
      </Flex>
    </Box>
  )
}

export default ErPage

export async function getStaticProps({ locale }: NextPageContext) {
  const erBattlesuitCatalog = loadErBattlesuitCatalog()
  const battlesuitCatalog = loadBattlesuitCatalog()
  const erSupports = loadErSupports().map(support => {
    return support.battlesuit
  })

  const erSigils = loadErSigils().map(sigil => {
    return {
      id: sigil.id,
      name: sigil.name
    }
  })

  return {
    props: { erBattlesuitCatalog, battlesuitCatalog, erSupports, erSigils }
  }
}
