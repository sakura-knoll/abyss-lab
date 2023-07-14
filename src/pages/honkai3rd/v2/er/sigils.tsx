import { NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { Box, Card, Flex, Heading } from 'theme-ui'
import Head from '../../../../components/atoms/Head'
import Honkai3rdLayout from '../../../../components/layouts/Honkai3rdLayout'
import Breadcrumb from '../../../../components/organisms/Breadcrumb'
import MaterialIcon from '../../../../components/v2/MaterialIcon'
import { ErSigil } from '../../../../lib/v2/data/types'
import { loadErSigils } from '../../../../lib/v2/server/loadData'
import { getI18NProps } from '../../../../server/i18n'

interface SigilsPageProps {
  erSigils: ErSigil[]
}

const SigilsPage = ({ erSigils }: SigilsPageProps) => {
  const { t } = useTranslation()

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('elysian-realm.remembrance-sigil')} (${t('common.elysian-realm')}) - ${t(
          'common.honkai-3rd'
        )} - ${t('common.abyss-lab')}`}
        description={`${t('common.elysian-realm')} ${t('elysian-realm.supports')}`}
        canonicalHref={`/honkai3rd/v2/er/sigils`}
      />

      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: '/honkai3rd/v2/er',
              label: t('common.elysian-realm')
            },
            {
              href: '/honkai3rd/v2/er/sigils',
              label: t('elysian-realm.remembrance-sigil')
            }
          ]}
        />

        <Heading as="h1">ER Sigils</Heading>

        <Card mb={3}>
          {erSigils.map(sigil => {
            return (
              <Flex
                key={sigil.id}
                sx={{
                  borderBottom: 'default',
                  '&:last-child': {
                    borderBottom: 'none'
                  }
                }}
              >
                <Box sx={{ p: 1, flexShrink: 0, borderRight: 'default' }}>
                  <MaterialIcon materialId={sigil.id} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Heading as="h3" sx={{ m: 0, p: 1, borderBottom: 'default' }} id={sigil.id}>
                    {sigil.name}
                  </Heading>
                  <Box p={1}>{sigil.desc}</Box>
                </Box>
              </Flex>
            )
          })}
        </Card>
      </Box>
    </Honkai3rdLayout>
  )
}

export default SigilsPage

export async function getStaticProps({ locale }: NextPageContext) {
  const erSigils = loadErSigils()

  return {
    props: { erSigils, ...(await getI18NProps(locale)) }
  }
}
