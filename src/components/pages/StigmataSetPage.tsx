/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph, Card, Flex } from '@theme-ui/components'
import React from 'react'
import PageLink from '../../components/atoms/PageLink'
import StigmataCard from '../../components/molecules/StigmataCard'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import { StigmataData, StigmataSet } from '../../lib/honkai3rd/stigmata'
import SecondaryLabel from '../atoms/SecondaryLabel'
import { translate, useTranslation } from '../../lib/i18n'
import { useRouter } from 'next/router'
import Head from '../atoms/Head'
import Honkai3rdLayout from '../layouts/Honkai3rdLayout'

export interface StigmataSetProps {
  type: 'set'
  stigmataSet: StigmataSet
  stigmataSetList: StigmataData[]
}

const StigmataSetPage = ({
  stigmataSet,
  stigmataSetList,
}: StigmataSetProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

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
    <Honkai3rdLayout>
      <Head
        title={`${t('common.honkai-3rd')}: ${stigmataSetName} ${t(
          'stigmata-show.stigmata-set'
        )} - ${t('common.abyss-lab')}`}
        description={`${t('common.honkai-3rd')} ${t(
          'stigmata-show.stigmata-set'
        )} / ${'⭐'.repeat(stigmataSet.rarity)} / ${stigmataSetAltName}`}
      />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: {
                pathname: `/honkai3rd/stigmata`,
                query: { list: 'set' },
              },
              label: t('common.stigmata'),
            },
            {
              href: `/honkai3rd/stigmata/${stigmataSet.id}-set`,
              label: stigmataSetName,
            },
          ]}
        />

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
                    <PageLink
                      href={`/honkai3rd/stigmata/${stigmataSetItem.id}`}
                    >
                      {stigmataName}
                    </PageLink>
                  </Heading>
                  <SecondaryLabel>
                    {t(`stigmata-show.${stigmataSetItem.type}`)}
                  </SecondaryLabel>
                </Box>
                <Box p={2} sx={{ borderBottom: 'default' }}>
                  HP : {stigmataSetItem.hp} / ATK : {stigmataSetItem.atk} / DEF
                  : {stigmataSetItem.def} / CRT : {stigmataSetItem.crt}
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
    </Honkai3rdLayout>
  )
}

export default StigmataSetPage
