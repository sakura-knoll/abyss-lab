/** @jsxImportSource theme-ui */
import { Text, Box, Heading, Flex, Link } from '@theme-ui/components'
import Image from 'next/image'
import NextLink from 'next/link'
import { pick } from 'ramda'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { StigmataData, listStigmata } from '../../../data/honkai3rd/stigmata'

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
            return (
              <Box
                key={stigmata.id}
                sx={{
                  width: '120px',
                  padding: 2,
                  margin: 1,
                  borderColor: 'gray.3',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderRadius: 8,
                  '&:hover': {
                    borderColor: 'gray.3',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'box-shadow 200ms ease-in-out',
                  },
                }}
              >
                <NextLink
                  href={`/honkai3rd/stigmata/${stigmata.id}`}
                  key={stigmata.id}
                  passHref={true}
                >
                  <Link>
                    <Box
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100px',
                        height: '100px',
                        borderRadius: 4,
                      }}
                    >
                      <Image
                        alt={stigmata.name}
                        layout='fill'
                        objectFit='cover'
                        src={`/assets/honkai3rd/stigmata/icon-${stigmata.id}.png`}
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
                      <Text>{stigmata.name}</Text>
                    </Box>
                    <Box sx={{ fontSize: 1, textAlign: 'center' }}>
                      {'⭐'.repeat(stigmata.rarity)}
                    </Box>
                  </Link>
                </NextLink>
              </Box>
            )
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
