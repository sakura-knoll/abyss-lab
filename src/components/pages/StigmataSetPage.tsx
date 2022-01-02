/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph, Card, Flex } from '@theme-ui/components'
import React from 'react'
import PageLink from '../../components/atoms/PageLink'
import StigmataCard from '../../components/molecules/StigmataCard'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../components/organisms/Honkai3rdNavigator'
import { StigmataData, StigmataSet } from '../../lib/honkai3rd/stigmata'
import { capitalize } from '../../lib/string'
import SecondaryLabel from '../atoms/SecondaryLabel'

export interface StigmataSetProps {
  type: 'set'
  stigmataSet: StigmataSet
  stigmataSetList: StigmataData[]
}

const StigmataSetPage = ({
  stigmataSet,
  stigmataSetList,
}: StigmataSetProps) => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            {
              href: {
                pathname: `/honkai3rd/stigmata`,
                query: { list: 'set' },
              },
              label: 'Stigmata',
            },
            {
              href: `/honkai3rd/stigmata/${stigmataSet.id}-set`,
              label: `${stigmataSet.name}`,
            },
          ]}
        />

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
                    <PageLink
                      href={`/honkai3rd/stigmata/${stigmataSetItem.id}`}
                    >
                      {stigmataSetItem.name}
                    </PageLink>
                  </Heading>
                  <SecondaryLabel>
                    {capitalize(stigmataSetItem.type)}
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
    </Box>
  )
}

export default StigmataSetPage
