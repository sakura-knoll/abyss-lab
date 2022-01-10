/** @jsxImportSource theme-ui */
import { Box, Heading, Text, Flex, Link } from '@theme-ui/components'
import { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../components/organisms/Honkai3rdNavigator'
import { NextPageContext } from 'next'
import { getI18NProps } from '../../server/i18n'
import { useTranslation } from '../../lib/i18n'
import PageLink from '../../components/atoms/PageLink'
import SquareImageBox from '../../components/atoms/SquareImageBox'
import { mdiGithub } from '@mdi/js'
import { Icon } from '@mdi/react'
import Head from '../../components/atoms/Head'

const bannerValkyries = [
  'kiana',
  'mei',
  'bronya',
  'theresa',
  'fuhua',
  'bianka',
  'rita',
  'carole',
]

const Honkai3rdIndexPage = () => {
  const { t } = useTranslation()
  const [bannerIndex, setBannerIndex] = useState(0)

  const switchBanner = useCallback(() => {
    setBannerIndex((previousBannerIndex) => {
      return (previousBannerIndex + 1) % bannerValkyries.length
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      switchBanner()
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [bannerIndex, switchBanner])

  return (
    <Box>
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: Home - Abyss Lab`}
        description={t('index.description')}
      />
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[{ href: 'honkai3rd', label: t('breadcrumb.honkai-3rd') }]}
        />
        <Heading as='h1'>{t('nav.honkai-3rd')} </Heading>

        <Box
          sx={{ position: 'relative', mb: 3, width: 280, height: 280 }}
          onClick={switchBanner}
        >
          {bannerValkyries.map((valkyrie, index) => (
            <BannerItem
              key={valkyrie}
              valkyrie={valkyrie}
              active={bannerIndex === index}
            />
          ))}
        </Box>

        <Box mb={3}>
          <NavItem target='versions' />
          <NavItem target='battlesuits' />
          <NavItem target='weapons' />
          <NavItem target='stigmata' />
          <NavItem target='elfs' />
        </Box>

        <Box>
          <Link
            href='https://github.com/sakura-knoll/abyss-lab'
            target='_blank'
            rel='noopener noreferrer'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <Icon path={mdiGithub} size='1rem' />
            </Box>
            <Text>Source Code</Text>
          </Link>
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

interface BannerItemProps {
  valkyrie: string
  active: boolean
}

const BannerItem = ({ valkyrie, active }: BannerItemProps) => {
  return (
    <Box
      className={active ? 'active' : ''}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 280,
        height: 280,
        opacity: 0,
        transition: 'opacity 500ms ease-in-out',
        '&.active': { opacity: 1 },
      }}
    >
      <SquareImageBox
        size={280}
        src={`/assets/honkai3rd/banner-${valkyrie}.png`}
      />
    </Box>
  )
}
