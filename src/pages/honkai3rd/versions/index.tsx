/** @jsxImportSource theme-ui */
import { Box, Flex, Heading, Link, Text } from '@theme-ui/components'
import { format } from 'date-fns'
import NextLink from 'next/link'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import GanttChart from '../../../components/organisms/GanttChart'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  BattlesuitData,
  getBattlesuitById,
} from '../../../data/honkai3rd/battlesuits'
import {
  listSupplyEventsByVersion,
  SupplyEventData as SupplyEventData,
} from '../../../data/honkai3rd/supply-events'
import {
  getCurrentVersion,
  listVersionData,
  VersionData,
} from '../../../data/honkai3rd/versions'
import { getWeaponById, WeaponData } from '../../../data/honkai3rd/weapons'

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
        <Box mb={3}>
          <Heading as='h2' mb={4}>
            v{currentVersionData.version} : {currentVersionData.name}
            <br />
            <small>(Current Version)</small>
          </Heading>

          <Box>
            <Heading as='h3'>New Battlesuits</Heading>
            <Box mb={4}>
              {currentVersionNewBattlesuits.map((battlesuit) => {
                return (
                  <NextLink
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

            <Heading as='h3'>New Weapons</Heading>
            <Box mb={4}>
              {currentVersionNewWeapons.map((weapon) => {
                return (
                  <NextLink href={`/honkai3rd/weapons/${weapon.id}`} passHref>
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

          <Heading as='h3'>Supply Events</Heading>
          <Box mb={4}>
            <GanttChart
              items={currentVersionSupplyEvents.map((supplyEventData) => {
                const imgSrc = getIconSrcFromItem(supplyEventData.featured[0])
                return {
                  id: supplyEventData.id,
                  label: (
                    <Flex sx={{ alignItems: 'center' }}>
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
              today={format(new Date(), 'yyyy-MM-dd')}
              startDate={currentVersionData.duration[0]}
              endDate={currentVersionData.duration[1]}
            />
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

        <Heading as='h2'>All Versions</Heading>
        <Box>
          {versionDataList.map((versionData) => {
            return (
              <Box key={versionData.version}>
                <Heading as='h3'>
                  <NextLink
                    href={`/honkai3rd/versions/${versionData.version}`}
                    passHref
                  >
                    <Link>
                      {versionData.version} : {versionData.name} (
                      {format(new Date(versionData.duration[0]), 'yyyy/MM/dd')}-
                      {versionData.duration[1] != null
                        ? format(
                            new Date(versionData.duration[1]),
                            'yyyy/MM/dd'
                          )
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

export async function getStaticProps() {
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
  }
  return null
}
