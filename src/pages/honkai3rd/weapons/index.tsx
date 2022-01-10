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
import { getI18NProps } from '../../../server/i18n'
import { NextPageContext } from 'next'
import { useTranslation, translate } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'

type WeaponListItemData = Pick<
  WeaponData,
  'id' | 'name' | 'rarity' | 'category' | 'krName'
>

interface WeaponListPageProps {
  weaponDataList: WeaponListItemData[]
}

const weaponFilterOptions = [
  { value: 'all', label: 'All', krLabel: '전체' },
  { value: 'pistol', label: 'Pistols', krLabel: '쌍권총' },
  { value: 'katana', label: 'Katanas', krLabel: '태도' },
  { value: 'cannon', label: 'Cannons', krLabel: '대포' },
  { value: 'greatsword', label: 'Greatswords', krLabel: '대검' },
  { value: 'cross', label: 'Crosses', krLabel: '십자가' },
  { value: 'gauntlet', label: 'Gauntlets', krLabel: '건틀릿' },
  { value: 'scythe', label: 'Scythes', krLabel: '낫' },
  { value: 'lance', label: 'Lances', krLabel: '랜스' },
  { value: 'bow', label: 'Bows', krLabel: '활' },
]

const WeaponListPage = ({ weaponDataList }: WeaponListPageProps) => {
  const { query, locale } = useRouter()
  const { t } = useTranslation()

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
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: ${t(
          'breadcrumb.weapons'
        )} - Abyss Lab`}
        description={t('weapons-list.description')}
      />
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('breadcrumb.honkai-3rd') },
            { href: '/honkai3rd/weapons', label: t('breadcrumb.weapons') },
          ]}
        />

        <Heading as='h1'>{t('weapons-list.weapons')}</Heading>
        <Box>
          <Heading as='h3'>{t('weapons-list.filter-by-category')}</Heading>
          <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
            {weaponFilterOptions.map(({ value, label, krLabel }) => {
              return (
                <FilterButton
                  key={value}
                  active={value === filter}
                  value={value}
                  label={translate(locale, { 'ko-KR': krLabel }, label)}
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
        return pick(['name', 'id', 'rarity', 'category', 'krName'], weapon)
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
