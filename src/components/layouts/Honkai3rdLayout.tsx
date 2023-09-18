/** @jsxImportSource theme-ui */
import { mdiArrowUp, mdiMenu } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useCallback, useRef, useState } from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import Honkai3rdNavigator from '../organisms/Honkai3rdNavigator'

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
        flexDirection: 'column'
      }}
    >
      <Box sx={{ flexShrink: 0, px: 3 }}>
        <h3>We have decided to stop updating in-game data since v6.9</h3>
        <p>
          This is because we cannot extract in-game data anymore. If you can help us to extract the data, please join
          our discord channel and ping @s4kuraknoll.{' '}
          <a href="https://discord.gg/UnrM9T9PRs" target="_blank" rel="noreferrer">
            https://discord.gg/UnrM9T9PRs
          </a>
        </p>
      </Box>
      <Flex sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            width: ['100%', 240],
            borderRightWidth: 1,
            borderRightStyle: 'solid',
            borderRightColor: 'border',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: [hiddenMobileNav ? 'none' : 'block', 'block']
          }}
        >
          <Honkai3rdNavigator close={close} />
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollBehavior: 'smooth'
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
              backgroundColor: 'transparent'
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
              bg: 'transparent'
            }}
          >
            <IconButton sx={{ width: 50, height: 50 }} onClick={() => setHiddenMobileNav(false)}>
              <Icon path={mdiMenu} size={1} />
            </IconButton>
          </Flex>

          {children}
        </Box>
      </Flex>
    </Flex>
  )
}

export default Honkai3rdLayout
