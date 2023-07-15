import { mdiDiscord, mdiGithub, mdiLink } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { Box, Flex, Link, Text } from 'theme-ui'
import NextLink from 'next/link'

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <Box py={3}>
      <Flex
        sx={{
          flexDirection: 'column'
        }}
      >
        <NextLink href="/honkai3rd/about" passHref>
          <Link
            sx={{
              mb: 2
            }}
          >
            About Abyss Lab
          </Link>
        </NextLink>
        <Link
          href="https://github.com/sakura-knoll/abyss-lab"
          target="_blank"
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Icon path={mdiGithub} size="20px" />
          <Text sx={{ ml: 1 }}>GitHub(Source Code)</Text>
        </Link>
        <Link
          href="https://discord.gg/UnrM9T9PRs"
          target="_blank"
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Icon path={mdiDiscord} size="20px" />
          <Text sx={{ ml: 1 }}>Discord (EN)</Text>
        </Link>
        <Link
          href="https://arca.live/b/cherryhill"
          target="_blank"
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Icon path={mdiLink} size="20px" />
          <Text sx={{ ml: 1 }}>arca.live (KR)</Text>
        </Link>
      </Flex>
    </Box>
  )
}

export default Footer
