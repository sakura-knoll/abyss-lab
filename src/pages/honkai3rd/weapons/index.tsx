/** @jsxImportSource theme-ui */
import { Box, Card } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Heading } from 'theme-ui'
import { loadWeaponCatalog } from '../../../lib/v2/server/loadData'
import { WeaponCatalogItem } from '../../../lib/v2/data/types'
import WeaponIcon from '../../../components/v2/WeaponIcon'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { useTranslation } from 'next-i18next'
import { getI18NProps } from '../../../server/i18n'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import PageLink from '../../../components/atoms/PageLink'

interface WeaponListPageProps {
  weaponCatalog: WeaponCatalogItem[]
}

const WeaponListPage = ({ weaponCatalog }: WeaponListPageProps) => {
  const { t } = useTranslation()
  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.weapons')} - ${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        description={t('weapons-list.description')}
        canonicalHref={`/honkai3rd/weapons`}
      />
      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/weapons', label: t('common.weapons') }
          ]}
        />
        <Heading as="h1">{t('common.weapons')}</Heading>
        <Flex sx={{ flexWrap: 'wrap' }}>
          {weaponCatalog
            .filter(filterWeapons)
            .sort(sortWeapons)
            .map(weapon => {
              return (
                <Box key={weapon.id} m={1}>
                  <PageLink href={`/honkai3rd/weapons/${weapon.id}`}>
                    <Card p={1}>
                      <Flex sx={{ justifyContent: 'center' }}>
                        <WeaponIcon icon={weapon.icon} rarity={weapon.maxRarity} />
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
                        {weapon.name}
                      </Box>
                      {/* {weapon.id} */}
                    </Card>
                  </PageLink>
                </Box>
              )
            })}
        </Flex>
      </Box>
    </Honkai3rdLayout>
  )
}

export default WeaponListPage

export async function getStaticProps({ locale }: NextPageContext) {
  const weaponCatalog = loadWeaponCatalog(locale)

  return {
    props: { weaponCatalog, ...(await getI18NProps(locale)) }
  }
}

function filterWeapons(weapon: WeaponCatalogItem) {
  // Valid weapons
  // 24XXX EX Weapons
  // 21XXX Sprit Weapon
  // 19XXX Alloy Weapons
  // 10XXX Regular Weapons

  // Event Weapon?
  if (weapon.id.startsWith('18') && weapon.id.length === 5) {
    return false
  }
  // Test Data?
  if (weapon.id.startsWith('1023') && weapon.id.length === 6) {
    return false
  }
  // Unreleased(Number looks good but lacking info)
  switch (weapon.id) {
    case '24000': // 2nd relic alpha
    case '24040': // Removed 7 Thunders
    case '24034': // PE Temp Lance
    case '24024': // keqing ex
    case '20765': // ?
    case '10243': // No Name
    case '10219': // ?
    case '10179': // ?
      return false
  }

  // Divine Keys
  switch (weapon.id) {
    case '20000': // Taixuan Sword
    case '10248': // Abyss Flower
    case '10267': // Eden's star anti entropy
    case '10263': // 7 Thunders
    case '10247': // Abyss
    case '10235': // Fenghuang pistols
    case '10234': // Fenghuang fists
    case '10223': // Eden twin stars
    case '10212': // Pledge of Sakura
    case '10211': // Pledge of Judah
    case '10209': // Might of an utu
    case '10199': // Cleaver of Shamash
    case '10163': // Shamash pistols
      // The below don't have duplicated data
      // case '10180': // Eden's star
      // case '10169': // Taxiuan fists
      // case '10158': // Jizo Mitama
      return false
  }

  return true
}

function sortWeapons(a: WeaponCatalogItem, b: WeaponCatalogItem) {
  let aId = parseInt(a.id)

  const aTypeOrder = aId > 21000 && aId < 22000 ? 2 : aId > 19000 && aId < 20000 ? 1 : 0

  let bId = parseInt(b.id)
  const bTypeOrder = bId > 21000 && bId < 22000 ? 2 : bId > 19000 && bId < 20000 ? 1 : 0
  if (aTypeOrder !== bTypeOrder) {
    return aTypeOrder - bTypeOrder
  }

  return bId - aId
}
