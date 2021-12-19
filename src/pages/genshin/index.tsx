import { Box, Heading, Paragraph } from '@theme-ui/components'
import React from 'react'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import RootNavigator from '../../components/organisms/RootNavigator'

const GenshinIndexPage = () => {
  return (
    <Box>
      <RootNavigator />

      <Box p={3}>
        <Breadcrumb items={[{ href: 'genshin', label: 'Genshin' }]} />
        <Heading as='h1'>Genshin</Heading>
        <Paragraph>Under Construction...</Paragraph>
      </Box>
    </Box>
  )
}

export default GenshinIndexPage
