/** @jsxImportSource theme-ui */
import { Box, Heading, Flex, Card } from '@theme-ui/components'
import { NextPageContext } from 'next'
import {
  loadBattlesuitCatalog,
  loadErBattlesuitCatalog,
  loadErSigils,
  loadErSupports
} from '../../../lib/v2/server/loadData'
import { BattlesuitCatalogItem, ErBattlesuitCatalogItem } from '../../../lib/v2/data/types'
import { useMemo } from 'react'
import BattlesuitCatalogItemCard from '../../../components/v2/BattlesuitCatalogItemCard'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import SquareImage from '../../../components/v2/SquareImage'
import { signetGroups } from '../../../lib/v2/data/er'
import BattlesuitSmallIcon from '../../../components/v2/BattlesuitSmallIcon'
import MaterialIcon from '../../../components/v2/MaterialIcon'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import Head from '../../../components/atoms/Head'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { useTranslation } from 'next-i18next'
import { getI18NProps } from '../../../server/i18n'
import PageLink from '../../../components/atoms/PageLink'
import { getSignetGroupLabel } from '../../../lib/v2/data/text'
import { useLocale } from '../../../lib/i18n'

interface ErPageProps {
  erBattlesuitCatalog: ErBattlesuitCatalogItem[]
  battlesuitCatalog: BattlesuitCatalogItem[]
  erSupports: string[]
  erSigils: { id: string; name: string }[]
}

const ErPage = ({ erBattlesuitCatalog, battlesuitCatalog, erSupports, erSigils }: ErPageProps) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const battlesuitCatalogMap = useMemo(() => {
    return battlesuitCatalog.reduce((map, item) => {
      map.set(item.id, item)
      return map
    }, new Map<string, BattlesuitCatalogItem>())
  }, [battlesuitCatalog])

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.elysian-realm')} - ${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        description={t('common.elysian-realm')}
        canonicalHref={`/honkai3rd/elysian-realm`}
      />

      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: '/honkai3rd/er',
              label: t('common.elysian-realm')
            }
          ]}
        />
        <Heading as="h1">{t('elysian-realm.elysian-realm')}</Heading>

        <Heading as="h2">{t('elysian-realm.signets')}</Heading>
        <Flex sx={{ flexWrap: 'wrap', mb: 3 }}>
          {signetGroups.map(signetGroup => {
            return (
              <PageLink href={`/honkai3rd/er/signets/${signetGroup.id}`} key={signetGroup.id}>
                <Card p={1} m={1}>
                  <Flex sx={{ alignItems: 'center' }}>
                    <SquareImage
                      src={`${assetsBucketBaseUrl}/raw/supportbufficon/${signetGroup.icon}.png`}
                      originalSize={120}
                      size={40}
                    />
                    <Box p={1}>{getSignetGroupLabel(signetGroup.id, locale)}</Box>
                  </Flex>
                </Card>
              </PageLink>
            )
          })}
        </Flex>

        <Heading as="h2">{t('elysian-realm.battlesuits')}</Heading>
        <Flex sx={{ flexWrap: 'wrap', mb: 3 }}>
          {erBattlesuitCatalog.map(erBattlesuit => {
            const battlesuit = battlesuitCatalogMap.get(erBattlesuit.battlesuit)!
            return (
              <Box key={battlesuit.id}>
                <PageLink href={`/honkai3rd/er/battlesuits/${battlesuit.id}`}>
                  <BattlesuitCatalogItemCard battlesuit={battlesuit} />
                </PageLink>
              </Box>
            )
          })}
        </Flex>

        <Heading as="h2">{t('elysian-realm.supports')}</Heading>

        <Flex sx={{ flexWrap: 'wrap' }}>
          {erSupports.map(support => {
            const battlesuit = battlesuitCatalogMap.get(support)!
            return (
              <Box key={support}>
                <PageLink href={`/honkai3rd/er/supports#${support}`}>
                  <Box sx={{ p: 1, m: 1, width: 110 }}>
                    <BattlesuitSmallIcon battlesuit={battlesuit} ratio={0.8} />
                    <Box
                      sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {battlesuit.fullName}
                    </Box>
                  </Box>
                </PageLink>
              </Box>
            )
          })}
        </Flex>

        <Heading as="h2">{t('elysian-realm.remembrance-sigil')}</Heading>

        <Flex sx={{ flexWrap: 'wrap' }}>
          {erSigils.map(sigil => {
            return (
              <Card key={sigil.id} p={1} m={1}>
                <PageLink href={`/honkai3rd/er/sigils#${sigil.id}`}>
                  <MaterialIcon materialId={sigil.id} />
                </PageLink>
              </Card>
            )
          })}
        </Flex>
      </Box>
    </Honkai3rdLayout>
  )
}

export default ErPage

export async function getStaticProps({ locale }: NextPageContext) {
  const erBattlesuitCatalog = loadErBattlesuitCatalog(locale)
  const battlesuitCatalog = loadBattlesuitCatalog(locale)
  const erSupports = loadErSupports(locale).map(support => {
    return support.battlesuit
  })

  const erSigils = loadErSigils(locale).map(sigil => {
    return {
      id: sigil.id,
      name: sigil.name
    }
  })

  return {
    props: { erBattlesuitCatalog, battlesuitCatalog, erSupports, erSigils, ...(await getI18NProps(locale)) }
  }
}
