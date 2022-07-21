/** @jsxImportSource theme-ui */
import { Box, Heading, Flex, Text, Paragraph } from '@theme-ui/components'
import { NextPageContext } from 'next'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import GanttChart from '../../../components/organisms/GanttChart'
import {
  getVersion,
  listVersionData,
} from '../../../server/data/honkai3rd/versions'
import { format as formatDate } from 'date-fns'
import { getBattlesuitById } from '../../../server/data/honkai3rd/battlesuits'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import { getWeaponById } from '../../../server/data/honkai3rd/weapons'
import ScrollContainer from 'react-indiana-drag-scroll'
import { addDateToDateString, getDateString } from '../../../lib/string'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import { VersionData } from '../../../lib/honkai3rd/versions'
import { generateI18NPaths, getI18NProps } from '../../../server/i18n'
import { useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import PageLink from '../../../components/atoms/PageLink'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { useEffect, useState } from 'react'
import BossTable from '../../../components/organisms/BossTable'
import StigmataSetCard from '../../../components/molecules/StigmataSetCard'
import WeaponCard from '../../../components/molecules/WeaponCard'
import BattlesuitCard from '../../../components/molecules/BattlesuitCard'
import { getStigmataSetBySetId } from '../../../server/data/honkai3rd/stigmata'
import { StigmataSet } from '../../../lib/honkai3rd/stigmata'

interface VersionShowPageProps {
  versionData: VersionData
  battlesuits: BattlesuitData[]
  weapons: WeaponData[]
  stigmataSets: StigmataSet[]
}

const VersionShowPage = ({
  versionData,
  battlesuits,
  weapons,
  stigmataSets,
}: VersionShowPageProps) => {
  const { t } = useTranslation()
  const [today, setToday] = useState<Date | null>(null)
  useEffect(() => {
    setToday(new Date(getDateString(new Date())))
  }, [])
  return (
    <Honkai3rdLayout>
      <Head
        title={`v${versionData.version} ${versionData.name} - ${t(
          'common.honkai-3rd'
        )} - ${t('common.abyss-lab')}`}
        description={`${t('common.honkai-3rd')} ${t('versions.version')} ${
          versionData.name
        } / ${t('versions.new-battlesuits')}: ${battlesuits
          .map((battlesuit) => {
            return battlesuit.name
          })
          .join(',')} / ${t('versions.new-weapons')}: ${weapons
          .map((weapon) => {
            return weapon.name
          })
          .join(',')}`}
      />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/versions', label: t('common.versions') },
            {
              href: `/honkai3rd/versions/${versionData.version}`,
              label: versionData.version,
            },
          ]}
        />
        <Box>
          <Box mb={2}>
            {versionData.previousVersion != null && (
              <PageLink
                href={`/honkai3rd/versions/${versionData.previousVersion}`}
                mr={2}
              >
                {t('versions.previous')} (v{versionData.previousVersion})
              </PageLink>
            )}
            {versionData.nextVersion != null && (
              <PageLink href={`/honkai3rd/versions/${versionData.nextVersion}`}>
                {t('versions.next')} (v{versionData.nextVersion})
              </PageLink>
            )}
          </Box>
          <Heading as='h1'>
            v{versionData.version} : {versionData.name}
          </Heading>
          <Box mb={4}>
            {formatDate(new Date(versionData.duration[0]), 'PP')} -{' '}
            {versionData.duration[1] != null
              ? formatDate(new Date(versionData.duration[1]), 'PP')
              : ''}
          </Box>

          <Box>
            <Heading as='h3' mb={2}>
              {t('versions.new-battlesuits')}
            </Heading>
            <Box mb={2} sx={{ display: 'inline-block' }}>
              {battlesuits.map((battlesuit) => {
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
              {weapons.map((weapon) => {
                return <WeaponCard key={weapon.id} weapon={weapon} size='sm' />
              })}
            </Box>

            <Heading as='h3' mb={2}>
              {t('versions.new-stigmata-sets')}
            </Heading>
            <Box mb={2} sx={{ display: 'inline-block' }}>
              {stigmataSets.map((stigmataSet) => {
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
            <BossTable versionData={versionData} today={today} />
          </Box>

          <Heading as='h3' mb={2}>
            {t('versions.supply-events')}
          </Heading>
          <Box mb={2}>
            <ScrollContainer vertical={false}>
              <GanttChart
                items={versionData.supplyEvents.map((supplyEventData) => {
                  const imgSrc = getIconSrcFromItem(supplyEventData.featured[0])
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
                })}
                today={today}
                startDate={versionData.duration[0]}
                endDate={
                  versionData.duration[1] != null
                    ? versionData.duration[1]
                    : addDateToDateString(versionData.duration[0], {
                        weeks: 6,
                      })
                }
              />
            </ScrollContainer>
          </Box>
          <Paragraph mb={4}>{t('versions.supply-events-disclaimer')}</Paragraph>
        </Box>
      </Box>
    </Honkai3rdLayout>
  )
}

export default VersionShowPage

export async function getStaticProps({
  params,
  locale,
}: NextPageContext & { params: { versionId: string } }) {
  const versionData = getVersion(params.versionId, locale)!

  const battlesuits = versionData.newBattlesuits.map((battlesuitId) => {
    return getBattlesuitById(battlesuitId, locale)
  })
  const weapons = versionData.newWeapons.map((weaponId) => {
    return getWeaponById(weaponId, locale)
  })
  const stigmataSets = versionData.newStigmataSets.map((stigmataSetId) => {
    return getStigmataSetBySetId(stigmataSetId, locale)
  })

  return {
    props: {
      versionData,
      battlesuits,
      weapons,
      stigmataSets,
      ...(await getI18NProps(locale)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: generateI18NPaths(
      listVersionData().map((versionData) => {
        return {
          params: {
            versionId: versionData.version.toString(),
          },
        }
      })
    ),
    fallback: false,
  }
}

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
