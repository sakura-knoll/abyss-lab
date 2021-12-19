/** @jsxImportSource theme-ui */
import { NavLink, Heading, Flex } from '@theme-ui/components'
import NextLink from 'next/link'

const RootNavigator = () => {
  return (
    <Flex mx={3} sx={{ alignItems: 'center' }}>
      <Flex sx={{ alignItems: 'center', height: 50 }} mr={3}>
        <Heading margin={0}>
          <NextLink href='/' passHref>
            <NavLink>Abyss Lab</NavLink>
          </NextLink>
        </Heading>
      </Flex>
      <Flex sx={{ height: 40, alignItems: 'center' }}>
        <NextLink href='/genshin' passHref>
          <NavLink mr={3}>Genshin</NavLink>
        </NextLink>
        <NextLink href='/honkai3rd' passHref>
          <NavLink mr={3}>Honkai 3rd</NavLink>
        </NextLink>
      </Flex>
    </Flex>
  )
}

export default RootNavigator
