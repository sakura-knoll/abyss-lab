/** @jsxImportSource theme-ui */
import { Box, Heading, Flex } from '@theme-ui/components'
import { pick } from 'ramda'
import StigmataCard from '../../../components/molecules/StigmataCard'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { StigmataData } from '../../../lib/honkai3rd/stigmata'
import { listStigmata } from '../../../server/data/honkai3rd/stigmata'

interface StigmataListPageProps {
  stigmataDataList: Pick<StigmataData, 'id' | 'name' | 'rarity'>[]
}

const StigmataListPage = ({ stigmataDataList }: StigmataListPageProps) => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/stigmata', label: 'Stigmata' },
          ]}
        />

        <Heading as='h1'>Stigmata</Heading>

        <Flex
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {stigmataDataList.map((stigmata) => {
            return <StigmataCard key={stigmata.id} stigmata={stigmata} />
          })}
        </Flex>
      </Box>
    </Box>
  )
}

export default StigmataListPage

export async function getStaticProps() {
  return {
    props: {
      stigmataDataList: listStigmata().map((stigmata) =>
        pick(['id', 'name', 'rarity'], stigmata)
      ),
    },
  }
}
