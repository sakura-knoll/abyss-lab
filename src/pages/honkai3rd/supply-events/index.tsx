/** @jsxImportSource theme-ui */
import { Text, Box, Heading, Link, Flex } from '@theme-ui/components'
import NextLink from 'next/link'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { pick, times } from 'ramda'
import {
  listSupplyEvents,
  SupplyEvent,
} from '../../../data/honkai3rd/supply-events'
import { getStigmataById, StigmataData } from '../../../data/honkai3rd/stigmata'
import { getWeaponById, WeaponData } from '../../../data/honkai3rd/weapons'
import {
  BattlesuitData,
  getBattlesuitById,
} from '../../../data/honkai3rd/battlesuits'
import { ElfData, getElfById } from '../../../data/honkai3rd/elfs'
import {
  format as formatDate,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  format,
} from 'date-fns'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import { useMemo } from 'react'

type ObjectMap<T> = { [key: string]: T }
type StigmataObjectMap = ObjectMap<Pick<StigmataData, 'id' | 'name'>>
type WeaponObjectMap = ObjectMap<Pick<WeaponData, 'id' | 'name'>>
type BattlesuitObjectMap = ObjectMap<Pick<BattlesuitData, 'id' | 'name'>>
type ElfObjectMap = ObjectMap<Pick<ElfData, 'id' | 'name'>>

interface SupplyEventListPageProps {
  supplyEventList: Pick<
    SupplyEvent,
    'id' | 'version' | 'name' | 'featured' | 'duration' | 'track' | 'verified'
  >[]
  stigmataObjectMap: StigmataObjectMap
  weaponObjectMap: WeaponObjectMap
  battlesuitObjectMap: BattlesuitObjectMap
  elfObjectMap: ElfObjectMap
}

