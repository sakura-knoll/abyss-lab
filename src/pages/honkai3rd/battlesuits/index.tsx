import { Box, Heading, Flex, Text, Link } from '@theme-ui/components'
import NextLink from 'next/link'
import React from 'react'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  BattlesuitData,
  listBattlesuits,
} from '../../../data/honkai3rd/battlesuits'

interface BattlesuitListPageProps {
  battlesuits: BattlesuitData[]
}

const BattlesuitListPage = ({ battlesuits }: BattlesuitListPageProps) => {
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

        <Flex
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {battlesuits.map((battlesuit) => {
            return (
              <Box
                key={battlesuit.id}
                sx={{
                  width: '160px',
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
                  href={`/honkai3rd/battlesuits/${battlesuit.id}`}
                  key={battlesuit.id}
                  passHref={true}
                >
                  <Link>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <div
                        className='rounded'
                        style={{
                          width: '140px',
                          height: '140px',
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: 4,
                        }}
                      >
                        <img
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translateY(-50%) translateX(-50%)',
                          }}
                          height='140'
                          src={`/assets/honkai3rd/battlesuits/portrait-${battlesuit.id}.png`}
                        />
                      </div>
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
          })}
        </Flex>
      </Box>
    </Box>
  )
}

export default BattlesuitListPage

export async function getStaticProps() {
  return {
    props: {
      battlesuits: listBattlesuits(),
    },
  }
}
