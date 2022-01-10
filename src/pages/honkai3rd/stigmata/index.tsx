/** @jsxImportSource theme-ui */
import { Box, Heading, Flex } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { pick } from 'ramda'
import { useMemo } from 'react'
import PageLink from '../../../components/atoms/PageLink'
import StigmataCard from '../../../components/molecules/StigmataCard'
import StigmataSetCard from '../../../components/molecules/StigmataSetCard'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { StigmataData, StigmataSet } from '../../../lib/honkai3rd/stigmata'
import { getI18NProps } from '../../../server/i18n'
import {
  listStigmata,
  listStigmataSet,
} from '../../../server/data/honkai3rd/stigmata'
import { useTranslation } from 'next-i18next'
import Head from '../../../components/atoms/Head'

interface StigmataListPageProps {
  stigmataDataList: Pick<StigmataData, 'id' | 'name' | 'rarity' | 'krName'>[]
  stigmataSetList: Pick<StigmataSet, 'id' | 'name' | 'rarity' | 'krName'>[]
}

const StigmataListPage = ({
  stigmataDataList,
  stigmataSetList,
}: StigmataListPageProps) => {
  const { t } = useTranslation()
  const { query } = useRouter()

  const listMode = useMemo(() => {
    if (query.list == null) {
      return 'single'
    }
    return typeof query.list === 'string' ? query.list : query.list[0]
  }, [query])

  return (
    <Box>
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: ${t(
          'breadcrumb.stigmata'
        )} - Abyss Lab`}
        description={t('stigmata-list.description')}
      />
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('breadcrumb.honkai-3rd') },
            { href: '/honkai3rd/stigmata', label: t('breadcrumb.stigmata') },
          ]}
        />

        <Heading as='h1'>{t('stigmata-list.stigmata')}</Heading>

        <Flex mb={3}>
          <PageLink
            href={{
              query: listMode === 'set' ? { list: 'single' } : { list: 'set' },
            }}
            shallow={true}
            m={1}
            py={1}
            px={2}
            className={listMode === 'set' ? 'active' : ''}
            sx={{ display: 'flex' }}
            variant='buttons.primary'
          >
            {t('stigmata-list.set-list')}
          </PageLink>
        </Flex>

        <Flex
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {listMode === 'set'
            ? stigmataSetList.map((stigmataSet) => {
                return (
                  <StigmataSetCard
                    key={stigmataSet.id}
                    stigmataSet={stigmataSet}
                  />
                )
              })
            : stigmataDataList.map((stigmata) => {
                return <StigmataCard key={stigmata.id} stigmata={stigmata} />
              })}
        </Flex>
      </Box>
    </Box>
  )
}

export default StigmataListPage

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      stigmataDataList: listStigmata().map((stigmata) =>
        pick(['id', 'name', 'rarity', 'krName'], stigmata)
      ),
      stigmataSetList: listStigmataSet().map((stigmataSet) =>
        pick(['id', 'name', 'rarity', 'krName'], stigmataSet)
      ),
      ...(await getI18NProps(locale)),
    },
  }
}
