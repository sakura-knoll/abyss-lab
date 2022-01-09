/** @jsxImportSource theme-ui */
import { Box, Text } from '@theme-ui/components'
import PageLink from '../components/atoms/PageLink'
import SquareImageBox from '../components/atoms/SquareImageBox'
import RootNavigator from '../components/organisms/RootNavigator'

const IndexPage = () => {
  return (
    <Box>
      <RootNavigator />
      <Box sx={{ p: 3 }}>
        <Box mb={4}>
          <PageLink href='/honkai3rd'>
            <Text sx={{ fontSize: 3 }}>Honkai 3rd</Text>
            <SquareImageBox size={280} src='/assets/honkai3rd/banner.png' />
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
