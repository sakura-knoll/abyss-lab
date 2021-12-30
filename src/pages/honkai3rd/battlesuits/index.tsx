import { Box, Heading, Flex, Text, Link, Button } from '@theme-ui/components'
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

type BattlesuitListItemData = Pick<
  BattlesuitData,
  'id' | 'name' | 'strengths' | 'type' | 'valkyrie'
>

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

const valkyrieFilterOptions = [
  { value: 'all', label: 'All' },
  { value: 'mecha', label: 'Mecha' },
  { value: 'biologic', label: 'Biologic' },
  { value: 'psychic', label: 'Psychic' },
  { value: 'quantum', label: 'Quantum' },
  { value: 'imaginary', label: 'Imaginary' },
  { value: 'kiana', label: 'Kiana' },
  { value: 'mei', label: 'Mei' },
  { value: 'bronya', label: 'Bronya' },
  { value: 'himeko', label: 'Himeko' },
  { value: 'theresa', label: 'Theresa' },
  { value: 'fuhua', label: 'Fu Hua' },
  { value: 'rita', label: 'Rita' },
  { value: 'sakura', label: 'Sakura' },
  { value: 'kallen', label: 'Kallen' },
  { value: 'olenyevas', label: 'Olenyevas' },
  { value: 'seele', label: 'Seele' },
  { value: 'durandal', label: 'Durandal' },
  { value: 'fischl', label: 'Fischl' },
  { value: 'elysia', label: 'Elysia' },
  { value: 'mobius', label: 'Mobius' },
  { value: 'raven', label: 'Raven' },
  { value: 'carole', label: 'Carole' },
]

const BattlesuitListPage = ({ battlesuits }: BattlesuitListPageProps) => {
  const [filter, setFilter] = useState('all')

  const battlesuitList = useMemo(() => {
    return battlesuits.map((battlesuit) => {
      const hidden = isBattlesuitHidden(battlesuit, filter)
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
            transition: 'box-shadow 200ms ease-in-out',
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
              <SquareImageBox
                alt={battlesuit.name}
                src={`/assets/honkai3rd/battlesuits/portrait-${battlesuit.id}.png`}
                size={140}
              />
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
  }, [battlesuits, filter])

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
            {valkyrieFilterOptions.map(({ value, label }) => {
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
        pick(['id', 'name', 'strengths', 'type', 'valkyrie'], battlesuit)
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

function isBattlesuitHidden(
  battlesuit: BattlesuitListItemData,
  filter: string
): boolean {
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
    case 'mecha':
    case 'biologic':
    case 'psychic':
    case 'quantum':
    case 'imaginary':
      return battlesuit.type !== filter
    case 'kiana':
    case 'mei':
    case 'bronya':
    case 'himeko':
    case 'theresa':
    case 'fuhua':
    case 'rita':
    case 'sakura':
    case 'kallen':
    case 'olenyevas':
    case 'seele':
    case 'durandal':
    case 'fischl':
    case 'elysia':
    case 'mobius':
    case 'raven':
    case 'carole':
      return battlesuit.valkyrie !== filter
    default:
    case 'all':
      return false
  }
}
