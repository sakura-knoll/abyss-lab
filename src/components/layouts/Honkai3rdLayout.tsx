/** @jsxImportSource theme-ui */
import { mdiArrowUp, mdiDiscord, mdiGithub, mdiLink, mdiMenu } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useCallback, useRef, useState } from 'react'
import { Box, Flex, IconButton, Link, Text } from 'theme-ui'
import Honkai3rdNavigator from '../organisms/Honkai3rdNavigator'
import NextLink from 'next/link'

const Honkai3rdLayout: React.FC = ({ children }) => {
  const [hiddenMobileNav, setHiddenMobileNav] = useState(true)
  const contentBoxRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  const close = useCallback(() => {
    setHiddenMobileNav(true)
  }, [])

  const handleScroll = useCallback(() => {
    if (contentBoxRef.current == null) {
      return
    }

    if (contentBoxRef.current.scrollTop === 0) {
      return setScrolled(false)
    }
    if (scrolled) {
      return
    }
    setScrolled(true)
  }, [scrolled])

  const scrollToTop = useCallback(() => {
    if (contentBoxRef.current == null) {
      return
    }

    contentBoxRef.current.scrollTop = 0
  }, [])

  return (
    <Flex
      sx={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: ['100%', 240],
          borderRightWidth: 1,
          borderRightStyle: 'solid',
          borderRightColor: 'border',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: [hiddenMobileNav ? 'none' : 'block', 'block'],
        }}
      >
        <Honkai3rdNavigator close={close} />
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
        }}
        onScroll={handleScroll}
        ref={contentBoxRef}
      >
        <IconButton
          sx={{
            width: 50,
            height: 50,
            position: 'absolute',
            bottom: 1,
            right: 1,
            zIndex: 1000,
            pointerEvents: scrolled ? 'auto' : 'none',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 200ms ease-in-out',
            backgroundColor: 'transparent',
          }}
          onClick={scrollToTop}
        >
          <Icon path={mdiArrowUp} size={1} />
        </IconButton>
        <Flex
          sx={{
            position: 'sticky',
            display: ['block', 'none'],
            top: 0,
            height: 50,
            bg: 'transparent',
          }}
        >
          <IconButton
            sx={{ width: 50, height: 50 }}
            onClick={() => setHiddenMobileNav(false)}
          >
            <Icon path={mdiMenu} size={1} />
          </IconButton>
        </Flex>

        {children}

        <Box py={3}>
          <Flex
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: ['column', 'column', 'column', 'row'],
            }}
          >
            <NextLink href='/honkai3rd/about' passHref>
              <Link
                sx={{
                  mb: 2,
                }}
              >
                About Abyss Lab
              </Link>
            </NextLink>
            <Text sx={{ mx: 2, display: ['none', 'none', 'none', 'block'] }}>
              /
            </Text>
            <Link
              href='https://github.com/sakura-knoll/abyss-lab'
              target='_blank'
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon path={mdiGithub} size='20px' />
              <Text sx={{ ml: 1 }}>GitHub(Source Code)</Text>
            </Link>
            <Text sx={{ mx: 2, display: ['none', 'none', 'none', 'block'] }}>
              /
            </Text>
            <Link
              href='https://discord.gg/UnrM9T9PRs'
              target='_blank'
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon path={mdiDiscord} size='20px' />
              <Text sx={{ ml: 1 }}>Discord (EN)</Text>
            </Link>
            <Text sx={{ mx: 2, display: ['none', 'none', 'none', 'block'] }}>
              /
            </Text>
            <Link
              href='https://arca.live/b/cherryhill'
              target='_blank'
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon path={mdiLink} size='20px' />
              <Text sx={{ ml: 1 }}>arca.live (KR)</Text>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}

export default Honkai3rdLayout
