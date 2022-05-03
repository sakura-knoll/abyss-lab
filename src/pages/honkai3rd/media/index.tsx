/** @jsxImportSource theme-ui */
import {
  Box,
  Heading,
  Flex,
  Card,
  Image,
  Paragraph,
  Link,
} from '@theme-ui/components'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { assetsBucketBaseUrl } from 'lib/consts'
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

        <Flex sx={{ mb: 3 }}>
          <Link href={'/ko-KR/honkai3rd/novels/ae'} target='_blank'>
            <Card p={2}>
              <Image
                width={300}
                src={`${assetsBucketBaseUrl}/honkai3rd/novels/ae-ko-KR-banner.png`}
                alt='네겐트로피 Beta'
                sx={{ borderRadius: 5 }}
              />
              <Box sx={{ textAlign: 'center' }}>🇰🇷 네겐트로피 Beta(작업중)</Box>
            </Card>
          </Link>
        </Flex>

        <Paragraph>
          Other novels and English verions will be available one day.
        </Paragraph>
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
