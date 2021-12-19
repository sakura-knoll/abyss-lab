import { Box, Heading, Link, Image } from '@theme-ui/components'
import NextLink from 'next/link'
import React from 'react'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../components/organisms/Honkai3rdNavigator'

const Honkai3rdIndexPage = () => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb items={[{ href: 'honkai3rd', label: 'Honkai 3rd' }]} />
        <Heading as='h1'>Honkai 3rd</Heading>
        <Box>
          <Image src='/assets/honkai3rd/wallpaper.png' width='100%' />
        </Box>
        <Box>
          <NextLink href={`/honkai3rd/battlesuits`} passHref>
            <Link>Battlesuits</Link>
          </NextLink>
        </Box>
        <Box>
          <NextLink href={`/honkai3rd/stigmata`} passHref>
            <Link>Stigmata</Link>
          </NextLink>
        </Box>
      </Box>
    </Box>
  )
}

export default Honkai3rdIndexPage
