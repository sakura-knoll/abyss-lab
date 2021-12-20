import { Box, Heading, Flex, Text, Link } from '@theme-ui/components'
import Image from 'next/image'
import NextLink from 'next/link'
import { pick } from 'ramda'
import React from 'react'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  BattlesuitData,
  listBattlesuits,
} from '../../../data/honkai3rd/battlesuits'

interface BattlesuitListPageProps {
  battlesuits: Pick<BattlesuitData, 'id' | 'name'>[]
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
      battlesuits: listBattlesuits().map((battlesuit) =>
        pick(['id', 'name'], battlesuit)
      ),
    },
  }
}
