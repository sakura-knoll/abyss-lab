/** @jsxImportSource theme-ui */
import { Box, Flex, Heading, Link, Text, Paragraph } from '@theme-ui/components'
import NextLink from 'next/link'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import GanttChart from '../../../components/organisms/GanttChart'
import { getBattlesuitById } from '../../../server/data/honkai3rd/battlesuits'
import { listSupplyEventsByVersion } from '../../../server/data/honkai3rd/supplyEvents'
import {
  getCurrentVersion,
  listVersionData,
} from '../../../server/data/honkai3rd/versions'
import { getWeaponById } from '../../../server/data/honkai3rd/weapons'
import { addDateToDateString, getDateString } from '../../../lib/string'
import ScrollContainer from 'react-indiana-drag-scroll'
import { format as formatDate } from 'date-fns'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import { VersionData } from '../../../lib/honkai3rd/versions'
import { SupplyEventData } from '../../../lib/honkai3rd/supplyEvents'
import { getI18NProps } from '../../../server/i18n'
import { NextPageContext } from 'next'
import { useTranslation, translate } from '../../../lib/i18n'
import { useRouter } from 'next/router'
import Head from '../../../components/atoms/Head'
import PageLink from '../../../components/atoms/PageLink'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'

interface VersionIndexPageProps {
  versionDataList: VersionData[]
  currentVersionData: VersionData
  currentVersionNewBattlesuits: BattlesuitData[]
  currentVersionNewWeapons: WeaponData[]
  currentVersionSupplyEvents: SupplyEventData[]
}

const VersionIndexPage = ({
  currentVersionData,
  currentVersionNewBattlesuits,
  versionDataList,
  currentVersionNewWeapons,
  currentVersionSupplyEvents,
}: VersionIndexPageProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

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
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/versions', label: t('common.versions') },
          ]}
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
            v{currentVersionData.version} :{' '}
            {translate(
              locale,
              { 'ko-KR': currentVersionData.krName },
              currentVersionData.name
            )}{' '}
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
            <Box mb={3} sx={{ display: 'inline-block' }}>
              {currentVersionNewBattlesuits.map((battlesuit) => {
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
                          src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${battlesuit.id}.png`}
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
              {currentVersionNewWeapons.map((weapon) => {
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
                          src={`${assetsBucketBaseUrl}/honkai3rd/weapons/${weapon.id}.png`}
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
                items={currentVersionSupplyEvents.map((supplyEventData) => {
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
                      {versionData.version} :{' '}
                      {translate(
                        locale,
                        { 'ko-KR': versionData.krName },
                        versionData.name
                      )}{' '}
                      ({formatDate(new Date(versionData.duration[0]), 'PP')} -{' '}
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
  const currentVersionData = getCurrentVersion()!

  const currentVersionNewBattlesuits = currentVersionData.newBattlesuits.map(
    (battlesuitId) => {
      return getBattlesuitById(battlesuitId)
    }
  )
  const currentVersionNewWeapons = currentVersionData.newWeapons.map(
    (weaponId) => {
      return getWeaponById(weaponId)
    }
  )

  const currentVersionSupplyEvents = listSupplyEventsByVersion(
    currentVersionData.version
  )

  return {
    props: {
      currentVersionData,
      currentVersionNewBattlesuits,
      currentVersionNewWeapons,
      currentVersionSupplyEvents,
      versionDataList: listVersionData(),
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
