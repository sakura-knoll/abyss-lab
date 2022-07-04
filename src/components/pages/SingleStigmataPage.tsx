/** @jsxImportSource theme-ui */
import { StigmataData, StigmataSet } from '../../lib/honkai3rd/stigmata'
import {
  Box,
  Heading,
  Paragraph,
  Card,
  Flex,
  Image,
} from '@theme-ui/components'
import PageLink from '../../components/atoms/PageLink'
import StigmataCard from '../../components/molecules/StigmataCard'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import SecondaryLabel from '../atoms/SecondaryLabel'
import { useTranslation } from '../../lib/i18n'
import Head from '../atoms/Head'
import { assetsBucketBaseUrl } from '../../lib/consts'
import Honkai3rdLayout from '../layouts/Honkai3rdLayout'

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
  const { t } = useTranslation()

  return (
    <Honkai3rdLayout>
      <Head
        title={`${stigmataData.name} - ${t('common.honkai-3rd')} - ${t(
          'common.abyss-lab'
        )}`}
        description={`${t('common.honkai-3rd')} ${t('stigmata-show.stigmata')} /
        ${'⭐'.repeat(stigmataData.rarity)} / ${t(
          `stigmata-show.${stigmataData.type}`
        )} / HP : ${stigmataData.hp} / ATK : ${stigmataData.atk} / DEF : ${
          stigmataData.def
        } / CRT : ${stigmataData.crt}`}
      />
      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/stigmata', label: t('common.stigmata') },
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
            maxWidth: [300, 400],
            borderRadius: 4,
          }}
        >
          <Image
            alt={stigmataData.name}
            src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/${stigmataData.id}.png`}
            width={400}
            height={400}
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
          <Paragraph p={2}>{stigmataData.skill.description}</Paragraph>
        </Card>

        {stigmataSet != null && (
          <Card>
            <Box sx={{ p: 2, borderBottom: 'default' }}>
              <Heading as='h2' mb={1}>
                <PageLink href={`/honkai3rd/stigmata/${stigmataSet.id}-set`}>
                  {stigmataSet.name}
                </PageLink>
              </Heading>
              <SecondaryLabel>{stigmataSet.altName}</SecondaryLabel>
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
    </Honkai3rdLayout>
  )
}

export default SingleStigmataPage
