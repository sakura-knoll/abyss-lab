/** @jsxImportSource theme-ui */
import { Box, Heading, Flex, Button } from '@theme-ui/components'
import { pick } from 'ramda'
import { useCallback, useMemo, useState } from 'react'
import FilterButton from '../../../components/atoms/FilterButton'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { listBattlesuits } from '../../../server/data/honkai3rd/battlesuits'
import {
  BattlesuitData,
  battlesuitFeatures,
  battlesuitTypes,
  valkyries,
} from '../../../lib/honkai3rd/battlesuits'
import BattlesuitCard from '../../../components/molecules/BattlesuitCard'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next'
import { getI18NProps } from '../../../server/i18n'
import { translate, useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'

type BattlesuitListItemData = Pick<
  BattlesuitData,
  'id' | 'name' | 'krName' | 'features' | 'type' | 'valkyrie'
>

interface BattlesuitListPageProps {
  battlesuits: BattlesuitListItemData[]
}

const featureFilterOptions: {
  value: string
  label: string
  icon?: string
  krLabel?: string
}[] = [{ value: 'all', label: 'All', krLabel: '전체' }, ...battlesuitFeatures]

const valkyrieFilterOptions: {
  value: string
  label: string
  icon?: string
  krLabel?: string
}[] = [
  { value: 'all', label: 'All', krLabel: '전체' },
  ...battlesuitTypes,
  ...valkyries,
]

const BattlesuitListPage = ({ battlesuits }: BattlesuitListPageProps) => {
  const { query, locale } = useRouter()
  const { t } = useTranslation()
  const [hiddenFilters, setHiddenFilters] = useState(true)

  const closeFilters = useCallback(() => {
    setHiddenFilters(true)
  }, [])

  const filter = useMemo(() => {
    if (query.filter == null) {
      return 'all'
    }

    return typeof query.filter === 'string' ? query.filter : query.filter[0]
  }, [query])

  const battlesuitList = useMemo(() => {
    return battlesuits.map((battlesuit) => {
      const hidden = isBattlesuitHidden(battlesuit, filter)
      return (
        <BattlesuitCard
          key={battlesuit.id}
          battlesuit={battlesuit}
          hidden={hidden}
        />
      )
    })
  }, [battlesuits, filter])

  return (
    <Box>
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: ${t(
          'breadcrumb.battlesuits'
        )} - Abyss Lab`}
        description={t('battlesuits-list.description')}
      />
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('breadcrumb.honkai-3rd') },
            {
              href: '/honkai3rd/battlesuits',
              label: t('breadcrumb.battlesuits'),
            },
          ]}
        />

        <Heading as='h1'>{t('battlesuits-list.heading')}</Heading>

        <Box sx={{ display: ['block', 'none'], mb: 2 }}>
          <Button
            className={hiddenFilters ? '' : 'active'}
            sx={{ px: 2, py: 1 }}
            onClick={() => {
              setHiddenFilters((previousValue) => !previousValue)
            }}
          >
            {t('battlesuits-list.filters')}
          </Button>
        </Box>
        <Box
          className={hiddenFilters ? 'hidden' : ''}
          sx={{
            display: 'block',
            '&.hidden': {
              display: ['none', 'block'],
            },
          }}
        >
          <Heading as='h3'>{t('battlesuits-list.filter-by-features')}</Heading>
          <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
            {featureFilterOptions.map(({ value, label, icon, krLabel }) => {
              return (
                <FilterButton
                  key={value}
                  active={value === filter}
                  value={value}
                  label={translate(locale, { 'ko-KR': krLabel }, label)}
                  icon={icon}
                  m={1}
                  close={closeFilters}
                />
              )
            })}
          </Flex>

          <Heading as='h3'>{t('battlesuits-list.filter-by-valkyries')}</Heading>
          <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
            {valkyrieFilterOptions.map(({ value, label, icon, krLabel }) => {
              return (
                <FilterButton
                  key={value}
                  active={value === filter}
                  value={value}
                  label={translate(locale, { 'ko-KR': krLabel }, label)}
                  icon={icon}
                  m={1}
                  close={closeFilters}
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
          {battlesuitList}
        </Flex>
      </Box>
    </Box>
  )
}

export default BattlesuitListPage

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      battlesuits: listBattlesuits().map((battlesuit) =>
        pick(
          ['id', 'name', 'krName', 'features', 'type', 'valkyrie'],
          battlesuit
        )
      ),
      ...(await getI18NProps(locale)),
    },
  }
}

function isBattlesuitHidden(
  battlesuit: BattlesuitListItemData,
  filter: string
): boolean {
  switch (filter) {
    case 'physical':
    case 'fire-dmg':
    case 'ice-dmg':
    case 'lightning-dmg':
    case 'freeze':
    case 'paralyze':
    case 'stun':
    case 'ignite':
    case 'bleed':
    case 'heavy-atk':
    case 'weaken':
    case 'impair':
    case 'time mastery':
    case 'gather':
    case 'heal':
    case 'fast atk':
    case 'burst':
    case 'aerial':
      return !battlesuit.features.some((feature) => feature === filter)
    case 'mecha':
    case 'biologic':
    case 'psychic':
    case 'quantum':
    case 'imaginary':
      return battlesuit.type !== filter
    case 'kiana':
    case 'mei':
    case 'bronya':
    case 'himeko':
    case 'theresa':
    case 'fuhua':
    case 'rita':
    case 'sakura':
    case 'kallen':
    case 'olenyevas':
    case 'seele':
    case 'durandal':
    case 'fischl':
    case 'elysia':
    case 'mobius':
    case 'raven':
    case 'carole':
      return battlesuit.valkyrie !== filter
    default:
    case 'all':
      return false
  }
}
