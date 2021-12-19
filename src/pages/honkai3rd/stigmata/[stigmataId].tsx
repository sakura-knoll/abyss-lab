import {
  NavLink,
  Box,
  Card,
  Heading,
  Text,
  Paragraph,
} from '@theme-ui/components'
import Link from 'next/link'
import React from 'react'
import {
  StigmataData,
  listStigmata,
  getStigmataById,
  getStigmataListBySetId,
  getStigmataSetBySetId,
  StigmataSet,
} from '../../../data/honkai3rd/stigmata'

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
      <Box>
        <Link passHref href='/honkai3rd'>
          <NavLink>Honkai 3rd</NavLink>
        </Link>
        <Link passHref href='/honkai3rd/stigmata'>
          <NavLink>Stigmata</NavLink>
        </Link>
      </Box>

      <Heading as='h1'>{stigmataData.name}</Heading>

      <img src={`/assets/honkai3rd/stigmata/${stigmataData.id}.png`} />

      <Box>
        <Heading as='h2'>Skill - {stigmataData.skill.name}</Heading>
        <Paragraph>{stigmataData.skill.description}</Paragraph>
      </Box>

      {stigmataSet != null && (
        <Box>
          <Heading as='h2'>Set</Heading>
          <Box>
            {stigmataSetList.map((stigmataSetItem) => {
              return (
                <Link
                  key={stigmataSetItem.id}
                  href={`/honkai3rd/stigmata/${stigmataSetItem.id}`}
                >
                  <a>
                    <div
                      className='rounded'
                      style={{
                        width: '100px',
                        height: '100px',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translateY(-50%) translateX(-50%)',
                        }}
                        height='100'
                        src={`/assets/honkai3rd/stigmata/icon-${stigmataSetItem.id}.png`}
                      />
                    </div>
                    <Text>{stigmataSetItem.name}</Text>
                  </a>
                </Link>
              )
            })}
          </Box>
          <Box>
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
  )
}

export default StigmataListPage

export async function getStaticProps(ctx) {
  const stigmataData = getStigmataById(ctx.params.stigmataId)

  return {
    props: {
      stigmataData: stigmataData,
      stigmataSetList: getStigmataListBySetId(stigmataData.set).sort(
        (a, b) => -a.type.localeCompare(b.type)
      ),
      stigmataSet: getStigmataSetBySetId(stigmataData.set) || null,
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
    fallback: true,
  }
}
