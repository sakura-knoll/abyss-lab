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
  battlesuitFeatures,
  BattlesuitSkillGroup,
  battlesuitTypes,
  valkyries,
} from '../../../lib/honkai3rd/battlesuits'
import { generateI18NPaths, getI18NProps } from '../../../server/i18n'
import {
  getBattlesuitById,
  listBattlesuits,
} from '../../../server/data/honkai3rd/battlesuits'
import { translate, useTranslation } from '../../../lib/i18n'
import { useRouter } from 'next/router'
import Head from '../../../components/atoms/Head'
import { capitalize } from '../../../lib/string'

interface BattlesuitShowPageProps {
  battlesuit: BattlesuitData
}

const BattlesuitShowPage = ({ battlesuit }: BattlesuitShowPageProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const battlesuitName = translate(
    locale,
    { ['ko-KR']: battlesuit.krName },
    battlesuit.name
  )

  const { label: valkyrieLabel, krLabel } = valkyries.find(
    (aValkyrie) => aValkyrie.value === battlesuit.valkyrie
  ) || { label: battlesuit.valkyrie, krLabel: battlesuit.valkyrie }

  const valkyrieName = translate(locale, { 'ko-KR': krLabel }, valkyrieLabel)

  const battlesuitType = battlesuitTypes.find(
    (aType) => aType.value === battlesuit.type
  )
  const battlesuitTypeLabel = battlesuitType
    ? translate(
        locale,
        { 'ko-KR': battlesuitType.krLabel },
        battlesuitType.label
      )
    : capitalize(battlesuit.type)

  return (
    <Box>
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: ${battlesuitName} - Abyss Lab`}
        description={`${t('breadcrumb.honkai-3rd')} ${t(
          'battlesuit-show.battlesuit'
        )} / ${valkyrieName} / ${battlesuitTypeLabel} / ${battlesuit.features
          .map((feature) => {
            const featureData = battlesuitFeatures.find(
              (aFeature) => aFeature.value === feature
            )
            if (featureData == null) {
              return feature
            }

            const { label, krLabel } = featureData

            return translate(locale, { 'ko-KR': krLabel }, label)
          })
          .join(', ')}`}
      />
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
              label: battlesuitName,
            },
          ]}
        />

        <Heading as='h1'>{battlesuitName}</Heading>

        <Box mb={3}>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              maxWidth: [300, 400],
            }}
          >
            <Image
              alt={battlesuitName}
              src={`/assets/honkai3rd/battlesuits/${battlesuit.id}.png`}
              width={400}
              height={400}
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
          <Flex p={2} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
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
          heading={t('battlesuit-show.leader')}
          skillGroup={battlesuit.leader}
          locale={locale}
        />

        <BattlesuitSkillGroupCard
          heading={t('battlesuit-show.passive')}
          skillGroup={battlesuit.passive}
          locale={locale}
        />

        <BattlesuitSkillGroupCard
          heading={t('battlesuit-show.evasion')}
          skillGroup={battlesuit.evasion}
          locale={locale}
        />

        <BattlesuitSkillGroupCard
          heading={t('battlesuit-show.special-attack')}
          skillGroup={battlesuit.special}
          locale={locale}
        />

        <BattlesuitSkillGroupCard
          heading={t('battlesuit-show.ultimate')}
          skillGroup={battlesuit.ultimate}
          locale={locale}
        />

        <BattlesuitSkillGroupCard
          heading={t('battlesuit-show.basic-attack')}
          skillGroup={battlesuit.basic}
          locale={locale}
        />

        {battlesuit.sp != null && (
          <BattlesuitSkillGroupCard
            heading={t('battlesuit-show.sp-skill')}
            skillGroup={battlesuit.sp}
            locale={locale}
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
  locale?: string
}

const BattlesuitSkillGroupCard = ({
  heading,
  skillGroup,
  locale,
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
          {translate(
            locale,
            { 'ko-KR': skillGroup.core.krName },
            skillGroup.core.name
          )}
        </Heading>
        <SecondaryLabel>{heading}</SecondaryLabel>
      </Box>

      <Paragraph p={2} sx={{ whiteSpace: 'pre-wrap', borderBottom: 'default' }}>
        {translate(
          locale,
          { 'ko-KR': skillGroup.core.krDescription },
          skillGroup.core.description
        )}
      </Paragraph>

      {skillGroup.subskills.map((subskill) => {
        const skillName = translate(
          locale,
          { 'ko-KR': subskill.krName },
          subskill.name
        )
        const skillDescription = translate(
          locale,
          { 'ko-KR': subskill.krDescription },
          subskill.description
        )
        return (
          <React.Fragment key={subskill.name}>
            <Heading as='h3' p={2} m={0} sx={{ borderBottom: 'default' }}>
              <Flex sx={{ alignItems: 'center' }}>
                <Text>{skillName}</Text>
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
              {skillDescription}
            </Paragraph>
          </React.Fragment>
        )
      })}
    </Card>
  )
}
