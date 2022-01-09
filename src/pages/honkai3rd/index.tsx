/** @jsxImportSource theme-ui */
import { Box, Heading, Text, Flex } from '@theme-ui/components'
import Image from 'next/image'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../components/organisms/Honkai3rdNavigator'
import { NextPageContext } from 'next'
import { getI18NProps } from '../../server/i18n'
import { useTranslation } from '../../lib/i18n'
import PageLink from '../../components/atoms/PageLink'
import SquareImageBox from '../../components/atoms/SquareImageBox'

const Honkai3rdIndexPage = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[{ href: 'honkai3rd', label: t('breadcrumb.honkai-3rd') }]}
        />
        <Heading as='h1'>{t('nav.honkai-3rd')}</Heading>
        <Box mb={3}>
          <NavItem target='versions' />
          <NavItem target='battlesuits' />
          <NavItem target='weapons' />
          <NavItem target='stigmata' />
          <NavItem target='elfs' />
        </Box>
        <Box mb={3} sx={{ position: 'relative', minHeight: 300 }}>
          <Image
            alt='Honkai 3rd Wallpaper'
            src='/assets/honkai3rd/wallpaper.png'
            width={640}
            height={360}
            layout='responsive'
          />
        </Box>
      </Box>
    </Box>
  )
}

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      ...(await getI18NProps(locale)),
    },
  }
}

export default Honkai3rdIndexPage

interface NavItemProps {
  target: 'versions' | 'battlesuits' | 'stigmata' | 'weapons' | 'elfs'
}

const NavItem = ({ target }: NavItemProps) => {
  const { t } = useTranslation()
  return (
    <Box mb={2}>
      <PageLink href={`/honkai3rd/${target}`}>
        <Box sx={{ display: 'inline-block' }}>
          <Flex sx={{ alignItems: 'center' }}>
            <SquareImageBox
              size={40}
              mr={1}
              src={`/assets/honkai3rd/nav-icons/${target}.png`}
            />
            <Text sx={{ fontSize: 3 }}>{t(`nav.${target}`)}</Text>
          </Flex>
        </Box>
      </PageLink>
    </Box>
  )
}
