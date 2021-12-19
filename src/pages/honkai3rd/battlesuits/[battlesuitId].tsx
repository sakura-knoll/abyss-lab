import { Box, Heading, Paragraph } from '@theme-ui/components'
import { NextPageContext } from 'next'
import React from 'react'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  BattlesuitData,
  getBattlesuitById,
  listBattlesuits,
} from '../../../data/honkai3rd/battlesuits'
import CharacterBadge from '../../atoms/CharacterBadge'
import TypeBadge from '../../atoms/TypeBadge'

interface BattlesuitShowPageProps {
  battlesuit: BattlesuitData
}

const BattlesuitShowPage = ({ battlesuit }: BattlesuitShowPageProps) => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/battlesuits', label: 'Battlesuits' },
            {
              href: `/honkai3rd/battlesuits/${battlesuit.id}`,
              label: battlesuit.name,
            },
          ]}
        />

        <Heading as='h1'>{battlesuit.name}</Heading>

        <Box className='mb-4'>
          <Box>
            <Box>
              <CharacterBadge character={battlesuit.valkyrie} />
            </Box>
            <Box>
              <TypeBadge type={battlesuit.type} />
            </Box>
          </Box>
          <Box>
            <img src={`/assets/honkai3rd/battlesuits/${battlesuit.id}.png`} />
          </Box>
        </Box>

        <Box className='mb-2'>
          <Heading as='h2'>Leader</Heading>
          <Box variant='flush'>
            <Box>
              <Heading as='h3'>{battlesuit.leader.core.name}</Heading>
              <Paragraph>{battlesuit.leader.core.description}</Paragraph>
              {battlesuit.leader.subskills.map((subskill, index) => {
                return (
                  <>
                    <Heading as='h4'>
                      {subskill.name}
                      {subskill.requiredRank != null
                        ? ` (${subskill.requiredRank})`
                        : ''}
                    </Heading>
                    <p>{subskill.description}</p>
                  </>
                )
              })}
            </Box>
          </Box>
        </Box>
        <Box className='mb-2'>
          <Heading as='h2'>Passive</Heading>
          <Box variant='flush'>
            <Box>
              <Heading as='h3'>{battlesuit.passive.core.name}</Heading>
              <Paragraph>{battlesuit.passive.core.description}</Paragraph>
              {battlesuit.passive.subskills.map((subskill, index) => {
                return (
                  <>
                    <Heading as='h4'>
                      {subskill.name}
                      {subskill.requiredRank != null
                        ? ` (${subskill.requiredRank})`
                        : ''}
                    </Heading>
                    <p>{subskill.description}</p>
                  </>
                )
              })}
            </Box>
          </Box>
        </Box>
        <Box className='mb-2'>
          <Heading as='h2'>Evasion</Heading>
          <Box variant='flush'>
            <Box>
              <Heading as='h3'>{battlesuit.evasion.core.name}</Heading>
              <Paragraph>{battlesuit.evasion.core.description}</Paragraph>
              {battlesuit.evasion.subskills.map((subskill, index) => {
                return (
                  <>
                    <Heading as='h4'>
                      {subskill.name}
                      {subskill.requiredRank != null
                        ? ` (${subskill.requiredRank})`
                        : ''}
                    </Heading>
                    <p>{subskill.description}</p>
                  </>
                )
              })}
            </Box>
          </Box>
        </Box>
        <Box className='mb-2'>
          <Heading as='h2'>Special Attack</Heading>
          <Box variant='flush'>
            <Box>
              <Heading as='h3'>{battlesuit.special.core.name}</Heading>
              <Paragraph>{battlesuit.special.core.description}</Paragraph>
              {battlesuit.special.subskills.map((subskill, index) => {
                return (
                  <>
                    <Heading as='h4'>
                      {subskill.name}
                      {subskill.requiredRank != null
                        ? ` (${subskill.requiredRank})`
                        : ''}
                    </Heading>
                    <p>{subskill.description}</p>
                  </>
                )
              })}
            </Box>
          </Box>
        </Box>

        <Box className='mb-2'>
          <Heading as='h2'>Ultimate</Heading>
          <Box variant='flush'>
            <Box>
              <Heading as='h3'>{battlesuit.ultimate.core.name}</Heading>
              <Paragraph>{battlesuit.ultimate.core.description}</Paragraph>
              {battlesuit.ultimate.subskills.map((subskill, index) => {
                return (
                  <>
                    <Heading as='h4'>
                      {subskill.name}
                      {subskill.requiredRank != null
                        ? ` (${subskill.requiredRank})`
                        : ''}
                    </Heading>
                    <p>{subskill.description}</p>
                  </>
                )
              })}
            </Box>
          </Box>
        </Box>

        <Box className='mb-2'>
          <Heading as='h2'>Basic Attack</Heading>
          <Box variant='flush'>
            <Box>
              <Heading as='h3'>{battlesuit.basic.core.name}</Heading>
              <Paragraph>{battlesuit.basic.core.description}</Paragraph>
              {battlesuit.basic.subskills.map((subskill, index) => {
                return (
                  <>
                    <Heading as='h4'>
                      {subskill.name}
                      {subskill.requiredRank != null
                        ? ` (${subskill.requiredRank})`
                        : ''}
                    </Heading>
                    <p>{subskill.description}</p>
                  </>
                )
              })}
            </Box>
          </Box>
        </Box>

        {battlesuit.sp != null && (
          <Box className='mb-2'>
            <Heading as='h2'>SP Skill</Heading>
            <Box variant='flush'>
              <Box>
                <Heading as='h3'>{battlesuit.sp.core.name}</Heading>
                <Paragraph>{battlesuit.sp.core.description}</Paragraph>
                {battlesuit.sp.subskills.map((subskill, index) => {
                  return (
                    <>
                      <Heading as='h4'>
                        {subskill.name}
                        {subskill.requiredRank != null
                          ? ` (${subskill.requiredRank})`
                          : ''}
                      </Heading>
                      <p>{subskill.description}</p>
                    </>
                  )
                })}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default BattlesuitShowPage

export function getStaticProps(
  context: NextPageContext & { params: { battlesuitId: string } }
) {
  const battlesuit = getBattlesuitById(context.params.battlesuitId)
  return {
    props: { battlesuit },
  }
}

export async function getStaticPaths() {
  return {
    paths: listBattlesuits().map((battlesuit) => {
      return {
        params: { battlesuitId: battlesuit.id },
      }
    }),
    fallback: true,
  }
}
