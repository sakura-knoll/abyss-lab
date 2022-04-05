/** @jsxImportSource theme-ui */
import { Box, Heading, Flex, Card, Paragraph } from '@theme-ui/components'
import Breadcrumb from '../../../components/organisms/Breadcrumb'

import { NextPageContext } from 'next'
import { getI18NProps } from '../../../server/i18n'
import { useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { RemembranceSigil } from '../../../lib/honkai3rd/elysianRealm'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { getRemembranceSigils } from '../../../server/data/honkai3rd/elysianRealm'

interface BattlesuitListPageProps {
  remembranceSigils: RemembranceSigil[]
}

const ElysianRealmIndexPage = ({
  remembranceSigils,
}: BattlesuitListPageProps) => {
  const { t } = useTranslation()

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('elysian-realm.remembrance-sigil')} (${t(
          'common.elysian-realm'
        )}) - ${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        description={`${t('common.elysian-realm')} ${t(
          'elysian-realm.supports'
        )}`}
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
              href: '/honkai3rd/elysian-realm/remembrance-sigils',
              label: t('elysian-realm.remembrance-sigil'),
            },
          ]}
        />

        <Heading as='h1' mb={3}>
          {t('elysian-realm.remembrance-sigil')}
        </Heading>

        <Box sx={{ mb: 3 }}>
          {remembranceSigils.map(({ id, name, description }) => {
            return (
              <Card key={id} sx={{ p: 2, mb: 2 }} id={id}>
                <Flex>
                  <SquareImageBox
                    size={50}
                    alt={name}
                    src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/${id}.png`}
                    mr={2}
                  />

                  <Box>
                    <Heading as='h3' mb={2}>
                      {name}
                    </Heading>
                    <Paragraph>{description}</Paragraph>
                  </Box>
                </Flex>
              </Card>
            )
          })}
        </Box>
      </Box>
    </Honkai3rdLayout>
  )
}

export default ElysianRealmIndexPage

export async function getStaticProps({ locale }: NextPageContext) {
  const remembranceSigils = getRemembranceSigils(locale)

  return {
    props: {
      remembranceSigils,
      ...(await getI18NProps(locale)),
    },
  }
}
