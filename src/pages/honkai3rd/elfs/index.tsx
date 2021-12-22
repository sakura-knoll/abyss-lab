import { Box, Heading, Flex, Text, Link } from '@theme-ui/components'
import Image from 'next/image'
import NextLink from 'next/link'
import { pick } from 'ramda'
import React from 'react'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { ElfData, listElfs } from '../../../data/honkai3rd/elfs'

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
            return (
              <Box
                key={elf.id}
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
                  href={`/honkai3rd/elfs/${elf.id}`}
                  key={elf.id}
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
                        alt={elf.name}
                        layout='fill'
                        objectFit='cover'
                        src={`/assets/honkai3rd/elfs/icon-${elf.id}.png`}
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
                      <Text>{elf.name}</Text>
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

export default ElfListPage

export async function getStaticProps() {
  return {
    props: {
      elfs: listElfs().map((elf) => pick(['id', 'name'], elf)),
    },
  }
}
