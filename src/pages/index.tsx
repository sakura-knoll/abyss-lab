/** @jsxImportSource theme-ui */
import { Box, Text } from '@theme-ui/components'
import PageLink from '../components/atoms/PageLink'
import Image from 'next/image'
import RootNavigator from '../components/organisms/RootNavigator'
import Head from '../components/atoms/Head'

const IndexPage = () => {
  return (
    <Box>
      <Head title='Abyss Lab - Unofficial Honkai3rd/Genshin Wiki' />
      <RootNavigator />
      <Box sx={{ p: 3 }}>
        <Box mb={4}>
          <PageLink href='/honkai3rd'>
            <Box sx={{ position: 'relative' }}>
              <Image
                alt='Honkai 3rd Wallpaper'
                src='/assets/honkai3rd/wallpaper.png'
                width={640}
                height={360}
                layout='responsive'
              />
            </Box>
            <Text sx={{ fontSize: 3 }}>Honkai 3rd</Text>
          </PageLink>
        </Box>
        <Box mb={4}>
          <PageLink href='/genshin'>
            <Text sx={{ fontSize: 3 }}>Genshin (Under Construction)</Text>
          </PageLink>
        </Box>
      </Box>
    </Box>
  )
}

export default IndexPage
