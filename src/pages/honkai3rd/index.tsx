/** @jsxImportSource theme-ui */
import { Box, Flex, Heading, Link, Text, Paragraph } from '@theme-ui/components'
import NextLink from 'next/link'
import SquareImageBox from '../../components/atoms/SquareImageBox'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import GanttChart from '../../components/organisms/GanttChart'
import { getBattlesuitById } from '../../server/data/honkai3rd/battlesuits'
import {
  getCurrentVersion,
  listVersionData,
} from '../../server/data/honkai3rd/versions'
import { getWeaponById } from '../../server/data/honkai3rd/weapons'
import { addDateToDateString, getDateString } from '../../lib/string'
import ScrollContainer from 'react-indiana-drag-scroll'
import { format as formatDate } from 'date-fns'
import { BattlesuitData } from '../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../lib/honkai3rd/weapons'
import { VersionData } from '../../lib/honkai3rd/versions'
import { getI18NProps } from '../../server/i18n'
import { NextPageContext } from 'next'
import { useTranslation } from '../../lib/i18n'
import Head from '../../components/atoms/Head'
import PageLink from '../../components/atoms/PageLink'
import { assetsBucketBaseUrl } from '../../lib/consts'
import Honkai3rdLayout from '../../components/layouts/Honkai3rdLayout'
import WeaponCard from '../../components/molecules/WeaponCard'
import BattlesuitCard from '../../components/molecules/BattlesuitCard'
import { useCallback, useEffect, useRef, useState } from 'react'
import BossTable from '../../components/organisms/BossTable'
import { getStigmataSetBySetId } from '../../server/data/honkai3rd/stigmata'
import { StigmataSet } from '../../lib/honkai3rd/stigmata'
import StigmataSetCard from '../../components/molecules/StigmataSetCard'

interface VersionIndexPageProps {
  versionDataList: VersionData[]
  currentVersionData: VersionData
  currentVersionNewBattlesuits: BattlesuitData[]
  currentVersionNewWeapons: WeaponData[]
  currentVersionNewStigmataSets: StigmataSet[]
}

