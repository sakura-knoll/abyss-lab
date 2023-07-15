/** @jsxImportSource theme-ui */
import { Box, Heading } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { Flex, Link, Text } from 'theme-ui'
import { loadBattlesuitCatalog } from '../../../lib/v2/server/loadData'
import { BattlesuitCatalogItem, TagType } from '../../../lib/v2/data/types'
import BattlesuitCatalogItemCard from '../../../components/v2/BattlesuitCatalogItemCard'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { useTranslation } from 'next-i18next'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { getI18NProps } from '../../../server/i18n'
import FilterButton from '../../../components/atoms/FilterButton'
import { translate } from '../../../lib/i18n'
import { characterFilterTypes } from '../../../lib/v2/data/utils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { getCharacterTypeLabel, getTagTypeLabel } from '../../../lib/v2/data/text'
import ChibiIcon from '../../../components/v2/ChibiIcon'
import TagIcon from '../../../components/v2/TagIcon'

interface BattlesuitListPageProps {
  battlesuitCatalog: BattlesuitCatalogItem[]
}

const BattlesuitListPage = ({ battlesuitCatalog }: BattlesuitListPageProps) => {
  const { t } = useTranslation()
  const { locale, query } = useRouter()

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

      return valkyrieFilter === battlesuit.character
    })
  }, [battlesuitCatalog, valkyrieFilter])

  const tagFilterTypes = useMemo(() => {
    const tagSet = battlesuitsFilteredByValkyrie.reduce<Set<TagType>>((set, battlesuit) => {
      battlesuit.tags.forEach(tag => set.add(tag))
      return set
    }, new Set())
    return [...tagSet]
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
          {characterFilterTypes.map(type => {
            const active = type === valkyrieFilter
            return (
              <FilterButton key={type} active={active} href={active ? `` : `?valkyrie=${type}`} m={1}>
                <Flex sx={{ alignItems: 'center' }}>
                  <ChibiIcon id={type} />
                  <Text ml={1}>
                    {translate(locale, { 'ko-KR': getCharacterTypeLabel(type, 'ko-KR') }, getCharacterTypeLabel(type))}
                  </Text>
                </Flex>
              </FilterButton>
            )
          })}
        </Flex>

        {tagFilterTypes.length > 0 && (
          <>
            <Heading as="h3">{t('battlesuits-list.filter-by-features')}</Heading>
            <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
              {tagFilterTypes.map(type => {
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
                      <Text ml={1}>
                        {translate(locale, { 'ko-KR': getTagTypeLabel(type, 'ko-KR') }, getTagTypeLabel(type))}
                      </Text>
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
            .map(battlesuit => {
              return (
                <Box key={battlesuit.id}>
                  <Link href={`/honkai3rd/battlesuits/${battlesuit.id}`}>
                    <BattlesuitCatalogItemCard battlesuit={battlesuit} />
                  </Link>
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
  const battlesuitCatalog = loadBattlesuitCatalog()

  return {
    props: { battlesuitCatalog, ...(await getI18NProps(locale)) }
  }
}
