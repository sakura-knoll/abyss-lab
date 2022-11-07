/** @jsxImportSource theme-ui */
import { Box, Heading, Text, Paragraph } from '@theme-ui/components'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import { useTranslation } from '../../lib/i18n'
import Head from '../../components/atoms/Head'
import Honkai3rdLayout from '../../components/layouts/Honkai3rdLayout'

import { getI18NProps } from '../../server/i18n'
import { NextPageContext } from 'next'
const AboutPage = () => {
  const { t } = useTranslation()
  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        canonicalHref={`/honkai3rd`}
      />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/about', label: 'About Abyss Lab' },
          ]}
        />
        <Heading as='h1'>About Abyss Lab</Heading>
        <Paragraph mb={3}>
          Abyss Lab is an unofficial Honkai Impact 3rd wiki. I, Sakura Knoll,
          have been making this for fun. If you find any issues or idea, please
          contact me via Github Issue Tracker or Discord.
        </Paragraph>

        <Heading as='h2' mb={3}>
          Copyright / License
        </Heading>

        <Heading as='h3'>Game Data</Heading>
        <Paragraph mb={3}>
          All game images and game data belong to{' '}
          <Text sx={{ fontWeight: 'bold' }}>miHoYo Co., Ltd</Text>. There is no
          license I can provide. I&apos;m using their assets for educational and
          research purpose{' '}
          <Text sx={{ fontWeight: 'bold' }}>
            without any permissions from them
          </Text>
          .
        </Paragraph>
        <Heading as='h3'>Other Resources</Heading>
        <Paragraph>
          Copyright 2021-2022 Sakura Knoll, Published under MIT License.
        </Paragraph>
      </Box>
    </Honkai3rdLayout>
  )
}

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      ...(await getI18NProps(locale)),
    },
  }
}

export default AboutPage
