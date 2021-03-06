/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph, Link } from '@theme-ui/components'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { getI18NProps } from 'server/i18n'
import { NextPageContext } from 'next'

const MediaPage = () => {
  const { t } = useTranslation()

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.media')} - ${t('common.honkai-3rd')} - ${t(
          'common.abyss-lab'
        )}`}
        description={''}
      />
      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/media', label: t('common.media') },
          ]}
        />

        <Heading as='h1'>{t('common.media')}</Heading>
        <Heading as='h2'>{t('common.novels')}</Heading>

        <Box sx={{ mb: 3, pl: 2 }} as='ul'>
          <Box as='li'>
            <Link href={'/honkai3rd/novels/ae'} target='_blank'>
              πΊπΈ Anti-Entropy Beta
            </Link>
          </Box>
          <Box as='li'>
            <Link href={'/honkai3rd/novels/duriduri'} target='_blank'>
              πΊπΈ Durandal Beta
            </Link>
          </Box>
          <Box as='li'>
            <Link href={'/honkai3rd/novels/7s'} target='_blank'>
              πΊπΈ Seven Swords (WIP)
            </Link>
          </Box>
          <Box as='li'>
            <Link href={'/ko-KR/honkai3rd/novels/ae'} target='_blank'>
              π°π· λ€κ²νΈλ‘νΌ Beta(μμμ€)
            </Link>
          </Box>
          <Box as='li'>
            <Link href={'/ko-KR/honkai3rd/novels/duriduri'} target='_blank'>
              π°π· λλλ¬ Beta(μμμ€)
            </Link>
          </Box>
          <Box as='li'>
            <Link href={'/ko-KR/honkai3rd/novels/7s'} target='_blank'>
              π°π· μ μ£Όμ κ²λ‘ (μμμ€)
            </Link>
          </Box>
        </Box>

        <Paragraph>Other novels will be available one day.</Paragraph>
      </Box>
    </Honkai3rdLayout>
  )
}

export default MediaPage

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      ...(await getI18NProps(locale)),
    },
  }
}
