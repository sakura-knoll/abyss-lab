/** @jsxImportSource theme-ui */
import { mdiClose, mdiMenuSwap } from '@mdi/js'
import Icon from '@mdi/react'
import { NavLink, Heading, Text, Box, Flex, IconButton, Switch, Label } from '@theme-ui/components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useColorMode } from 'theme-ui'
import { useTranslation } from '../../lib/i18n'
import NavItem from '../atoms/NavItem'
import Footer from '../v2/Footer'

interface Honkai3rdNavigatorProps {
  close?: () => void
}

const Honkai3rdNavigator = ({ close }: Honkai3rdNavigatorProps) => {
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  const { t } = useTranslation()
  const [colorMode, setColorMode] = useColorMode()
  return (
    <Box
      sx={{
        p: 2
      }}
    >
      {close != null && (
        <Flex
          sx={{
            position: 'sticky',
            display: ['block', 'none'],
            top: 0,
            height: 50,
            ml: -2,
            mt: -2
          }}
        >
          <IconButton sx={{ width: 50, height: 50 }} onClick={close}>
            <Icon path={mdiClose} size={1} />
          </IconButton>
        </Flex>
      )}

      <NextLink href="/" passHref>
        <NavLink mb={2}>Abyss Lab</NavLink>
      </NextLink>
      <Heading mb={3}>
        <NextLink href="/honkai3rd" passHref>
          <NavLink>{t('common.honkai-3rd')}</NavLink>
        </NextLink>
      </Heading>

      <Box sx={{ mb: 3 }}>
        <NavItem target="battlesuits" />
        <NavItem target="weapons" />
        <NavItem target="stigmata" />
        <NavItem target="elfs" />
        <NavItem target="elysian-realm" />
        <NavItem target="media" />
      </Box>

      <NextLink href={{ pathname, query }} locale={locale === 'en-US' ? 'ko-KR' : 'en-US'} as={asPath} passHref>
        <NavLink
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            px: 2,
            mb: 2
          }}
        >
          <Text>{locale === 'en-US' ? '🇺🇸 English(US)' : '🇰🇷 한국어'}</Text>
          <Icon path={mdiMenuSwap} size="20px" />
        </NavLink>
      </NextLink>
      <Box>
        <Flex
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            mb: 2
          }}
        >
          <Box>
            <Switch
              checked={colorMode === 'dark'}
              onChange={event => {
                setColorMode(event.target.checked ? 'dark' : 'default')
              }}
              sx={{
                width: 50,
                'input ~ &': {
                  backgroundColor: 'muted'
                },
                'input:checked ~ &': {
                  backgroundColor: 'primary'
                }
              }}
            />
          </Box>
          <Label>{colorMode === 'default' ? '☀️' : '🌙'}</Label>
        </Flex>
        <Footer />
      </Box>
    </Box>
  )
}

export default Honkai3rdNavigator
