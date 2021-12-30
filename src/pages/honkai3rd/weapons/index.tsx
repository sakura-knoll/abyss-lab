/** @jsxImportSource theme-ui */
import { Text, Box, Heading, Flex, Link } from '@theme-ui/components'
import NextLink from 'next/link'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { listWeapons, WeaponData } from '../../../data/honkai3rd/weapons'
import { pick } from 'ramda'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import { useMemo, useState } from 'react'
import FilterButton from '../../../components/atoms/FilterButton'

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
  const [filter, setFilter] = useState('all')

  const weaponList = useMemo(() => {
    return weaponDataList.map((weapon) => {
      const hidden = isWeaponHidden(weapon, filter)
      return (
        <Box
          key={weapon.id}
          className={hidden ? 'hidden' : ''}
          sx={{
            width: '120px',
            padding: 2,
            margin: 1,
            borderColor: 'gray.3',
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 8,
            transition: 'box-shadow 200ms ease-in-out',
            '&:hover': {
              borderColor: 'gray.3',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
            '&.hidden': {
              display: 'none',
            },
          }}
        >
          <NextLink
            href={`/honkai3rd/weapons/${weapon.id}`}
            key={weapon.id}
            passHref={true}
          >
            <Link>
              <SquareImageBox
                size={100}
                alt={weapon.name}
                src={`/assets/honkai3rd/weapons/${weapon.id}.png`}
              />
              <Box
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                }}
              >
                <Text>{weapon.name}</Text>
              </Box>
              <Box sx={{ fontSize: 1, textAlign: 'center' }}>
                {'⭐'.repeat(weapon.rarity)}
              </Box>
            </Link>
          </NextLink>
        </Box>
      )
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
                  setFilter={setFilter}
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

export async function getStaticProps() {
  return {
    props: {
      weaponDataList: listWeapons().map((weapon) => {
        return pick(['name', 'id', 'rarity', 'category'], weapon)
      }),
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
