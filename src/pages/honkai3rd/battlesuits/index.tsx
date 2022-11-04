/** @jsxImportSource theme-ui */
import { Box, Heading, Flex, Button } from '@theme-ui/components'
import { useCallback, useMemo, useState } from 'react'
import FilterButton from '../../../components/atoms/FilterButton'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
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
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'

type BattlesuitListItemData = Pick<
  BattlesuitData,
  'id' | 'name' | 'features' | 'type' | 'valkyrie'
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

  const valkyrieFilter = useMemo(() => {
    if (query.valkyrie == null) {
      return 'all'
    }

    return typeof query.valkyrie === 'string'
      ? query.valkyrie
      : query.valkyrie[0]
  }, [query])

  const featureFilter = useMemo(() => {
    if (query.feature == null) {
      return 'all'
    }

    return typeof query.feature === 'string' ? query.feature : query.feature[0]
  }, [query])

  const battlesuitsFiteredByValkyrie = useMemo(() => {
    return battlesuits.filter((battlesuit) =>
      isValkyrieFilterMatching(battlesuit, valkyrieFilter)
    )
  }, [battlesuits, valkyrieFilter])

  const availableFeatureSet = battlesuitsFiteredByValkyrie.reduce(
    (set, battlesuit) => {
      battlesuit.features.forEach((feature) => set.add(feature))
      return set
    },
    new Set()
  )

  const battlesuitsFilteredByFeature = useMemo(() => {
    return battlesuitsFiteredByValkyrie.filter((battlesuit) =>
      isFeatureFilterMatching(battlesuit, featureFilter)
    )
  }, [battlesuitsFiteredByValkyrie, featureFilter])

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.battlesuits')} - ${t('common.honkai-3rd')} - ${t(
          'common.abyss-lab'
        )}`}
        description={t('battlesuits-list.description')}
        canonicalHref={`/honkai3rd/battlesuits`}
      />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: '/honkai3rd/battlesuits',
              label: t('common.battlesuits'),
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
          <Heading as='h3'>{t('battlesuits-list.filter-by-valkyries')}</Heading>
          <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
            {valkyrieFilterOptions.map(({ value, label, icon, krLabel }) => {
              return (
                <FilterButton
                  key={value}
                  active={value === valkyrieFilter}
                  href={`?valkyrie=${value}`}
                  label={translate(locale, { 'ko-KR': krLabel }, label)}
                  icon={icon}
                  m={1}
                  close={closeFilters}
                />
              )
            })}
          </Flex>
          <Heading as='h3'>{t('battlesuits-list.filter-by-features')}</Heading>
          <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
            {featureFilterOptions
              .filter((filterOption) => {
                if (filterOption.value === 'all') {
                  return true
                }
                return availableFeatureSet.has(filterOption.value)
              })
              .map(({ value, label, icon, krLabel }) => {
                return (
                  <FilterButton
                    key={value}
                    active={value === featureFilter}
                    href={`?valkyrie=${valkyrieFilter}&feature=${value}`}
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
          {battlesuitsFilteredByFeature.map((battlesuit) => {
            return (
              <BattlesuitCard key={battlesuit.id} battlesuit={battlesuit} />
            )
          })}
        </Flex>
      </Box>
    </Honkai3rdLayout>
  )
}

export default BattlesuitListPage

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      battlesuits: listBattlesuits(locale).map((battlesuit) => {
        return {
          id: battlesuit.id,
          name: battlesuit.name,
          features: battlesuit.features,
          type: battlesuit.type,
          valkyrie: battlesuit.valkyrie,
        }
      }),
      ...(await getI18NProps(locale)),
    },
  }
}

function isValkyrieFilterMatching(
  battlesuit: BattlesuitListItemData,
  valkyrieFilter: string
) {
  switch (valkyrieFilter) {
    case 'mecha':
    case 'biologic':
    case 'psychic':
    case 'quantum':
    case 'imaginary':
      return battlesuit.type === valkyrieFilter
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
    case 'asuka':
    case 'pardofelis':
    case 'aponia':
    case 'eden':
    case 'griseo':
    case 'vill-v':
      return battlesuit.valkyrie === valkyrieFilter
    default:
    case 'all':
      return true
  }
}

function isFeatureFilterMatching(
  battlesuit: BattlesuitListItemData,
  featureFilter: string
) {
  if (featureFilter === 'all') {
    return true
  }
  return battlesuit.features.some((feature) => feature === featureFilter)
}
