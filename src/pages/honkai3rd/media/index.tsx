/** @jsxImportSource theme-ui */
import { Box, Heading, Link } from '@theme-ui/components'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { getI18NProps } from 'server/i18n'
import { NextPageContext } from 'next'
import NextLink from 'next/link'

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
        <Box sx={{ mb: 3 }}>
          <Heading as='h2'>{t('common.novels')}</Heading>

          <Box sx={{ mb: 3, pl: 2 }} as='ul'>
            <Box as='li'>
              <Link href={'/honkai3rd/novels/ae'} target='_blank'>
                🇺🇸 Anti-Entropy Beta
              </Link>
            </Box>
            <Box as='li'>
              <Link href={'/honkai3rd/novels/duriduri'} target='_blank'>
                🇺🇸 Durandal Beta
              </Link>
            </Box>
            <Box as='li'>
              <Link href={'/honkai3rd/novels/7s'} target='_blank'>
                🇺🇸 Seven Swords (WIP)
              </Link>
            </Box>
            <Box as='li'>
              <Link href={'/ko-KR/honkai3rd/novels/ae'} target='_blank'>
                🇰🇷 네겐트로피 Beta
              </Link>
            </Box>
            <Box as='li'>
              <Link href={'/ko-KR/honkai3rd/novels/duriduri'} target='_blank'>
                🇰🇷 듀란달 Beta(작업중)
              </Link>
            </Box>
            <Box as='li'>
              <Link href={'/ko-KR/honkai3rd/novels/7s'} target='_blank'>
                🇰🇷 신주절검록 (작업중)
              </Link>
            </Box>
          </Box>
        </Box>

        <Heading as='h2'>Abyss Lab Custom</Heading>
        <Box sx={{ mb: 3, pl: 2 }} as='ul'>
          <Box as='li'>
            <NextLink href='/honkai3rd/media/pomodoro' passHref>
              <Link>Pomodoro Timer</Link>
            </NextLink>
          </Box>
        </Box>
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
