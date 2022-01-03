/** @jsxImportSource theme-ui */
import { Box, Flex, Heading, Link, Text } from '@theme-ui/components'
import NextLink from 'next/link'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import GanttChart from '../../../components/organisms/GanttChart'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
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
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/versions', label: 'Versions' },
          ]}
        />
        <Box mb={4}>
          <Box mb={2}>
            {currentVersionData.previousVersion != null && (
              <NextLink
                href={`/honkai3rd/versions/${currentVersionData.previousVersion}`}
                passHref
              >
                <Link>Previous (v{currentVersionData.previousVersion})</Link>
              </NextLink>
            )}
            {currentVersionData.nextVersion != null && (
              <NextLink
                href={`/honkai3rd/versions/${currentVersionData.nextVersion}`}
                passHref
              >
                <Link>Next (v{currentVersionData.nextVersion})</Link>
              </NextLink>
            )}
          </Box>

          <Heading as='h1'>
            v{currentVersionData.version} : {currentVersionData.name}{' '}
            <small>(Current Version)</small>
          </Heading>
          <Box mb={4}>
            {formatDate(new Date(currentVersionData.duration[0]), 'PP')} -{' '}
            {currentVersionData.duration[1] != null
              ? formatDate(new Date(currentVersionData.duration[1]), 'PP')
              : ''}
          </Box>

          <Box>
            <Heading as='h3' mb={2}>
              New Battlesuits
            </Heading>
            <Box mb={3} sx={{ display: 'inline-block' }}>
              {currentVersionNewBattlesuits.map((battlesuit) => {
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
                          alt={`${battlesuit.name}`}
                          mr={2}
                        />
                        <Text>{battlesuit.name}</Text>
                      </Flex>
                    </Link>
                  </NextLink>
                )
              })}
            </Box>

            <Heading as='h3' mb={2}>
              New Weapons
            </Heading>
            <Box mb={3} sx={{ display: 'inline-block' }}>
              {currentVersionNewWeapons.map((weapon) => {
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
                          alt={`${weapon.name}`}
                          mr={2}
                        />
                        <Text>{weapon.name}</Text>
                      </Flex>
                    </Link>
                  </NextLink>
                )
              })}
            </Box>
          </Box>

          <Heading as='h3' mb={2}>
            Supply Events
          </Heading>
          <Box mb={4}>
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
          <Box>
            <NextLink
              href={`/honkai3rd/versions/${currentVersionData.version}`}
              passHref
            >
              <Link>Learn more...</Link>
            </NextLink>
          </Box>
        </Box>

        <Heading as='h2' mb={3}>
          All Versions
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
    </Box>
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
