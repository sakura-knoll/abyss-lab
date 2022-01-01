import { Box, Heading, Text, Paragraph } from '@theme-ui/components'
import { NextPageContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  StigmataData,
  listStigmata,
  getStigmataById,
  getStigmataListBySetId,
  getStigmataSetBySetId,
  StigmataSet,
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

        <Box mb={3}>
          <Heading as='h2'>Skill - {stigmataData.skill.name}</Heading>
          <Paragraph>{stigmataData.skill.description}</Paragraph>
        </Box>

        {stigmataSet != null && (
          <Box>
            <Heading as='h2'>Set</Heading>
            <Box mb={3}>
              {stigmataSetList.map((stigmataSetItem) => {
                return (
                  <Link
                    key={stigmataSetItem.id}
                    href={`/honkai3rd/stigmata/${stigmataSetItem.id}`}
                  >
                    <a>
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
                          alt={stigmataSetItem.name}
                          layout='fill'
                          objectFit='cover'
                          src={`/assets/honkai3rd/stigmata/icon-${stigmataSetItem.id}.png`}
                        />
                      </Box>
                      <Text>{stigmataSetItem.name}</Text>
                    </a>
                  </Link>
                )
              })}
            </Box>
            <Box mb={3}>
              <Heading as='h3'>{stigmataSet.twoSetSkill.name}</Heading>
              <Paragraph>{stigmataSet.twoSetSkill.description}</Paragraph>
            </Box>
            <Box>
              <Heading as='h3'>{stigmataSet.threeSetSkill.name}</Heading>
              <Paragraph>{stigmataSet.threeSetSkill.description}</Paragraph>
            </Box>
          </Box>
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
