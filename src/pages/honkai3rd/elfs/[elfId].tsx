/** @jsxImportSource theme-ui */
import { Box, Card, Flex, Heading, Paragraph } from '@theme-ui/components'
import { NextPageContext } from 'next'
import Image from 'next/image'
import React from 'react'
import BattlesuitFeatureLabel from '../../../components/atoms/BattlesuitFeatureLabel'
import SecondaryLabel from '../../../components/atoms/SecondaryLabel'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { ElfData } from '../../../lib/honkai3rd/elfs'
import { generateI18NPaths, getI18NProps } from '../../../lib/i18n'
import { capitalize } from '../../../lib/string'
import { getElfById, listElfs } from '../../../server/data/honkai3rd/elfs'

interface ElfShowPageProps {
  elf: ElfData
}

const ElfShowPage = ({ elf }: ElfShowPageProps) => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/elfs', label: 'ELFs' },
            {
              href: `/honkai3rd/elfs/${elf.id}`,
              label: elf.name,
            },
          ]}
        />

        <Heading as='h1'>{elf.name}</Heading>

        <Box mb={3}>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: '400px',
              height: '400px',
              borderRadius: 4,
            }}
          >
            <Image
              alt={elf.name}
              layout='fill'
              objectFit='cover'
              src={`/assets/honkai3rd/elfs/${elf.id}.png`}
            />
          </Box>
        </Box>

        <Card mb={3}>
          <Box sx={{ p: 2, borderBottom: 'default' }}>
            {'⭐'.repeat(elf.baseRank)}
          </Box>
          <Flex p={2}>
            {elf.features.map((feature) => (
              <Box key={feature} mr={2}>
                <BattlesuitFeatureLabel feature={feature} />
              </Box>
            ))}
          </Flex>
        </Card>

        {elf.skillRows.map((row, rowIndex) => {
          return (
            <Card key={rowIndex} mb={3}>
              {row.map((item, columnIndex) => {
                return (
                  <React.Fragment key={columnIndex}>
                    <Box sx={{ p: 2, borderBottom: 'default' }}>
                      <Heading
                        as={columnIndex === 0 ? 'h2' : 'h3'}
                        sx={{ mb: 1 }}
                      >
                        {item.name}
                      </Heading>
                      <SecondaryLabel>{capitalize(item.type)}</SecondaryLabel>
                    </Box>
                    <Paragraph
                      sx={{
                        p: 2,
                        borderBottom: 'default',
                        '&:last-child': { borderBottom: 'none' },
                      }}
                    >
                      {item.description}
                    </Paragraph>
                  </React.Fragment>
                )
              })}
            </Card>
          )
        })}
      </Box>
    </Box>
  )
}

export default ElfShowPage

export async function getStaticProps({
  params,
  locale,
}: NextPageContext & { params: { elfId: string } }) {
  const elf = getElfById(params.elfId)
  return {
    props: { elf, ...(await getI18NProps(locale)) },
  }
}

export async function getStaticPaths() {
  return {
    paths: generateI18NPaths(
      listElfs().map((elf) => {
        return {
          params: { elfId: elf.id },
        }
      })
    ),
    fallback: false,
  }
}
