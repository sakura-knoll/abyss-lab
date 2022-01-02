/** @jsxImportSource theme-ui */
import { Box, Heading, Flex } from '@theme-ui/components'
import { pick } from 'ramda'
import ElfCard from '../../../components/molecules/ElfCard'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { ElfData } from '../../../lib/honkai3rd/elfs'
import { listElfs } from '../../../server/data/honkai3rd/elfs'

interface ElfListPageProps {
  elfs: Pick<ElfData, 'id' | 'name'>[]
}

const ElfListPage = ({ elfs }: ElfListPageProps) => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/elfs', label: 'ELFs' },
          ]}
        />

        <Heading as='h1'>ELFs</Heading>

        <Flex
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {elfs.map((elf) => {
            return <ElfCard key={elf.id} elf={elf} />
          })}
        </Flex>
      </Box>
    </Box>
  )
}

export default ElfListPage

export async function getStaticProps() {
  return {
    props: {
      elfs: listElfs().map((elf) => pick(['id', 'name'], elf)),
    },
  }
}
