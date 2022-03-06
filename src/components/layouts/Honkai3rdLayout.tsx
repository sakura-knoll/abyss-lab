/** @jsxImportSource theme-ui */

import { mdiMenu } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useCallback, useState } from 'react'
import { Box, Flex, IconButton } from 'theme-ui'
import Honkai3rdNavigator from '../organisms/Honkai3rdNavigator'

const Honkai3rdLayout: React.FC = ({ children }) => {
  const [hiddenMobileNav, setHiddenMobileNav] = useState(true)

  const close = useCallback(() => {
    setHiddenMobileNav(true)
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
          borderRightColor: 'gray.2',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: [hiddenMobileNav ? 'none' : 'block', 'block'],
        }}
      >
        <Honkai3rdNavigator close={close} />
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <Flex
          sx={{
            position: 'sticky',
            display: ['block', 'none'],
            top: 0,
            height: 50,
            bg: 'rgba(255,255,255,0.8)',
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
      </Box>
    </Flex>
  )
}

export default Honkai3rdLayout
