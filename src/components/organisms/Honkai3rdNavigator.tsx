/** @jsxImportSource theme-ui */
import { mdiClose, mdiMenu, mdiMenuRight, mdiMenuSwap } from '@mdi/js'
import Icon from '@mdi/react'
import {
  NavLink,
  Heading,
  Flex,
  Text,
  Box,
  IconButton,
  Link,
} from '@theme-ui/components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useTranslation } from '../../lib/i18n'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

const Honkai3rdNavigator = () => {
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  const { t } = useTranslation()

  const [hiddenMobileNav, setHiddenMobileNav] = useState(true)

  const close = useCallback(() => {
    setHiddenMobileNav(true)
  }, [])

  return (
    <Flex
      mx={3}
      sx={{
        alignItems: 'center',
        position: 'sticky',
        backgroundColor: 'rgba(255,255,255,0.9)',
        top: 0,
        zIndex: 100,
      }}
    >
      <Flex
        sx={{ alignItems: 'center', height: 50, display: ['none', 'flex'] }}
        mr={3}
      >
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

      <Flex sx={{ height: 50, display: ['flex', 'none'] }}>
        <IconButton
          sx={{ width: 50, height: 50, ml: -3 }}
          onClick={() => setHiddenMobileNav(false)}
        >
          <Icon path={mdiMenu} size={1} />
        </IconButton>
      </Flex>
      <Box
        sx={{
          display: hiddenMobileNav ? 'none' : 'block',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'auto',
          px: 3,
          backgroundColor: 'white',
        }}
      >
        <Flex
          sx={{
            height: 50,
            top: 0,
            position: 'sticky',
            backgroundColor: 'rgba(255,255,255,0.9)',
          }}
        >
          <IconButton
            sx={{ width: 50, height: 50, ml: -3 }}
            onClick={() => setHiddenMobileNav(true)}
          >
            <Icon path={mdiClose} size={1} />
          </IconButton>
        </Flex>

        <Box>
          <NavMobileItem href='/' label='Abyss Lab Home' close={close} />
          <NavMobileItem
            href='/honkai3rd'
            label={`${t('nav.honkai-3rd')} Home`}
            close={close}
          />

          <Honkai3rdNavMobileItem target='versions' close={close} />
          <Honkai3rdNavMobileItem target='battlesuits' close={close} />
          <Honkai3rdNavMobileItem target='weapons' close={close} />
          <Honkai3rdNavMobileItem target='stigmata' close={close} />
          <Honkai3rdNavMobileItem target='elfs' close={close} />
        </Box>
      </Box>
      <Flex
        sx={{
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <Flex
          sx={{ height: 40, alignItems: 'center', display: ['none', 'flex'] }}
        >
          <NavItem target='versions' />
          <NavItem target='battlesuits' />
          <NavItem target='weapons' />
          <NavItem target='stigmata' />
          <NavItem target='elfs' />
        </Flex>
        <Box />
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
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Text>
                {locale === 'en-US' ? (
                  '🇺🇸'
                ) : (
                  <>
                    🇰🇷 <small>(한글화 작업 중)</small>
                  </>
                )}
              </Text>
              <Icon path={mdiMenuSwap} size='20px' />
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

interface Honkai3rdNavMobileItemProps {
  target: 'versions' | 'battlesuits' | 'stigmata' | 'weapons' | 'elfs'
  close: () => void
}

const Honkai3rdNavMobileItem = ({
  target,
  close,
}: Honkai3rdNavMobileItemProps) => {
  const { push } = useRouter()
  const { t } = useTranslation()
  const href = `/honkai3rd/${target}`
  return (
    <PageLink
      href={href}
      sx={{
        fontFamily: 'monospace',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        mb: 2,
      }}
      onClick={(event) => {
        event.preventDefault()
        close()
        push(href)
      }}
    >
      <SquareImageBox
        size={40}
        mr={1}
        src={`/assets/honkai3rd/nav-icons/${target}.png`}
      />
      <Text
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 3,
        }}
      >
        {t(`nav.${target}`)}
      </Text>
    </PageLink>
  )
}

interface NavMobileItemProps {
  href: string
  label: string
  close: () => void
}

const NavMobileItem = ({ href, label, close }: NavMobileItemProps) => {
  const { push } = useRouter()
  return (
    <Link
      href={href}
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'monospace',
        height: 40,
        fontSize: 3,
        mb: 2,
      }}
      onClick={(event) => {
        event.preventDefault()
        close()
        push(href)
      }}
    >
      <Flex
        sx={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          mr: 1,
        }}
      >
        <Icon path={mdiMenuRight} size={'30px'} />
      </Flex>
      <Text>{label}</Text>
    </Link>
  )
}
