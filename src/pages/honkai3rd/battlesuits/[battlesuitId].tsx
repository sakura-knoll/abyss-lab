import { Box, Flex, Heading, Paragraph, Text } from '@theme-ui/components'
import { NextPageContext } from 'next'
import Image from 'next/image'
import React from 'react'
import BattlesuitFeatureLabel from '../../../components/atoms/BattlesuitFeatureLabel'
import BattlesuitRankIcon from '../../../components/atoms/BattlesuitRankIcon'
import TypeLabel from '../../../components/atoms/TypeLabel'
import ValkyrieLabel from '../../../components/atoms/ValkyrieLabel'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  BattlesuitData,
  BattlesuitSkillGroup,
  getBattlesuitById,
  listBattlesuits,
} from '../../../server/data/honkai3rd/battlesuits'

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

        <Box
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            border: 'default',
            transition: 'box-shadow 200ms ease-in-out',
            '&:hover': {
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px;',
            },
          }}
          mb={3}
        >
          <Box sx={{ borderBottom: 'default' }}>
            <Box
              sx={{
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '600px',
              }}
            >
              <Image
                alt={battlesuit.name}
                src={`/assets/honkai3rd/battlesuits/${battlesuit.id}.png`}
                width={600}
                height={600}
                layout='responsive'
              />
            </Box>
          </Box>

          <Box p={2} sx={{ borderBottom: 'default' }}>
            <ValkyrieLabel valkyrie={battlesuit.valkyrie} />
          </Box>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            <TypeLabel type={battlesuit.type} />
          </Box>
          <Flex p={2}>
            {battlesuit.strengths.map((strength) => {
              return (
                <Box mr={2} key={strength}>
                  <BattlesuitFeatureLabel feature={strength} />
                </Box>
              )
            })}
          </Flex>
        </Box>

        <BattlesuitSkillGroupCard
          heading='Leader'
          skillGroup={battlesuit.leader}
        />

        <BattlesuitSkillGroupCard
          heading='Passive'
          skillGroup={battlesuit.passive}
        />

        <BattlesuitSkillGroupCard
          heading='Evasion'
          skillGroup={battlesuit.evasion}
        />

        <BattlesuitSkillGroupCard
          heading='Special Attack'
          skillGroup={battlesuit.special}
        />

        <BattlesuitSkillGroupCard
          heading='Ultimate'
          skillGroup={battlesuit.ultimate}
        />

        <BattlesuitSkillGroupCard
          heading='Basic Attack'
          skillGroup={battlesuit.basic}
        />

        {battlesuit.sp != null && (
          <BattlesuitSkillGroupCard
            heading='SP Skill'
            skillGroup={battlesuit.sp}
          />
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
    fallback: false,
  }
}

interface BattlesuitSkillGroupCardProps {
  heading: string
  skillGroup: BattlesuitSkillGroup
}

const BattlesuitSkillGroupCard = ({
  heading,
  skillGroup,
}: BattlesuitSkillGroupCardProps) => {
  return (
    <Box
      mb={3}
      sx={{
        borderRadius: 4,
        border: 'default',
        transition: 'box-shadow 200ms ease-in-out',
        '&:hover': {
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px;',
        },
      }}
    >
      <Heading
        as='h2'
        p={2}
        m={0}
        sx={{ borderBottom: 'default', fontSize: 4 }}
      >
        {skillGroup.core.name}
        <br />
        <Text as='small' sx={{ fontSize: 2, color: 'gray.6' }}>
          {heading}
        </Text>
      </Heading>
      <Paragraph p={2} sx={{ whiteSpace: 'pre-wrap', borderBottom: 'default' }}>
        {skillGroup.core.description}
      </Paragraph>
      {skillGroup.subskills.map((subskill) => {
        return (
          <React.Fragment key={subskill.name}>
            <Heading as='h3' p={2} m={0} sx={{ borderBottom: 'default' }}>
              <Flex sx={{ alignItems: 'center' }}>
                <Text>{subskill.name}</Text>
                {subskill.requiredRank != null ? (
                  /^[0-9]/.test(subskill.requiredRank) ? (
                    <Box
                      ml={2}
                      sx={{ height: 30, lineHeight: '30px', fontSize: 2 }}
                    >
                      ⭐{subskill.requiredRank.slice(0, 1)}
                    </Box>
                  ) : (
                    <BattlesuitRankIcon
                      rank={subskill.requiredRank}
                      size={30}
                      ml={2}
                    />
                  )
                ) : (
                  <Box sx={{ height: 30 }} />
                )}
              </Flex>
            </Heading>
            <Paragraph
              p={2}
              sx={{
                whiteSpace: 'pre-wrap',
                borderBottom: 'default',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              {subskill.description}
            </Paragraph>
          </React.Fragment>
        )
      })}
    </Box>
  )
}
