import { Box, Heading, Flex } from '@theme-ui/components'
import { pick } from 'ramda'
import { useMemo } from 'react'
import FilterButton from '../../../components/atoms/FilterButton'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { listBattlesuits } from '../../../server/data/honkai3rd/battlesuits'
import {
  BattlesuitData,
  battlesuitStrengths,
  battlesuitTypes,
  valkyries,
} from '../../../lib/honkai3rd/battlesuits'
import BattlesuitCard from '../../../components/molecules/BattlesuitCard'
import { useRouter } from 'next/router'

type BattlesuitListItemData = Pick<
  BattlesuitData,
  'id' | 'name' | 'strengths' | 'type' | 'valkyrie'
>

interface BattlesuitListPageProps {
  battlesuits: BattlesuitListItemData[]
}

const featureFilterOptions: { value: string; label: string; icon?: string }[] =
  [{ value: 'all', label: 'All' }, ...battlesuitStrengths]

const valkyrieFilterOptions: { value: string; label: string; icon?: string }[] =
  [{ value: 'all', label: 'All' }, ...battlesuitTypes, ...valkyries]

const BattlesuitListPage = ({ battlesuits }: BattlesuitListPageProps) => {
  const { query } = useRouter()

  const filter = useMemo(() => {
    if (query.filter == null) {
      return 'all'
    }

    return typeof query.filter === 'string' ? query.filter : query.filter[0]
  }, [query])

  const battlesuitList = useMemo(() => {
    return battlesuits.map((battlesuit) => {
      const hidden = isBattlesuitHidden(battlesuit, filter)
      return (
        <BattlesuitCard
          key={battlesuit.id}
          battlesuit={battlesuit}
          hidden={hidden}
        />
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
            {featureFilterOptions.map(({ value, label, icon }) => {
              return (
                <FilterButton
                  key={value}
                  active={value === filter}
                  value={value}
                  label={label}
                  icon={icon}
                  m={1}
                />
              )
            })}
          </Flex>

          <Heading as='h3'>Filter by Valkyries</Heading>
          <Flex mb={2} sx={{ flexWrap: 'wrap' }}>
            {valkyrieFilterOptions.map(({ value, label, icon }) => {
              return (
                <FilterButton
                  key={value}
                  active={value === filter}
                  value={value}
                  label={label}
                  icon={icon}
                  m={1}
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

function isBattlesuitHidden(
  battlesuit: BattlesuitListItemData,
  filter: string
): boolean {
  switch (filter) {
    case 'physical':
    case 'fire-dmg':
    case 'ice-dmg':
    case 'lightning-dmg':
    case 'freeze':
    case 'paralyze':
    case 'stun':
    case 'ignite':
    case 'bleed':
    case 'heavy-atk':
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
