/** @jsxImportSource theme-ui */
import { NextPageContext } from 'next'
import React from 'react'
import PageLink from '../../../../components/atoms/PageLink'
import { StigmataSetProps } from '../../../../components/pages/StigmataSetPage'
import { generateI18NPaths, getI18NProps } from '../../../../server/i18n'
import {
  listStigmata,
  getStigmataListBySetId,
  getStigmataSetBySetId,
  listStigmataSet,
  getStigmaById,
} from '../../../../server/data/honkai3rd/stigmata'
import { Box, Card, Flex, Heading, Paragraph } from 'theme-ui'
import SecondaryLabel from '../../../../components/atoms/SecondaryLabel'
import StigmataCard from '../../../../components/molecules/StigmataCard'
import { useTranslation } from '../../../../lib/i18n'
import { SingleStigmataPageProps } from '../../../../components/pages/SingleStigmataPage'

type StigmataShowPageProps = StigmataSetProps | SingleStigmataPageProps

const StigmataListPage = (props: StigmataShowPageProps) => {
  const { t } = useTranslation()

  if (props.type === 'single') {
    return null
  }

  const { stigmataSet, stigmataSetList } = props

  return (
    <Box p={3}>
      <Box mb={3}>
        <Heading as='h1' mb={0}>
          {stigmataSet.name}
        </Heading>
        <SecondaryLabel>{stigmataSet.altName}</SecondaryLabel>
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
          return (
            <React.Fragment key={stigmataSetItem.id}>
              <Box sx={{ p: 2, borderBottom: 'default' }}>
                <Heading as='h2' mb={1}>
                  <PageLink href={`/honkai3rd/stigmata/${stigmataSetItem.id}`}>
                    {stigmataSetItem.name}
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
                {stigmataSetItem.skill.description}
              </Paragraph>
            </React.Fragment>
          )
        })}
      </Card>

      <Card>
        <Heading as='h2' m={0} p={2} sx={{ borderBottom: 'default' }}>
          {stigmataSet.twoSetSkill.name}
        </Heading>
        <Paragraph m={0} p={2} sx={{ borderBottom: 'default' }}>
          {stigmataSet.twoSetSkill.description}
        </Paragraph>
        <Heading as='h2' m={0} p={2} sx={{ borderBottom: 'default' }}>
          {stigmataSet.threeSetSkill.name}
        </Heading>
        <Paragraph m={0} p={2}>
          {stigmataSet.threeSetSkill.description}
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
  const stigmataData = getStigmaById(params.stigmataId, locale)!
  if (stigmataData != null) {
    return {
      props: {
        type: 'single',
        stigmataData: stigmataData,
        stigmataSetList: (
          getStigmataListBySetId(stigmataData.set!, locale) || []
        ).sort((a, b) => -a.type.localeCompare(b.type)),
        stigmataSet: getStigmataSetBySetId(stigmataData.set!, locale) || null,
        ...(await getI18NProps(locale)),
      },
    }
  }
  const [stigmataSetId] = params.stigmataId.split('-set')
  const stigmataSet = getStigmataSetBySetId(stigmataSetId, locale)!
  return {
    props: {
      type: 'set',
      stigmataSet,
      stigmataSetList: (
        getStigmataListBySetId(stigmataSet.id, locale) || []
      ).sort((a, b) => -a.type.localeCompare(b.type)),
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
