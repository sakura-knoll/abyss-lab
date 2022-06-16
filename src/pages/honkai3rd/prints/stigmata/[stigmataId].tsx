/** @jsxImportSource theme-ui */
import { NextPageContext } from 'next'
import React from 'react'
import PageLink from '../../../../components/atoms/PageLink'
import { StigmataSetProps } from '../../../../components/pages/StigmataSetPage'
import { generateI18NPaths, getI18NProps } from '../../../../server/i18n'
import {
  listStigmata,
  getStigmataById,
  getStigmataListBySetId,
  getStigmataSetBySetId,
  listStigmataSet,
} from '../../../../server/data/honkai3rd/stigmata'
import { Box, Card, Flex, Heading, Paragraph } from 'theme-ui'
import SecondaryLabel from '../../../../components/atoms/SecondaryLabel'
import StigmataCard from '../../../../components/molecules/StigmataCard'
import { translate, useTranslation } from '../../../../lib/i18n'
import { useRouter } from 'next/router'
import { SingleStigmataPageProps } from '../../../../components/pages/SingleStigmataPage'

type StigmataShowPageProps = StigmataSetProps | SingleStigmataPageProps

const StigmataListPage = (props: StigmataShowPageProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  if (props.type === 'single') {
    return null
  }

  const { stigmataSet, stigmataSetList } = props
  const stigmataSetName = translate(
    locale,
    { 'ko-KR': stigmataSet.krName },
    stigmataSet.name
  )
  const stigmataSetAltName = translate(
    locale,
    { 'ko-KR': stigmataSet.krAltName },
    stigmataSet.altName
  )

  return (
    <Box p={3}>
      <Box mb={3}>
        <Heading as='h1' mb={0}>
          {stigmataSetName}
        </Heading>
        <SecondaryLabel>{stigmataSetAltName}</SecondaryLabel>
      </Box>

      <Card mb={3}>
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
        {stigmataSetList.map((stigmataSetItem) => {
          const stigmataName = translate(
            locale,
            { 'ko-KR': stigmataSetItem.krName },
            stigmataSetItem.name
          )
          const stigmataSkillDescrpition = translate(
            locale,
            { 'ko-KR': stigmataSetItem.skill.krDescription },
            stigmataSetItem.skill.description
          )
          return (
            <React.Fragment key={stigmataSetItem.id}>
              <Box sx={{ p: 2, borderBottom: 'default' }}>
                <Heading as='h2' mb={1}>
                  <PageLink href={`/honkai3rd/stigmata/${stigmataSetItem.id}`}>
                    {stigmataName}
                  </PageLink>
                </Heading>
                <SecondaryLabel>
                  {t(`stigmata-show.${stigmataSetItem.type}`)}
                </SecondaryLabel>
              </Box>
              <Box p={2} sx={{ borderBottom: 'default' }}>
                HP : {stigmataSetItem.hp} / ATK : {stigmataSetItem.atk} / DEF :{' '}
                {stigmataSetItem.def} / CRT : {stigmataSetItem.crt}
              </Box>
              <Paragraph
                m={0}
                p={2}
                sx={{
                  borderBottom: 'default',
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                {stigmataSkillDescrpition}
              </Paragraph>
            </React.Fragment>
          )
        })}
      </Card>

      <Card>
        <Heading as='h2' m={0} p={2} sx={{ borderBottom: 'default' }}>
          {translate(
            locale,
            { 'ko-KR': stigmataSet.twoSetSkill.krName },
            stigmataSet.twoSetSkill.name
          )}
        </Heading>
        <Paragraph m={0} p={2} sx={{ borderBottom: 'default' }}>
          {translate(
            locale,
            { 'ko-KR': stigmataSet.twoSetSkill.krDescription },
            stigmataSet.twoSetSkill.description
          )}
        </Paragraph>
        <Heading as='h2' m={0} p={2} sx={{ borderBottom: 'default' }}>
          {translate(
            locale,
            {
              'ko-KR': stigmataSet.threeSetSkill.krName,
            },
            stigmataSet.threeSetSkill.name
          )}
        </Heading>
        <Paragraph m={0} p={2}>
          {translate(
            locale,
            { 'ko-KR': stigmataSet.threeSetSkill.krDescription },
            stigmataSet.threeSetSkill.description
          )}
        </Paragraph>
      </Card>
    </Box>
  )
}

export default StigmataListPage

export async function getStaticProps({
  params,
  locale,
}: NextPageContext & { params: { stigmataId: string } }) {
  const stigmataData = getStigmataById(params.stigmataId)!
  if (stigmataData != null) {
    return {
      props: {
        type: 'single',
        stigmataData: stigmataData,
        stigmataSetList: (getStigmataListBySetId(stigmataData.set!) || []).sort(
          (a, b) => -a.type.localeCompare(b.type)
        ),
        stigmataSet: getStigmataSetBySetId(stigmataData.set!) || null,
        ...(await getI18NProps(locale)),
      },
    }
  }
  const [stigmataSetId] = params.stigmataId.split('-set')
  const stigmataSet = getStigmataSetBySetId(stigmataSetId)!
  return {
    props: {
      type: 'set',
      stigmataSet,
      stigmataSetList: (getStigmataListBySetId(stigmataSet.id) || []).sort(
        (a, b) => -a.type.localeCompare(b.type)
      ),
      ...(await getI18NProps(locale)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: generateI18NPaths([
      ...listStigmata().map((stigmata) => {
        return {
          params: { stigmataId: stigmata.id },
        }
      }),
      ...listStigmataSet().map((stigmataSet) => {
        return {
          params: { stigmataId: `${stigmataSet.id}-set` },
        }
      }),
    ]),
    fallback: false,
  }
}
