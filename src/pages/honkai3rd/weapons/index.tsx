/** @jsxImportSource theme-ui */
import { Box, Heading, Flex } from '@theme-ui/components'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { listWeapons } from '../../../server/data/honkai3rd/weapons'
import { pick } from 'ramda'
import { useMemo } from 'react'
import FilterButton from '../../../components/atoms/FilterButton'
import { useRouter } from 'next/router'
import { weaponCategories, WeaponData } from '../../../lib/honkai3rd/weapons'
import WeaponCard from '../../../components/molecules/WeaponCard'
import { getI18NProps } from '../../../server/i18n'
import { NextPageContext } from 'next'
import { useTranslation, translate } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'

type WeaponListItemData = Pick<
  WeaponData,
  'id' | 'name' | 'rarity' | 'category'
>

interface WeaponListPageProps {
  weaponDataList: WeaponListItemData[]
}

const weaponFilterOptions = [
  { value: 'all', label: 'All', krLabel: '전체', icon: undefined },
  ...weaponCategories,
]

const WeaponListPage = ({ weaponDataList }: WeaponListPageProps) => {
  const { query, locale } = useRouter()
  const { t } = useTranslation()

  const categoryFilter = useMemo(() => {
    if (query.category == null) {
      return 'all'
    }

    return typeof query.category === 'string'
      ? query.category
      : query.category[0]
  }, [query])

  const weaponList = useMemo(() => {
    return weaponDataList.map((weapon) => {
      const hidden = isWeaponHidden(weapon, categoryFilter)
      return <WeaponCard key={weapon.id} weapon={weapon} hidden={hidden} />
    })
  }, [weaponDataList, categoryFilter])

  return (
    <Honkai3rdLayout>
      <Box>
        <Head
          title={`${t('common.weapons')} - ${t('common.honkai-3rd')} - ${t(
            'common.abyss-lab'
          )}`}
          description={t('weapons-list.description')}
          canonicalHref={`/honkai3rd/weapons`}
        />

        <Box p={3}>
          <Breadcrumb
            items={[
              { href: '/honkai3rd', label: t('common.honkai-3rd') },
              { href: '/honkai3rd/weapons', label: t('common.weapons') },
            ]}
          />

          <Heading as='h1'>{t('weapons-list.weapons')}</Heading>
          <Box>
            <Heading as='h3'>{t('weapons-list.filter-by-category')}</Heading>
            <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
              {weaponFilterOptions.map(({ value, label, krLabel, icon }) => {
                return (
                  <FilterButton
                    key={value}
                    href={`?category=${value}`}
                    active={value === categoryFilter}
                    icon={icon}
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
    </Honkai3rdLayout>
  )
}

export default WeaponListPage

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      weaponDataList: listWeapons(locale).map((weapon) => {
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
    case 'chakram':
      return weapon.category !== filter
    default:
    case 'all':
      return false
  }
}
