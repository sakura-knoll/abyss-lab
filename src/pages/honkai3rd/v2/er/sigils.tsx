import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading } from 'theme-ui'
import MaterialIcon from '../../../../components/v2-pre/MaterialIcon'
import { ErSigil } from '../../../../lib/v2-pre/data/types'
import { loadErSigils } from '../../../../lib/v2-pre/server/loadData'

interface SigilsPageProps {
  erSigils: ErSigil[]
}

const SigilsPage = ({ erSigils }: SigilsPageProps) => {
  return (
    <Box>
      <Heading as="h1">ER Sigils</Heading>

      <Card mb={3}>
        {erSigils.map(sigil => {
          return (
            <Flex
              key={sigil.id}
              sx={{
                borderBottom: 'default',
                '&:last-child': {
                  borderBottom: 'none'
                }
              }}
            >
              <Box sx={{ p: 1, flexShrink: 0, borderRight: 'default' }}>
                <MaterialIcon materialId={sigil.id} />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Heading as="h3" sx={{ m: 0, p: 1, borderBottom: 'default' }} id={sigil.id}>
                  {sigil.name}
                </Heading>
                <Box p={1}>{sigil.desc}</Box>
              </Box>
            </Flex>
          )
        })}
      </Card>
    </Box>
  )
}

export default SigilsPage

export async function getStaticProps({ locale }: NextPageContext) {
  const erSigils = loadErSigils()

  return {
    props: { erSigils }
  }
}
