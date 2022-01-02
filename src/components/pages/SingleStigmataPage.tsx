/** @jsxImportSource theme-ui */
import { StigmataData, StigmataSet } from '../../lib/honkai3rd/stigmata'
import Image from 'next/image'
import { Box, Heading, Text, Paragraph, Card, Flex } from '@theme-ui/components'
import PageLink from '../../components/atoms/PageLink'
import StigmataCard from '../../components/molecules/StigmataCard'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../components/organisms/Honkai3rdNavigator'
import { capitalize } from '../../lib/string'

export interface SingleStigmataPageProps {
  type: 'single'
  stigmataData: StigmataData
  stigmataSetList: StigmataData[]
  stigmataSet?: StigmataSet
}

const SingleStigmataPage = ({
  stigmataData,
  stigmataSet,
  stigmataSetList,
}: SingleStigmataPageProps) => {
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

        <Card mb={3}>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {capitalize(stigmataData.type)}
          </Box>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {'⭐'.repeat(stigmataData.rarity)}
          </Box>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            HP : {stigmataData.hp} / ATK : {stigmataData.atk} / DEF :{' '}
            {stigmataData.def} / CRT : {stigmataData.crt}
          </Box>
          <Paragraph p={2}>{stigmataData.skill.description}</Paragraph>
        </Card>

        {stigmataSet != null && (
          <Card>
            <Heading as='h2' m={0} p={2} sx={{ borderBottom: 'default' }}>
              <PageLink href={`/honkai3rd/stigmata/${stigmataSet.id}-set`}>
                {stigmataSet.name}
              </PageLink>
              <br />
              <Text as='small' sx={{ fontSize: 2, color: 'secondary' }}>
                Set
              </Text>
            </Heading>
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

            <Heading as='h3' m={0} p={2} sx={{ borderBottom: 'default' }}>
              {stigmataSet.twoSetSkill.name}
            </Heading>
            <Paragraph m={0} p={2} sx={{ borderBottom: 'default' }}>
              {stigmataSet.twoSetSkill.description}
            </Paragraph>
            <Heading as='h3' m={0} p={2} sx={{ borderBottom: 'default' }}>
              {stigmataSet.threeSetSkill.name}
            </Heading>
            <Paragraph m={0} p={2}>
              {stigmataSet.threeSetSkill.description}
            </Paragraph>
          </Card>
        )}
      </Box>
    </Box>
  )
}

export default SingleStigmataPage
