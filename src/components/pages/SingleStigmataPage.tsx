/** @jsxImportSource theme-ui */
import { StigmataData, StigmataSet } from '../../lib/honkai3rd/stigmata'
import Image from 'next/image'
import { Box, Heading, Paragraph, Card, Flex } from '@theme-ui/components'
import PageLink from '../../components/atoms/PageLink'
import StigmataCard from '../../components/molecules/StigmataCard'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../components/organisms/Honkai3rdNavigator'
import SecondaryLabel from '../atoms/SecondaryLabel'
import { useRouter } from 'next/router'
import { translate, useTranslation } from '../../lib/i18n'
import Head from '../atoms/Head'

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
  const { locale } = useRouter()
  const { t } = useTranslation()

  const stigmataName = translate(
    locale,
    { 'ko-KR': stigmataData.krName },
    stigmataData.name
  )

  const stigmataSkillDescription = translate(
    locale,
    {
      'ko-KR': stigmataData.skill.krDescription,
    },
    stigmataData.skill.description
  )

  return (
    <Box>
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: ${stigmataName} - Abyss Lab`}
        description={`${t('breadcrumb.honkai-3rd')} ${t(
          'stigmata-show.stigmata'
        )} /
        ${'⭐'.repeat(stigmataData.rarity)} / ${t(
          `stigmata-show.${stigmataData.type}`
        )} / HP : ${stigmataData.hp} / ATK : ${stigmataData.atk} / DEF : ${
          stigmataData.def
        } / CRT : ${stigmataData.crt}`}
      />
      <Honkai3rdNavigator />
      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('breadcrumb.honkai-3rd') },
            { href: '/honkai3rd/stigmata', label: t('breadcrumb.stigmata') },
            {
              href: `/honkai3rd/stigmata/${stigmataData.id}`,
              label: stigmataName,
            },
          ]}
        />

        <Heading as='h1'>{stigmataName}</Heading>

        <Box
          mb={3}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            maxWidth: [300, 400],
            borderRadius: 4,
          }}
        >
          <Image
            alt={stigmataName}
            src={`/assets/honkai3rd/stigmata/${stigmataData.id}.png`}
            width={400}
            height={400}
            layout='responsive'
          />
        </Box>

        <Card mb={3}>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {t(`stigmata-show.${stigmataData.type}`)}
          </Box>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {'⭐'.repeat(stigmataData.rarity)}
          </Box>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            HP : {stigmataData.hp} / ATK : {stigmataData.atk} / DEF :{' '}
            {stigmataData.def} / CRT : {stigmataData.crt}
          </Box>
          <Paragraph p={2}>{stigmataSkillDescription}</Paragraph>
        </Card>

        {stigmataSet != null && (
          <Card>
            <Box sx={{ p: 2, borderBottom: 'default' }}>
              <Heading as='h2' mb={1}>
                <PageLink href={`/honkai3rd/stigmata/${stigmataSet.id}-set`}>
                  {translate(
                    locale,
                    { 'ko-KR': stigmataSet.krName },
                    stigmataSet.name
                  )}
                </PageLink>
              </Heading>
              <SecondaryLabel>
                {translate(
                  locale,
                  { 'ko-KR': stigmataSet.krAltName },
                  stigmataSet.altName
                )}
              </SecondaryLabel>
            </Box>

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
            <Heading as='h3' m={0} p={2} sx={{ borderBottom: 'default' }}>
              {translate(
                locale,
                { 'ko-KR': stigmataSet.threeSetSkill.krName },
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
        )}
      </Box>
    </Box>
  )
}

export default SingleStigmataPage
