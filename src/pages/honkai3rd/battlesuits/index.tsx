import { Box, Heading, Flex } from '@theme-ui/components'
import { pick } from 'ramda'
import { useMemo } from 'react'
import FilterButton from '../../../components/atoms/FilterButton'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  BattlesuitData,
  listBattlesuits,
} from '../../../server/data/honkai3rd/battlesuits'
import { battlesuitStrengths } from '../../../lib/safeData'
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

const valkyrieFilterOptions = [
  { value: 'all', label: 'All' },
  { value: 'mecha', icon: 'type-icons/mecha', label: 'Mecha' },
  { value: 'biologic', icon: 'type-icons/biologic', label: 'Biologic' },
  { value: 'psychic', icon: 'type-icons/psychic', label: 'Psychic' },
  { value: 'quantum', icon: 'type-icons/quantum', label: 'Quantum' },
  { value: 'imaginary', icon: 'type-icons/imaginary', label: 'Imaginary' },
  { value: 'kiana', icon: 'valkyrie-icons/kiana', label: 'Kiana' },
  { value: 'mei', icon: 'valkyrie-icons/mei', label: 'Mei' },
  { value: 'bronya', icon: 'valkyrie-icons/bronya', label: 'Bronya' },
  { value: 'himeko', icon: 'valkyrie-icons/himeko', label: 'Himeko' },
  { value: 'theresa', icon: 'valkyrie-icons/theresa', label: 'Theresa' },
  { value: 'fuhua', icon: 'valkyrie-icons/fuhua', label: 'Fu Hua' },
  { value: 'rita', icon: 'valkyrie-icons/rita', label: 'Rita' },
  { value: 'sakura', icon: 'valkyrie-icons/sakura', label: 'Sakura' },
  { value: 'kallen', icon: 'valkyrie-icons/kallen', label: 'Kallen' },
  { value: 'olenyevas', icon: 'valkyrie-icons/olenyevas', label: 'Olenyevas' },
  { value: 'seele', icon: 'valkyrie-icons/seele', label: 'Seele' },
  { value: 'durandal', icon: 'valkyrie-icons/durandal', label: 'Durandal' },
  { value: 'fischl', icon: 'valkyrie-icons/fischl', label: 'Fischl' },
  { value: 'elysia', icon: 'valkyrie-icons/elysia', label: 'Elysia' },
  { value: 'mobius', icon: 'valkyrie-icons/mobius', label: 'Mobius' },
  { value: 'raven', icon: 'valkyrie-icons/raven', label: 'Raven' },
  { value: 'carole', icon: 'valkyrie-icons/carole', label: 'Carole' },
]

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
