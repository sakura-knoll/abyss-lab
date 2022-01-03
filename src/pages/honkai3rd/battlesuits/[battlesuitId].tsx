/** @jsxImportSource theme-ui */
import { Box, Card, Flex, Heading, Paragraph, Text } from '@theme-ui/components'
import { NextPageContext } from 'next'
import Image from 'next/image'
import React from 'react'
import BattlesuitFeatureLabel from '../../../components/atoms/BattlesuitFeatureLabel'
import BattlesuitRankIcon from '../../../components/atoms/BattlesuitRankIcon'
import PageLink from '../../../components/atoms/PageLink'
import SecondaryLabel from '../../../components/atoms/SecondaryLabel'
import TypeLabel from '../../../components/atoms/TypeLabel'
import ValkyrieLabel from '../../../components/atoms/ValkyrieLabel'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  BattlesuitData,
  BattlesuitSkillGroup,
} from '../../../lib/honkai3rd/battlesuits'
import { generateI18NPaths, getI18NProps } from '../../../server/i18n'
import {
  getBattlesuitById,
  listBattlesuits,
} from '../../../server/data/honkai3rd/battlesuits'
import { useTranslation } from '../../../lib/i18n'

interface BattlesuitShowPageProps {
  battlesuit: BattlesuitData
}

const BattlesuitShowPage = ({ battlesuit }: BattlesuitShowPageProps) => {
  const { t } = useTranslation()
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('breadcrumb.honkai-3rd') },
            {
              href: '/honkai3rd/battlesuits',
              label: t('breadcrumb.battlesuits'),
            },
            {
              href: `/honkai3rd/battlesuits/${battlesuit.id}`,
              label: battlesuit.name,
            },
          ]}
        />

        <Heading as='h1'>{battlesuit.name}</Heading>

        <Box mb={3}>
          <Box
            sx={{
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

        <Card
          sx={{
            overflow: 'hidden',
          }}
          mb={3}
        >
          <Box p={2} sx={{ borderBottom: 'default' }}>
            <PageLink
              href={{
                pathname: '/honkai3rd/battlesuits',
                query: { filter: battlesuit.valkyrie },
              }}
            >
              <ValkyrieLabel valkyrie={battlesuit.valkyrie} />
            </PageLink>
          </Box>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            <PageLink
              href={{
                pathname: '/honkai3rd/battlesuits',
                query: { filter: battlesuit.type },
              }}
            >
              <TypeLabel type={battlesuit.type} />
            </PageLink>
          </Box>
          <Flex p={2}>
            {battlesuit.features.map((feature) => {
              return (
                <Box mr={2} key={feature}>
                  <PageLink
                    href={{
                      pathname: '/honkai3rd/battlesuits',
                      query: { filter: feature },
                    }}
                  >
                    <BattlesuitFeatureLabel feature={feature} />
                  </PageLink>
                </Box>
              )
            })}
          </Flex>
        </Card>

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

export async function getStaticProps({
  params,
  locale,
}: NextPageContext & { params: { battlesuitId: string } }) {
  const battlesuit = getBattlesuitById(params.battlesuitId)

  return {
    props: { battlesuit, ...(await getI18NProps(locale)) },
  }
}

export async function getStaticPaths() {
  return {
    paths: generateI18NPaths(
      listBattlesuits().map((battlesuit) => {
        return {
          params: { battlesuitId: battlesuit.id },
        }
      })
    ),
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
    <Card mb={3}>
      <Box
        sx={{
          p: 2,
          borderBottom: 'default',
        }}
      >
        <Heading as='h2' mb={1}>
          {skillGroup.core.name}
        </Heading>
        <SecondaryLabel>{heading}</SecondaryLabel>
      </Box>

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
    </Card>
  )
}
