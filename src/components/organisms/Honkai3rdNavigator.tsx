/** @jsxImportSource theme-ui */
import { NavLink, Heading, Flex } from '@theme-ui/components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const Honkai3rdNavigator = () => {
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  const { t } = useTranslation()

  return (
    <Flex mx={3} sx={{ alignItems: 'center' }}>
      <Flex sx={{ alignItems: 'center', height: 50 }} mr={3}>
        <Heading margin={0}>
          <NextLink href='/' passHref>
            <NavLink mr={2}>Abyss Lab</NavLink>
          </NextLink>
          :
          <NextLink href='/honkai3rd' passHref>
            <NavLink ml={2}>{t('nav.honkai-3rd')}</NavLink>
          </NextLink>
        </Heading>
      </Flex>
      <NextLink href='/honkai3rd/versions' passHref>
        <NavLink mr={3} sx={{ fontFamily: 'monospace' }}>
          {t('nav.versions')}
        </NavLink>
      </NextLink>
      <Flex sx={{ height: 40, alignItems: 'center' }}>
        <NextLink href='/honkai3rd/battlesuits' passHref>
          <NavLink mr={3} sx={{ fontFamily: 'monospace' }}>
            {t('nav.battlesuits')}
          </NavLink>
        </NextLink>
        <NextLink href='/honkai3rd/weapons' passHref>
          <NavLink mr={3} sx={{ fontFamily: 'monospace' }}>
            {t('nav.weapons')}
          </NavLink>
        </NextLink>
        <NextLink href='/honkai3rd/stigmata' passHref>
          <NavLink mr={3} sx={{ fontFamily: 'monospace' }}>
            {t('nav.stigmata')}
          </NavLink>
        </NextLink>
        <NextLink href='/honkai3rd/elfs' passHref>
          <NavLink mr={3} sx={{ fontFamily: 'monospace' }}>
            {t('nav.elfs')}
          </NavLink>
        </NextLink>
        <NextLink
          href={{ pathname, query }}
          locale={locale === 'en-US' ? 'ko-KR' : 'en-US'}
          as={asPath}
          passHref
        >
          <NavLink>{locale === 'en-US' ? '🇺🇸' : '🇰🇷'}</NavLink>
        </NextLink>
      </Flex>
    </Flex>
  )
}

export default Honkai3rdNavigator
