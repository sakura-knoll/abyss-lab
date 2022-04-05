/** @jsxImportSource theme-ui */
import { Box, Heading, Flex, Text } from '@theme-ui/components'
import { NextPageContext } from 'next'
import Breadcrumb from '../../../../components/organisms/Breadcrumb'

import { generateI18NPaths, getI18NProps } from '../../../../server/i18n'
import { useTranslation } from '../../../../lib/i18n'
import Head from '../../../../components/atoms/Head'
import Honkai3rdLayout from '../../../../components/layouts/Honkai3rdLayout'
import {
  PopulatedSignetGroup,
  signetGroups,
} from '../../../../lib/honkai3rd/elysianRealm'
import { getSignetGroupById } from '../../../../server/data/honkai3rd/elysianRealm'
import SignetCard from '../../../../components/molecules/SignetCard'
import SignetGroupNavigator from '../../../../components/organisms/SignetGroupNavigator'
import SquareImageBox from '../../../../components/atoms/SquareImageBox'
import { assetsBucketBaseUrl } from '../../../../lib/consts'
import PageLink from '../../../../components/atoms/PageLink'

interface SignetShowPageProps {
  signetId: string
  signetGroup: PopulatedSignetGroup
}

const SignetShowPage = ({ signetId, signetGroup }: SignetShowPageProps) => {
  const { t } = useTranslation()

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.honkai-3rd')}: ${signetGroup.name} - ${t(
          'common.abyss-lab'
        )}`}
        description={`${t('common.honkai-3rd')} ${t('elysian-realm.signet')}`}
      />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: '/honkai3rd/elysian-realm',
              label: t('common.elysian-realm'),
            },
            {
              href: `/honkai3rd/elysian-realm/signets/${signetId}`,
              label: signetGroup.name,
            },
          ]}
        />

        <Box sx={{ mb: 4 }}>
          <SignetGroupNavigator size={'sm'} />
        </Box>
        <Heading as='h1' sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <SquareImageBox
            mr={2}
            size={40}
            alt={signetGroup.name}
            src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/signets/${signetGroup.id}.png`}
          />{' '}
          {signetGroup.name} {t('elysian-realm.signets')}
        </Heading>

        {signetGroup.sets.map((set) => {
          const signetType = set.id.split('-')[1]
          return (
            <Box key={set.id} sx={{ mb: 4 }}>
              <Heading as='h2' sx={{ mb: 2 }}>
                {signetGroup.id === 'elysia' ? (
                  <PageLink
                    href={`/honkai3rd/elysian-realm/battlesuits/${signetType}`}
                  >
                    <Flex sx={{ alignItems: 'center' }}>
                      <SquareImageBox
                        size={30}
                        mr={2}
                        src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${signetType}.png`}
                      />
                      <Text>{set.name}</Text>
                    </Flex>
                  </PageLink>
                ) : (
                  set.name
                )}
              </Heading>
              <Box>
                {set.signets.map((signet) => {
                  return <SignetCard key={signet.id} signet={signet} />
                })}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Honkai3rdLayout>
  )
}

export default SignetShowPage

export async function getStaticProps({
  params,
  locale,
}: NextPageContext & { params: { signetId: string } }) {
  const { signetId } = params

  return {
    props: {
      signetId,
      signetGroup: getSignetGroupById(signetId, locale),
      ...(await getI18NProps(locale)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: generateI18NPaths(
      signetGroups.map((signet) => {
        return {
          params: { signetId: signet.id },
        }
      })
    ),
    fallback: false,
  }
}
