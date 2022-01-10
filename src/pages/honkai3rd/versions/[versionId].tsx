/** @jsxImportSource theme-ui */
import { Box, Heading, Link, Flex, Text, Paragraph } from '@theme-ui/components'
import { NextPageContext } from 'next'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import GanttChart from '../../../components/organisms/GanttChart'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  getVersion,
  listVersionData,
} from '../../../server/data/honkai3rd/versions'
import { format as formatDate } from 'date-fns'
import { getBattlesuitById } from '../../../server/data/honkai3rd/battlesuits'
import NextLink from 'next/link'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import { getWeaponById } from '../../../server/data/honkai3rd/weapons'
import ScrollContainer from 'react-indiana-drag-scroll'
import { listSupplyEventsByVersion } from '../../../server/data/honkai3rd/supplyEvents'
import { addDateToDateString, getDateString } from '../../../lib/string'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import { SupplyEventData } from '../../../lib/honkai3rd/supplyEvents'
import { VersionData } from '../../../lib/honkai3rd/versions'
import { generateI18NPaths, getI18NProps } from '../../../server/i18n'
import { translate, useTranslation } from '../../../lib/i18n'
import { useRouter } from 'next/router'
import Head from '../../../components/atoms/Head'

interface VersionShowPageProps {
  versionData: VersionData
  battlesuits: BattlesuitData[]
  weapons: WeaponData[]
  supplyEvents: SupplyEventData[]
}

const VersionShowPage = ({
  versionData,
  battlesuits,
  weapons,
  supplyEvents,
}: VersionShowPageProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Box>
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: v${
          versionData.version
        } - Abyss Lab`}
        description={`${t('breadcrumb.honkai-3rd')} ${t(
          'versions.version'
        )} / ${t('versions.new-battlesuits')}: ${battlesuits
          .map((battlesuit) => {
            return translate(
              locale,
              { 'ko-KR': battlesuit.krName },
              battlesuit.name
            )
          })
          .join(',')} / ${t('versions.new-weapons')}: ${weapons
          .map((weapon) => {
            return translate(locale, { 'ko-KR': weapon.krName }, weapon.name)
          })
          .join(',')}`}
      />
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('breadcrumb.honkai-3rd') },
            { href: '/honkai3rd/versions', label: t('breadcrumb.versions') },
            {
              href: `/honkai3rd/versions/${versionData.version}`,
              label: versionData.version,
            },
          ]}
        />
        <Box>
          <Box mb={2}>
            {versionData.previousVersion != null && (
              <NextLink
                href={`/honkai3rd/versions/${versionData.previousVersion}`}
                passHref
              >
                <Link>
                  {t('versions.previous')} (v{versionData.previousVersion})
                </Link>
              </NextLink>
            )}
            {versionData.nextVersion != null && (
              <NextLink
                href={`/honkai3rd/versions/${versionData.nextVersion}`}
                passHref
              >
                <Link>
                  {t('versions.next')} (v{versionData.nextVersion})
                </Link>
              </NextLink>
            )}
          </Box>
          <Heading as='h1'>
            v{versionData.version} :{' '}
            {translate(
              locale,
              { 'ko-KR': versionData.krName },
              versionData.name
            )}
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
            <Box mb={3} sx={{ display: 'inline-block' }}>
              {battlesuits.map((battlesuit) => {
                const battlesuitName = translate(
                  locale,
                  { 'ko-KR': battlesuit.krName },
                  battlesuit.name
                )

                return (
                  <NextLink
                    key={battlesuit.id}
                    href={`/honkai3rd/battlesuits/${battlesuit.id}`}
                    passHref
                  >
                    <Link>
                      <Flex sx={{ alignItems: 'center' }} mb={2}>
                        <SquareImageBox
                          size={40}
                          src={`/assets/honkai3rd/battlesuits/portrait-${battlesuit.id}.png`}
                          alt={`${battlesuitName}`}
                          mr={2}
                        />
                        <Text>{battlesuitName}</Text>
                      </Flex>
                    </Link>
                  </NextLink>
                )
              })}
            </Box>

            <Heading as='h3' mb={2}>
              {t('versions.new-weapons')}
            </Heading>
            <Box mb={3} sx={{ display: 'inline-block' }}>
              {weapons.map((weapon) => {
                const weaponName = translate(
                  locale,
                  { 'ko-KR': weapon.krName },
                  weapon.name
                )
                return (
                  <NextLink
                    key={weapon.id}
                    href={`/honkai3rd/weapons/${weapon.id}`}
                    passHref
                  >
                    <Link>
                      <Flex sx={{ alignItems: 'center' }} mb={2}>
                        <SquareImageBox
                          size={40}
                          src={`/assets/honkai3rd/weapons/${weapon.id}.png`}
                          alt={`${weaponName}`}
                          mr={2}
                        />
                        <Text>{weaponName}</Text>
                      </Flex>
                    </Link>
                  </NextLink>
                )
              })}
            </Box>
          </Box>

          <Heading as='h3' mb={2}>
            {t('versions.supply-events')}
          </Heading>
          <Box mb={2}>
            <ScrollContainer vertical={false}>
              <GanttChart
                items={supplyEvents.map((supplyEventData) => {
                  const imgSrc = getIconSrcFromItem(supplyEventData.featured[0])
                  return {
                    id: supplyEventData.id,
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
                today={getDateString(new Date())}
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
    </Box>
  )
}

export default VersionShowPage

export async function getStaticProps({
  params,
  locale,
}: NextPageContext & { params: { versionId: string } }) {
  const versionData = getVersion(params.versionId)!

  const battlesuits = versionData.newBattlesuits.map((battlesuitId) => {
    return getBattlesuitById(battlesuitId)
  })
  const weapons = versionData.newWeapons.map((weaponId) => {
    return getWeaponById(weaponId)
  })

  const supplyEvents = listSupplyEventsByVersion(versionData.version)

  return {
    props: {
      versionData,
      battlesuits,
      weapons,
      supplyEvents,
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
      return `/assets/honkai3rd/battlesuits/portrait-${item.id}.png`
    case 'weapon':
      return `/assets/honkai3rd/weapons/${item.id}.png`
    case 'stigmata':
      return `/assets/honkai3rd/stigmata/icon-${item.id}.png`
    case 'elf':
      return `/assets/honkai3rd/elfs/icon-${item.id}.png`
    case 'outfit':
      return `/assets/honkai3rd/outfits/${item.id}.png`
  }
  return null
}
