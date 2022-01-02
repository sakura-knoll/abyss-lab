import { Box, Heading, Text, Paragraph, Card, Flex } from '@theme-ui/components'
import { NextPageContext } from 'next'
import Image from 'next/image'
import React from 'react'
import StigmataCard from '../../../components/molecules/StigmataCard'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { StigmataData, StigmataSet } from '../../../lib/honkai3rd/stigmata'
import { capitalize } from '../../../lib/string'
import {
  listStigmata,
  getStigmataById,
  getStigmataListBySetId,
  getStigmataSetBySetId,
} from '../../../server/data/honkai3rd/stigmata'

interface StigmataShowPageProps {
  stigmataData: StigmataData
  stigmataSetList: StigmataData[]
  stigmataSet?: StigmataSet
}

const StigmataListPage = ({
  stigmataData,
  stigmataSetList = [],
  stigmataSet,
}: StigmataShowPageProps) => {
  return (
    <Box>
      <Honkai3rdNavigator />
      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/stigmata', label: 'Stigmata' },
            {
              href: `/honkai3rd/stigmata/${stigmataData.id}`,
              label: stigmataData.name,
            },
          ]}
        />

        <Heading as='h1'>{stigmataData.name}</Heading>

        <Box
          mb={3}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '600px',
            borderRadius: 4,
          }}
        >
          <Image
            alt={stigmataData.name}
            src={`/assets/honkai3rd/stigmata/${stigmataData.id}.png`}
            width={600}
            height={600}
            layout='responsive'
          />
        </Box>

        <Card mb={3}>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {capitalize(stigmataData.type)}
          </Box>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {'⭐'.repeat(stigmataData.rarity)}
          </Box>
          <Box p={2}>
            HP : {stigmataData.hp} / ATK : {stigmataData.atk} / DEF :{' '}
            {stigmataData.def} / CRT : {stigmataData.crt}
          </Box>
        </Card>

        <Card mb={3}>
          <Heading as='h2' m={0} p={2} sx={{ borderBottom: 'default' }}>
            Skill - {stigmataData.skill.name}
          </Heading>
          <Paragraph p={2}>{stigmataData.skill.description}</Paragraph>
        </Card>

        {stigmataSet != null && (
          <Card>
            <Heading as='h2' m={0} p={2} sx={{ borderBottom: 'default' }}>
              {stigmataSet.name}
              <br />
              <Text as='small' sx={{ fontSize: 2, color: 'secondary' }}>
                Set
              </Text>
            </Heading>
            <Flex
              p={2}
              sx={{
                borderBottom: 'default',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
              }}
            >
              {stigmataSetList.map((stigmataSetItem) => {
                return (
                  <StigmataCard
                    key={stigmataSetItem.id}
                    stigmata={stigmataSetItem}
                  />
                )
              })}
            </Flex>

            <Heading as='h3' m={0} p={2} sx={{ borderBottom: 'default' }}>
              {stigmataSet.twoSetSkill.name}
            </Heading>
            <Paragraph m={0} p={2} sx={{ borderBottom: 'default' }}>
              {stigmataSet.twoSetSkill.description}
            </Paragraph>
            <Heading as='h3' m={0} p={2} sx={{ borderBottom: 'default' }}>
              {stigmataSet.threeSetSkill.name}
            </Heading>
            <Paragraph m={0} p={2}>
              {stigmataSet.threeSetSkill.description}
            </Paragraph>
          </Card>
        )}
      </Box>
    </Box>
  )
}

export default StigmataListPage

export async function getStaticProps(
  ctx: NextPageContext & { params: { stigmataId: string } }
) {
  const stigmataData = getStigmataById(ctx.params.stigmataId)!

  return {
    props: {
      stigmataData: stigmataData,
      stigmataSetList: (getStigmataListBySetId(stigmataData.set!) || []).sort(
        (a, b) => -a.type.localeCompare(b.type)
      ),
      stigmataSet: getStigmataSetBySetId(stigmataData.set!) || null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: listStigmata().map((stigmata) => {
      return {
        params: { stigmataId: stigmata.id },
      }
    }),
    fallback: false,
  }
}