const VersionIndexPage = ({
  currentVersionData,
  currentVersionNewBattlesuits,
  versionDataList,
  currentVersionNewWeapons,
  currentVersionNewStigmataSets,
}: VersionIndexPageProps) => {
  const { t } = useTranslation()
  const [today, setToday] = useState<Date | null>(null)
  const supplyGanttChartScrollContainerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    setToday(new Date(getDateString(new Date())))
  }, [])

  const scrollSupplyGanttChart = useCallback((to: number) => {
    if (supplyGanttChartScrollContainerRef.current == null) {
      return null
    }
    supplyGanttChartScrollContainerRef.current.scrollTo(to, 0)
  }, [])

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.versions')} - ${t('common.honkai-3rd')} - ${t(
          'common.abyss-lab'
        )}`}
        description={t('versions.list-page-description')}
      />

      <Box p={3}>
        <Breadcrumb
          items={[{ href: '/honkai3rd', label: t('common.honkai-3rd') }]}
        />
        <Box mb={4}>
          <Box mb={2}>
            {currentVersionData.previousVersion != null && (
              <PageLink
                href={`/honkai3rd/versions/${currentVersionData.previousVersion}`}
                mr={2}
              >
                {t('versions.previous')} (v
                {currentVersionData.previousVersion})
              </PageLink>
            )}
            {currentVersionData.nextVersion != null && (
              <PageLink
                href={`/honkai3rd/versions/${currentVersionData.nextVersion}`}
              >
                {t('versions.next')} (v{currentVersionData.nextVersion})
              </PageLink>
            )}
          </Box>

          <Heading as='h1'>
            v{currentVersionData.version} : {currentVersionData.name}{' '}
            <small>({t('versions.current')})</small>
          </Heading>
          <Box mb={4}>
            {formatDate(new Date(currentVersionData.duration[0]), 'PP')} -{' '}
            {currentVersionData.duration[1] != null
              ? formatDate(new Date(currentVersionData.duration[1]), 'PP')
              : ''}
          </Box>

          <Box>
            <Heading as='h3' mb={2}>
              {t('versions.new-battlesuits')}
            </Heading>
            <Box mb={2} sx={{ display: 'inline-block' }}>
              {currentVersionNewBattlesuits.map((battlesuit) => {
                return (
                  <BattlesuitCard
                    key={battlesuit.id}
                    battlesuit={battlesuit}
                    size='sm'
                  />
                )
              })}
            </Box>

            <Heading as='h3' mb={2}>
              {t('versions.new-weapons')}
            </Heading>
            <Box mb={2} sx={{ display: 'inline-block' }}>
              {currentVersionNewWeapons.map((weapon) => {
                return <WeaponCard key={weapon.id} weapon={weapon} size='sm' />
              })}
            </Box>

            <Heading as='h3' mb={2}>
              {t('versions.new-stigmata-sets')}
            </Heading>
            <Box mb={2} sx={{ display: 'inline-block' }}>
              {currentVersionNewStigmataSets.map((stigmataSet) => {
                return (
                  <StigmataSetCard
                    key={stigmataSet.id}
                    stigmataSet={stigmataSet}
                    size='sm'
                  />
                )
              })}
            </Box>
          </Box>

          <Heading as='h3' mb={2}>
            {t('versions.weekly-bosses')}
          </Heading>

          <Box sx={{ mb: 3 }}>
            <BossTable versionData={currentVersionData} today={today} />
          </Box>

          <Heading as='h3' mb={2}>
            {t('versions.supply-events')}
          </Heading>
          <Box mb={2}>
            <ScrollContainer
              vertical={false}
              innerRef={supplyGanttChartScrollContainerRef}
            >
              <GanttChart
                scrollTo={scrollSupplyGanttChart}
                items={currentVersionData.supplyEvents.map(
                  (supplyEventData) => {
                    const imgSrc = getIconSrcFromItem(
                      supplyEventData.featured[0]
                    )
                    return {
                      id: `${supplyEventData.duration[0]}/${supplyEventData.duration[1]}/${supplyEventData.name}`,
                      label: (
                        <Flex sx={{ alignItems: 'center' }}>
                          {!supplyEventData.verified && (
                            <Text sx={{ flexShrink: 0 }}>❓</Text>
                          )}
                          {imgSrc != null && (
                            <SquareImageBox
                              size={20}
                              src={imgSrc}
                              alt={supplyEventData.featured[0].id}
                              mr={1}
                            />
                          )}
                          <Text>{supplyEventData.name}</Text>
                        </Flex>
                      ),
                      duration: supplyEventData.duration,
                      row: supplyEventData.track,
                    }
                  }
                )}
                today={today}
                startDate={currentVersionData.duration[0]}
                endDate={
                  currentVersionData.duration[1] != null
                    ? currentVersionData.duration[1]
                    : addDateToDateString(currentVersionData.duration[0], {
                        weeks: 6,
                      })
                }
              />
            </ScrollContainer>
          </Box>
          <Paragraph mb={4}>{t('versions.supply-events-disclaimer')}</Paragraph>
        </Box>
        <Heading as='h2' mb={3}>
          {t('versions.all-versions')}
        </Heading>
        <Box>
          {versionDataList.map((versionData) => {
            return (
              <Box key={versionData.version} mb={2}>
                <Heading as='h3'>
                  <NextLink
                    href={`/honkai3rd/versions/${versionData.version}`}
                    passHref
                  >
                    <Link>
                      {versionData.version} : {versionData.name} (
                      {formatDate(new Date(versionData.duration[0]), 'PP')} -{' '}
                      {versionData.duration[1] != null
                        ? formatDate(new Date(versionData.duration[1]), 'PP')
                        : ''}
                      )
                    </Link>
                  </NextLink>
                </Heading>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Honkai3rdLayout>
  )
}

export async function getStaticProps({ locale }: NextPageContext) {
  const currentVersionData = getCurrentVersion(locale)!

  const currentVersionNewBattlesuits = currentVersionData.newBattlesuits.map(
    (battlesuitId) => {
      return getBattlesuitById(battlesuitId, locale)
    }
  )
  const currentVersionNewWeapons = currentVersionData.newWeapons.map(
    (weaponId) => {
      return getWeaponById(weaponId, locale)
    }
  )

  const currentVersionNewStigmataSets = currentVersionData.newStigmataSets.map(
    (stigmataSetId) => {
      return getStigmataSetBySetId(stigmataSetId, locale)
    }
  )

  return {
    props: {
      currentVersionData,
      currentVersionNewBattlesuits,
      currentVersionNewWeapons,
      currentVersionNewStigmataSets,
      versionDataList: listVersionData(locale),
      ...(await getI18NProps(locale)),
    },
  }
}

export default VersionIndexPage

function getIconSrcFromItem(item: { type: string; id: string }): string | null {
  switch (item.type) {
    case 'battlesuit':
      return `${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${item.id}.png`
    case 'weapon':
      return `${assetsBucketBaseUrl}/honkai3rd/weapons/${item.id}.png`
    case 'stigmata':
      return `${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${item.id}.png`
    case 'elf':
      return `${assetsBucketBaseUrl}/honkai3rd/elfs/icon-${item.id}.png`
    case 'outfit':
      return `${assetsBucketBaseUrl}/honkai3rd/outfits/portrait-${item.id}.webp`
  }
  return null
}
