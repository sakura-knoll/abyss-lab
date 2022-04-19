/** @jsxImportSource theme-ui */
import {
  Box,
  Heading,
  Flex,
  Card,
  Paragraph,
  Badge,
} from '@theme-ui/components'
import Breadcrumb from '../../../components/organisms/Breadcrumb'

import { NextPageContext } from 'next'
import { getI18NProps } from '../../../server/i18n'
import { useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { SupportBattlesuit } from '../../../lib/honkai3rd/elysianRealm'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { getSupportBattlesuits } from '../../../server/data/honkai3rd/elysianRealm'

interface BattlesuitListPageProps {
  supportBattlesuits: SupportBattlesuit[]
}

const ElysianRealmIndexPage = ({
  supportBattlesuits,
}: BattlesuitListPageProps) => {
  const { t } = useTranslation()

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('elysian-realm.supports')} (${t(
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
              href: '/honkai3rd/elysian-realm/support-battlesuits',
              label: t('elysian-realm.supports'),
            },
          ]}
        />

        <Heading as='h1' mb={3}>
          {t('elysian-realm.supports')}
        </Heading>

        <Box sx={{ mb: 3 }}>
          {supportBattlesuits.map(
            ({ id, name, skillName, description, cooldown }) => {
              return (
                <Card key={id} sx={{ p: 2, mb: 2 }} id={id}>
                  <Flex>
                    <SquareImageBox
                      size={50}
                      alt={name}
                      src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${id}.png`}
                      mr={2}
                    />

                    <Box>
                      <Heading as='h3' mb={0}>
                        {name} - {skillName}
                      </Heading>
                      <Badge variant='secondary'>Cooldown: {cooldown}s</Badge>
                      <Paragraph sx={{ whiteSpace: 'pre-wrap' }}>
                        {description}
                      </Paragraph>
                    </Box>
                  </Flex>
                </Card>
              )
            }
          )}
        </Box>
      </Box>
    </Honkai3rdLayout>
  )
}

export default ElysianRealmIndexPage

export async function getStaticProps({ locale }: NextPageContext) {
  const supportBattlesuits = getSupportBattlesuits(locale)

  return {
    props: {
      supportBattlesuits,
      ...(await getI18NProps(locale)),
    },
  }
}
