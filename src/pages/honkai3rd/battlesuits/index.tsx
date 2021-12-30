import { Box, Heading, Flex, Text, Link, Button } from '@theme-ui/components'
import Image from 'next/image'
import NextLink from 'next/link'
import { pick } from 'ramda'
import React, { useCallback, useMemo, useState } from 'react'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  BattlesuitData,
  listBattlesuits,
} from '../../../data/honkai3rd/battlesuits'

type BattlesuitListItemData = Pick<BattlesuitData, 'id' | 'name' | 'strengths'>

interface BattlesuitListPageProps {
  battlesuits: BattlesuitListItemData[]
}

const featureFilterOptions = [
  { value: 'all', label: 'All' },
  { value: 'physical', label: 'Physical' },
  { value: 'fire dmg', label: 'Fire DMG' },
  { value: 'ice dmg', label: 'Ice DMG' },
  { value: 'lightning dmg', label: 'Lightning DMG' },
  { value: 'freeze', label: 'Freeze' },
  { value: 'paralyze', label: 'Paralyze' },
  { value: 'stun', label: 'Stun' },
  { value: 'ignite', label: 'Ignite' },
  { value: 'bleed', label: 'Bleed' },
  { value: 'heavy atk', label: 'Heavy ATK' },
  { value: 'weaken', label: 'Weaken' },
  { value: 'impair', label: 'Impair' },
  { value: 'time mastery', label: 'Time Mastery' },
  { value: 'gather', label: 'Gather' },
  { value: 'heal', label: 'Heal' },
  { value: 'fast atk', label: 'Fast ATK' },
  { value: 'burst', label: 'Burst' },
  { value: 'aerial', label: 'Aerial' },
]

const BattlesuitListPage = ({ battlesuits }: BattlesuitListPageProps) => {
  const [filter, setFilter] = useState('all')

  const isBattlesuitHidden = useCallback(
    (battlesuit: BattlesuitListItemData) => {
      switch (filter) {
        case 'physical':
        case 'fire dmg':
        case 'ice dmg':
        case 'lightning dmg':
        case 'freeze':
        case 'paralyze':
        case 'stun':
        case 'ignite':
        case 'bleed':
        case 'heavy atk':
        case 'weaken':
        case 'impair':
        case 'time mastery':
        case 'gather':
        case 'heal':
        case 'fast atk':
        case 'burst':
        case 'aerial':
          return !battlesuit.strengths.some((strength) => strength === filter)
        default:
        case 'all':
          return false
      }
    },
    [filter]
  )

  const battlesuitList = useMemo(() => {
    return battlesuits.map((battlesuit) => {
      const hidden = isBattlesuitHidden(battlesuit)
      return (
        <Box
          key={battlesuit.id}
          className={hidden ? 'hidden' : ''}
          sx={{
            width: '160px',
            padding: 2,
            margin: 1,
            borderColor: 'gray.3',
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 8,
            transition:
              'box-shadow 200ms ease-in-out, opacity 200ms ease-in-out',
            '&:hover': {
              borderColor: 'gray.3',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
            '&.hidden': {
              display: 'none',
            },
          }}
        >
          <NextLink
            href={`/honkai3rd/battlesuits/${battlesuit.id}`}
            key={battlesuit.id}
            passHref={true}
          >
            <Link>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  width: '140px',
                  height: '140px',
                  borderRadius: 4,
                }}
              >
                <Image
                  alt={battlesuit.name}
                  layout='fill'
                  objectFit='cover'
                  src={`/assets/honkai3rd/battlesuits/portrait-${battlesuit.id}.png`}
                />
              </Box>
              <Box
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                }}
              >
                <Text>{battlesuit.name}</Text>
              </Box>
            </Link>
          </NextLink>
        </Box>
      )
    })
  }, [battlesuits, isBattlesuitHidden])

  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/battlesuits', label: 'Battlesuits' },
          ]}
        />

        <Heading as='h1'>Battlesuits</Heading>
        <Box>
          <Heading as='h3'>Filter by Features</Heading>
          <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
            {featureFilterOptions.map(({ value, label }) => {
              return (
                <FilterButton
                  active={value === filter}
                  setFilter={setFilter}
                  value={value}
                  label={label}
                />
              )
            })}
          </Flex>

          <Heading as='h3'>Filter by Valkyries</Heading>
          <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
            <FilterButton setFilter={setFilter} value='all' label='ALL' />
            <FilterButton setFilter={setFilter} value='mecha' label='MECHA' />
            <FilterButton setFilter={setFilter} value='bio' label='BIO' />
            <FilterButton setFilter={setFilter} value='psy' label='PSY' />
            <FilterButton setFilter={setFilter} value='qua' label='QUA' />
            <FilterButton setFilter={setFilter} value='img' label='IMG' />
            <FilterButton setFilter={setFilter} value='kiana' label='Kiana' />
            <FilterButton setFilter={setFilter} value='mei' label='Mei' />
            <FilterButton setFilter={setFilter} value='bronya' label='Bronya' />
            <FilterButton setFilter={setFilter} value='himeko' label='Himeko' />
            <FilterButton
              setFilter={setFilter}
              value='theresa'
              label='Theresa'
            />
            <FilterButton setFilter={setFilter} value='fu hua' label='Fu Hua' />
            <FilterButton setFilter={setFilter} value='rita' label='Rita' />
            <FilterButton setFilter={setFilter} value='sakura' label='Sakura' />
            <FilterButton setFilter={setFilter} value='kallen' label='Kallen' />
            <FilterButton
              setFilter={setFilter}
              value='olenyevas'
              label='Olenyevas'
            />
            <FilterButton setFilter={setFilter} value='seele' label='Seele' />
            <FilterButton
              setFilter={setFilter}
              value='durandal'
              label='Durandal'
            />
            <FilterButton setFilter={setFilter} value='fischl' label='Fischl' />
            <FilterButton setFilter={setFilter} value='elysia' label='Elysia' />
            <FilterButton setFilter={setFilter} value='mobius' label='Mobius' />
            <FilterButton setFilter={setFilter} value='raven' label='Raven' />
            <FilterButton setFilter={setFilter} value='carole' label='Carole' />
          </Flex>
        </Box>

        <Flex
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {battlesuitList}
        </Flex>
      </Box>
    </Box>
  )
}

export default BattlesuitListPage

export async function getStaticProps() {
  return {
    props: {
      battlesuits: listBattlesuits().map((battlesuit) =>
        pick(['id', 'name', 'strengths'], battlesuit)
      ),
    },
  }
}

interface FilterButtonProps {
  active?: boolean
  icon?: string
  label: string
  setFilter: (filter: string) => void
  value: string
}

const FilterButton = ({
  active = false,
  setFilter,
  icon,
  label,
  value,
}: FilterButtonProps) => {
  const selectFilter = useCallback(() => {
    setFilter(value)
  }, [setFilter, value])
  return (
    <Button
      m={1}
      py={1}
      px={2}
      onClick={selectFilter}
      className={active ? 'active' : ''}
    >
      {icon != null && (
        <SquareImageBox
          src={`/assets/honkai3rd/icons/${icon}.png`}
          alt={label}
          size={30}
        />
      )}
      {label}
    </Button>
  )
}
