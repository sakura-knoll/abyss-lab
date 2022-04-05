/** @jsxImportSource theme-ui */
import { mdiClose, mdiMenuSwap } from '@mdi/js'
import Icon from '@mdi/react'
import {
  NavLink,
  Heading,
  Text,
  Box,
  Flex,
  IconButton,
} from '@theme-ui/components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { useTranslation } from '../../lib/i18n'
import SquareImageBox from '../atoms/SquareImageBox'

interface Honkai3rdNavigatorProps {
  close: () => void
}

const Honkai3rdNavigator = ({ close }: Honkai3rdNavigatorProps) => {
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Flex
        sx={{
          position: 'sticky',
          display: ['block', 'none'],
          top: 0,
          height: 50,
          ml: -2,
          mt: -2,
        }}
      >
        <IconButton sx={{ width: 50, height: 50 }} onClick={close}>
          <Icon path={mdiClose} size={1} />
        </IconButton>
      </Flex>
      <NextLink href='/' passHref>
        <NavLink mb={2}>Abyss Lab</NavLink>
      </NextLink>
      <Heading mb={3}>
        <NextLink href='/honkai3rd' passHref>
          <NavLink>{t('common.honkai-3rd')}</NavLink>
        </NextLink>
      </Heading>

      <Box sx={{ mb: 3 }}>
        <NavItem target='versions' />
        <NavItem target='battlesuits' />
        <NavItem target='weapons' />
        <NavItem target='stigmata' />
        <NavItem target='elfs' />
        <NavItem target='elysian-realm' />
      </Box>

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
            px: 2,
            mb: 2,
          }}
        >
          <Text>{locale === 'en-US' ? '🇺🇸 English(US)' : '🇰🇷 한국어'}</Text>
          <Icon path={mdiMenuSwap} size='20px' />
        </NavLink>
      </NextLink>
    </Box>
  )
}

export default Honkai3rdNavigator

interface NavItemProps {
  target:
    | 'versions'
    | 'battlesuits'
    | 'stigmata'
    | 'weapons'
    | 'elfs'
    | 'elysian-realm'
}

const NavItem = ({ target }: NavItemProps) => {
  const { t } = useTranslation()
  return (
    <NextLink href={`/honkai3rd/${target}`} passHref>
      <NavLink
        sx={{
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          p: 1,
        }}
      >
        <SquareImageBox
          size={30}
          mr={1}
          src={`${assetsBucketBaseUrl}/honkai3rd/nav-icons/${target}.png`}
        />
        <Text
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {t(`common.${target}`)}
          {target === 'elysian-realm' ? ` (${t('common.wip')})` : ''}
        </Text>
      </NavLink>
    </NextLink>
  )
}
