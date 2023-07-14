import Link from 'next/link'
import { Box } from 'theme-ui'

const HomePage = () => {
  return (
    <div>
      <h1>V2 Pre</h1>
      <Box>
        <Link href="/v2-pre/battlesuits">Battlesuits</Link>
      </Box>
      <Box>
        <Link href="/v2-pre/weapons">Weapons</Link>
      </Box>
      <Box>
        <Link href="/v2-pre/stigmata">Stigmata</Link>
      </Box>
      <Box>
        <Link href="/v2-pre/stigmata-sets">StigmataSets</Link>
      </Box>
      <Box>
        <Link href="/v2-pre/elfs">Elfs</Link>
      </Box>
      <Box>
        <Link href="/v2-pre/er">Elysian Realm</Link>
      </Box>
    </div>
  )
}

export default HomePage
