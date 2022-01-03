/** @jsxImportSource theme-ui */
import { Box, Heading, Flex } from '@theme-ui/components'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { listWeapons } from '../../../server/data/honkai3rd/weapons'
import { pick } from 'ramda'
import { useMemo } from 'react'
import FilterButton from '../../../components/atoms/FilterButton'
import { useRouter } from 'next/router'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import WeaponCard from '../../../components/molecules/WeaponCard'
import { getI18NProps } from '../../../lib/i18n'
import { NextPageContext } from 'next'

type WeaponListItemData = Pick<
  WeaponData,
  'id' | 'name' | 'rarity' | 'category'
>

interface WeaponListPageProps {
  weaponDataList: WeaponListItemData[]
}

const weaponFilterOptions = [
  { value: 'all', label: 'All' },
  { value: 'pistol', label: 'Pistols' },
  { value: 'katana', label: 'Katanas' },
  { value: 'cannon', label: 'Cannons' },
  { value: 'greatsword', label: 'Greatswords' },
  { value: 'cross', label: 'Crosses' },
  { value: 'gauntlet', label: 'Gauntlets' },
  { value: 'scythe', label: 'Scythes' },
  { value: 'lance', label: 'Lances' },
  { value: 'bow', label: 'Bows' },
]

const WeaponListPage = ({ weaponDataList }: WeaponListPageProps) => {
  const { query } = useRouter()

  const filter = useMemo(() => {
    if (query.filter == null) {
      return 'all'
    }

    return typeof query.filter === 'string' ? query.filter : query.filter[0]
  }, [query])

  const weaponList = useMemo(() => {
    return weaponDataList.map((weapon) => {
      const hidden = isWeaponHidden(weapon, filter)
      return <WeaponCard key={weapon.id} weapon={weapon} hidden={hidden} />
    })
  }, [weaponDataList, filter])

  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/weapons', label: 'Weapons' },
          ]}
        />

        <Heading as='h1'>Weapons</Heading>
        <Box>
          <Heading as='h3'>Filter by Category</Heading>
          <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
            {weaponFilterOptions.map(({ value, label }) => {
              return (
                <FilterButton
                  key={value}
                  active={value === filter}
                  value={value}
                  label={label}
                  m={1}
                />
              )
            })}
          </Flex>
        </Box>
        <Flex
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {weaponList}
        </Flex>
      </Box>
    </Box>
  )
}

export default WeaponListPage

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      weaponDataList: listWeapons().map((weapon) => {
        return pick(['name', 'id', 'rarity', 'category'], weapon)
      }),
      ...(await getI18NProps(locale)),
    },
  }
}

function isWeaponHidden(weapon: WeaponListItemData, filter: string): boolean {
  switch (filter) {
    case 'pistol':
    case 'katana':
    case 'cannon':
    case 'greatsword':
    case 'cross':
    case 'gauntlet':
    case 'scythe':
    case 'lance':
    case 'bow':
      return weapon.category !== filter
    default:
    case 'all':
      return false
  }
}
