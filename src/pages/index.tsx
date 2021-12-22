/** @jsxImportSource theme-ui */
import { Box } from '@theme-ui/components'
import Link from 'next/link'
import RootNavigator from '../components/organisms/RootNavigator'

const IndexPage = () => {
  return (
    <Box>
      <RootNavigator />

      <div>
        <Link href='/honkai3rd'>
          <a>
            <h2>Honkai 3rd</h2>
          </a>
        </Link>
      </div>
    </Box>
  )
}

export default IndexPage
