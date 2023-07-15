/** @jsxImportSource theme-ui */
import { Box, Heading } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Text } from 'theme-ui'
import { loadBattlesuitCatalog } from '../../../lib/v2/server/loadData'
import { BattlesuitCatalogItem, TagType } from '../../../lib/v2/data/types'
import BattlesuitCatalogItemCard from '../../../components/v2/BattlesuitCatalogItemCard'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { useTranslation } from 'next-i18next'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { getI18NProps } from '../../../server/i18n'
import FilterButton from '../../../components/atoms/FilterButton'
import { useLocale } from '../../../lib/i18n'
import { attributeTypes, characterFilterTypes, tagFilterTypes } from '../../../lib/v2/data/utils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { getAttributeLabel, getCharacterTypeLabel, getTagTypeLabel } from '../../../lib/v2/data/text'
import ChibiIcon from '../../../components/v2/ChibiIcon'
import TagIcon from '../../../components/v2/TagIcon'
import AttributeIcon from '../../../components/v2/AttributeIcon'
import PageLink from '../../../components/atoms/PageLink'

interface BattlesuitListPageProps {
  battlesuitCatalog: BattlesuitCatalogItem[]
}

const BattlesuitListPage = ({ battlesuitCatalog }: BattlesuitListPageProps) => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const locale = useLocale()

  const valkyrieFilter = useMemo(() => {
    if (query.valkyrie == null) {
      return 'all'
    }

    return typeof query.valkyrie === 'string' ? query.valkyrie : query.valkyrie[0]
  }, [query])

  const tagFilter = useMemo(() => {
    if (query.tag == null) {
      return 'all'
    }

    return typeof query.tag === 'string' ? query.tag : query.tag[0]
  }, [query])

  const battlesuitsFilteredByValkyrie = useMemo(() => {
    return battlesuitCatalog.filter(battlesuit => {
      if (valkyrieFilter === 'all') {
        return true
      }

      switch (valkyrieFilter) {
        case 'bio':
        case 'psy':
        case 'mech':
        case 'qua':
        case 'img':
          return battlesuit.attributeType === valkyrieFilter
      }

      return battlesuit.character === valkyrieFilter
    })
  }, [battlesuitCatalog, valkyrieFilter])

  const tagFilterTypeOptions = useMemo(() => {
    const tagSet = battlesuitsFilteredByValkyrie.reduce<Set<TagType>>((set, battlesuit) => {
      battlesuit.tags.forEach(tag => set.add(tag))
      return set
    }, new Set())

    return [...tagSet].sort((a, b) => {
      return tagFilterTypes.indexOf(a) - tagFilterTypes.indexOf(b)
    })
  }, [battlesuitsFilteredByValkyrie])

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.battlesuits')} - ${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        description={t('battlesuits-list.description')}
        canonicalHref={`/honkai3rd/battlesuits`}
      />
      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: '/honkai3rd/battlesuits',
              label: t('common.battlesuits')
            }
          ]}
        />

        <Heading as="h1">{t('battlesuits-list.heading')}</Heading>

        <Heading as="h3">{t('battlesuits-list.filter-by-valkyries')}</Heading>
        <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
          {attributeTypes.map(type => {
            const active = type === valkyrieFilter

            return (
              <FilterButton key={type} active={active} href={active ? `` : `?valkyrie=${type}`} m={1}>
                <Flex sx={{ alignItems: 'center' }}>
                  <AttributeIcon attributeType={type} size={30} />
                  <Text ml={1}>{getAttributeLabel(type, locale)}</Text>
                </Flex>
              </FilterButton>
            )
          })}
          {characterFilterTypes.map(type => {
            const active = type === valkyrieFilter
            return (
              <FilterButton key={type} active={active} href={active ? `` : `?valkyrie=${type}`} m={1}>
                <Flex sx={{ alignItems: 'center' }}>
                  <ChibiIcon id={type} />
                  <Text ml={1}>{getCharacterTypeLabel(type, locale)}</Text>
                </Flex>
              </FilterButton>
            )
          })}
        </Flex>

        {tagFilterTypeOptions.length > 0 && (
          <>
            <Heading as="h3">{t('battlesuits-list.filter-by-features')}</Heading>
            <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
              {tagFilterTypeOptions.map(type => {
                const active = type === tagFilter
                return (
                  <FilterButton
                    key={type}
                    active={active}
                    href={`?${valkyrieFilter !== 'all' ? `valkyrie=${valkyrieFilter}&` : ''}${
                      active ? '' : `tag=${type}`
                    }`}
                    m={1}
                  >
                    <Flex sx={{ alignItems: 'center' }}>
                      <TagIcon type={type} />
                      <Text ml={1}>{getTagTypeLabel(type, locale)}</Text>
                    </Flex>
                  </FilterButton>
                )
              })}
            </Flex>
          </>
        )}

        <Flex sx={{ flexWrap: 'wrap' }}>
          {battlesuitsFilteredByValkyrie
            .filter(battlesuit => {
              if (tagFilter === 'all') {
                return true
              }
              return battlesuit.tags.findIndex(tag => tag === tagFilter) > -1
            })
            .sort(sortBattlesuits)
            .map(battlesuit => {
              return (
                <Box key={battlesuit.id}>
                  <PageLink href={`/honkai3rd/battlesuits/${battlesuit.id}`}>
                    <BattlesuitCatalogItemCard battlesuit={battlesuit} />
                  </PageLink>
                </Box>
              )
            })}
        </Flex>
      </Box>
    </Honkai3rdLayout>
  )
}

export default BattlesuitListPage

export async function getStaticProps({ locale }: NextPageContext) {
  const battlesuitCatalog = loadBattlesuitCatalog(locale).filter(item => {
    // APHO 2
    if (item.id.match(/90[0-9]{2}/)) {
      return false
    }
    switch (item.id) {
      // Durandal Story Only
      case '805':
      // Bronya Story Only?
      case '316':
      // APHO 1
      case '1411':
      case '1304':
      case '1203':
        return false
    }

    return true
  })

  return {
    props: { battlesuitCatalog, ...(await getI18NProps(locale)) }
  }
}

function sortBattlesuits(a: BattlesuitCatalogItem, b: BattlesuitCatalogItem) {
  return getOrderIndex(b) - getOrderIndex(a)

  function getOrderIndex(battlesuit: BattlesuitCatalogItem) {
    return parseInt(battlesuit.id)
  }
}