const SupplyEventListPage = ({
  supplyEventList,
  battlesuitObjectMap,
  weaponObjectMap,
  stigmataObjectMap,
  elfObjectMap,
}: SupplyEventListPageProps) => {
  const startDate = new Date('2021-12-02')
  const endDate = new Date('2022-01-13')
  const todayDate = new Date(formatDate(new Date(), 'yyyy-MM-dd'))

  const totalDays = differenceInCalendarDays(endDate, startDate)
  const totalWeeks = differenceInCalendarWeeks(endDate, startDate)

  const totalRow = useMemo(() => {
    return supplyEventList.reduce((max, supplyEvent) => {
      return supplyEvent.track > max ? supplyEvent.track : max
    }, 1)
  }, [])

  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/supply-events', label: 'Supply Events' },
          ]}
        />

        <Heading as='h1' mb={3}>
          Supply Events
        </Heading>

        <Box mb={3} sx={{ width: totalWeeks * 280 }}>
          <Flex
            sx={{
              marginLeft: -20,
            }}
          >
            {times((index) => {
              const weekNumber = index + 1
              return (
                <Box
                  key={`week-${weekNumber}`}
                  sx={{
                    width: 280,
                    textAlign: 'center',
                    fontWeight: 700,
                  }}
                >
                  Week {weekNumber}
                </Box>
              )
            }, totalWeeks)}
          </Flex>
          <Box
            sx={{
              position: 'relative',
              height: totalRow * 50 + 40,
              borderBottomStyle: 'solid',
              borderBottomWidth: 1,
              borderBottomColor: 'gray.5',
              borderTopStyle: 'solid',
              borderTopWidth: 1,
              borderTopColor: 'gray.5',
            }}
          >
            {times((index) => {
              return (
                <Box
                  sx={{
                    position: 'absolute',
                    height: totalRow * 50 + 40,
                    borderRightStyle: 'solid',
                    borderRightWidth: 1,
                    borderRightColor: index % 7 === 6 ? 'gray.5' : 'gray.3',
                    left: (index + 1) * 40 - 1 - 20,
                  }}
                />
              )
            }, totalDays)}
            <Box
              sx={{
                boxSizing: 'border-box',
                position: 'absolute',
                width: 40,
                height: totalRow * 50 + 40,
                backgroundColor: 'blue.5',
                borderStyle: 'solid',
                borderColor: 'blue.7',
                opacity: 0.2,
                zIndex: 20,
                borderRadius: 4,
                left: differenceInCalendarDays(todayDate, startDate) * 40 - 20,
                pointerEvents: 'none',
              }}
            />

            <Text
              sx={{
                position: 'absolute',
                color: 'blue.7',
                transform: 'rotate(90deg)',
                zIndex: 21,
                top: 150,
                left:
                  differenceInCalendarDays(new Date(todayDate), startDate) *
                    40 -
                  150,
                width: 300,
                pointerEvents: 'none',
              }}
            >
              Today ({format(todayDate, 'P')})
            </Text>

            {supplyEventList
              .slice()
              .reverse()
              .map((supplyEvent) => {
                const offset =
                  differenceInCalendarDays(
                    new Date(supplyEvent.duration[0]),
                    startDate
                  ) * 40
                const length =
                  differenceInCalendarDays(
                    new Date(supplyEvent.duration[1]),
                    new Date(supplyEvent.duration[0])
                  ) * 40

                const featuredIconProps = getIconPropsOfItem(
                  supplyEvent.featured[0],
                  {
                    battlesuitObjectMap,
                    weaponObjectMap,
                    stigmataObjectMap,
                    elfObjectMap,
                  }
                )
                return (
                  <Flex
                    key={supplyEvent.id}
                    py={2}
                    px={3}
                    sx={{
                      boxSizing: 'border-box',
                      position: 'absolute',
                      borderColor: 'gray.5',
                      borderWidth: 1,
                      borderStyle: 'solid',
                      backgroundColor: 'white',
                      width: length,
                      left: offset,
                      top: (supplyEvent.track - 1) * 50 + 20,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      height: 40,
                      borderRadius: 40,
                      fontWeight: 700,
                      zIndex: 10,
                      '&:hover': {
                        minWidth: length,
                        width: 'inherit',
                        zIndex: 25,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'box-shadow 200ms ease-in-out',
                      },
                    }}
                  >
                    {featuredIconProps != null && (
                      <SquareImageBox
                        size={20}
                        src={featuredIconProps.src}
                        alt={featuredIconProps.alt}
                        mr={2}
                      />
                    )}
                    <Text
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {supplyEvent.name}
                      {!supplyEvent.verified && ' (❓)'}
                    </Text>
                  </Flex>
                )
              })}
          </Box>
        </Box>
        <Box>
          {supplyEventList.map((supplyEvent) => {
            return (
              <Box key={supplyEvent.id}>
                <Box mb={3}>
                  <Heading>
                    <NextLink
                      href={`/honkai3rd/supply-events/${supplyEvent.id}`}
                      key={supplyEvent.id}
                      passHref={true}
                    >
                      <Link>
                        [{supplyEvent.version}] {supplyEvent.name} (
                        {supplyEvent.duration.join(' ~ ')})
                      </Link>
                    </NextLink>
                  </Heading>

                  <Flex>
                    {supplyEvent.featured.map((item) => {
                      const props = getIconPropsOfItem(item, {
                        battlesuitObjectMap,
                        weaponObjectMap,
                        stigmataObjectMap,
                        elfObjectMap,
                      })
                      if (props == null) {
                        return (
                          <Text>
                            {item.type} : {item.id}
                          </Text>
                        )
                      }
                      return (
                        <SquareImageBox
                          key={`${item.type}/${item.id}`}
                          mr={2}
                          size={50}
                          src={props.src}
                          alt={props.alt}
                        />
                      )
                    })}
                  </Flex>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default SupplyEventListPage

export async function getStaticProps() {
  const supplyEventList = listSupplyEvents()

  const stigmataObjectMap: {
    [key: string]: Pick<StigmataData, 'id' | 'name'>
  } = {}
  const weaponObjectMap: {
    [key: string]: Pick<WeaponData, 'id' | 'name'>
  } = {}
  const battlesuitObjectMap: {
    [key: string]: Pick<BattlesuitData, 'id' | 'name'>
  } = {}
  const elfObjectMap: {
    [key: string]: Pick<ElfData, 'id' | 'name'>
  } = {}

  supplyEventList.forEach((supplyEvent) => {
    supplyEvent.featured.forEach((item) => {
      switch (item.type) {
        case 'battlesuit':
          const battlesuit = getBattlesuitById(item.id)
          if (battlesuit != null) {
            battlesuitObjectMap[battlesuit.id] = pick(
              ['id', 'name'],
              battlesuit
            )
          }
          break
        case 'weapon':
          const weapon = getWeaponById(item.id)
          if (weapon != null) {
            weaponObjectMap[weapon.id] = pick(['id', 'name'], weapon)
          }
          break
        case 'stigmata':
          const stigmata = getStigmataById(item.id)
          if (stigmata != null) {
            stigmataObjectMap[stigmata.id] = pick(['id', 'name'], stigmata)
          }
          break
        case 'elf':
          const elf = getElfById(item.id)
          if (elf != null) {
            elfObjectMap[elf.id] = pick(['id', 'name'], elf)
          }
          break
      }
    })
  })
  return {
    props: {
      supplyEventList: supplyEventList.map((supplyEvent) => {
        return pick(
          [
            'id',
            'version',
            'name',
            'featured',
            'duration',
            'track',
            'verified',
          ],
          supplyEvent
        )
      }),
      battlesuitObjectMap,
      weaponObjectMap,
      stigmataObjectMap,
      elfObjectMap,
    },
    revalidate: true,
  }
}

function getIconPropsOfItem(
  item: { type: string; id: string },
  {
    battlesuitObjectMap,
    weaponObjectMap,
    stigmataObjectMap,
    elfObjectMap,
  }: {
    stigmataObjectMap: StigmataObjectMap
    weaponObjectMap: WeaponObjectMap
    battlesuitObjectMap: BattlesuitObjectMap
    elfObjectMap: ElfObjectMap
  }
): { src: string; alt: string } | null {
  switch (item.type) {
    case 'battlesuit':
      const battlesuit = battlesuitObjectMap[item.id]
      if (battlesuit != null) {
        return {
          src: `/assets/honkai3rd/battlesuits/portrait-${battlesuit.id}.png`,
          alt: battlesuit.name,
        }
      }
    case 'weapon':
      const weapon = weaponObjectMap[item.id]
      if (weapon != null) {
        return {
          src: `/assets/honkai3rd/weapons/${weapon.id}.png`,
          alt: weapon.name,
        }
      }
    case 'stigmata':
      const stigmata = stigmataObjectMap[item.id]
      if (stigmata != null) {
        return {
          src: `/assets/honkai3rd/stigmata/icon-${stigmata.id}.png`,
          alt: stigmata.name,
        }
      }
    case 'elf':
      const elf = elfObjectMap[item.id]
      if (elf != null) {
        return {
          src: `/assets/honkai3rd/elfs/icon-${elf.id}.png`,
          alt: elf.name,
        }
      }
  }
  return null
}
