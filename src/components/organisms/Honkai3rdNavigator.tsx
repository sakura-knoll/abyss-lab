/** @jsxImportSource theme-ui */
import { NavLink, Heading, Flex, Text } from '@theme-ui/components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from '../../lib/i18n'
import SquareImageBox from '../atoms/SquareImageBox'

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
      <Flex sx={{ justifyContent: 'space-between', flex: 1 }}>
        <Flex sx={{ height: 40, alignItems: 'center' }}>
          <NavItem target='versions' />
          <NavItem target='battlesuits' />
          <NavItem target='weapons' />
          <NavItem target='stigmata' />
          <NavItem target='elfs' />
        </Flex>
        <Flex sx={{ height: 40, alignItems: 'center' }}>
          <NextLink
            href={{ pathname, query }}
            locale={locale === 'en-US' ? 'ko-KR' : 'en-US'}
            as={asPath}
            passHref
          >
            <NavLink
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {locale === 'en-US' ? (
                '🇺🇸'
              ) : (
                <>
                  🇰🇷 <small>(한글화 작업 중)</small>
                </>
              )}
            </NavLink>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Honkai3rdNavigator

interface NavItemProps {
  target: 'versions' | 'battlesuits' | 'stigmata' | 'weapons' | 'elfs'
}

const NavItem = ({ target }: NavItemProps) => {
  const { t } = useTranslation()
  return (
    <NextLink href={`/honkai3rd/${target}`} passHref>
      <NavLink
        mr={3}
        sx={{
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <SquareImageBox
          size={20}
          mr={1}
          src={`/assets/honkai3rd/nav-icons/${target}.png`}
        />
        <Text
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {t(`nav.${target}`)}
        </Text>
      </NavLink>
    </NextLink>
  )
}
