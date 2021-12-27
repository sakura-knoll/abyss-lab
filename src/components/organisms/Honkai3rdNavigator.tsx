/** @jsxImportSource theme-ui */
import { NavLink, Heading, Flex } from '@theme-ui/components'
import NextLink from 'next/link'

const Honkai3rdNavigator = () => {
  return (
    <Flex mx={3} sx={{ alignItems: 'center' }}>
      <Flex sx={{ alignItems: 'center', height: 50 }} mr={3}>
        <Heading margin={0}>
          <NextLink href='/' passHref>
            <NavLink mr={2}>Abyss Lab</NavLink>
          </NextLink>
          :
          <NextLink href='/honkai3rd' passHref>
            <NavLink ml={2}>Honkai 3rd</NavLink>
          </NextLink>
        </Heading>
      </Flex>
      <NextLink href='/honkai3rd/versions' passHref>
        <NavLink mr={3} sx={{ fontFamily: 'monospace' }}>
          Versions
        </NavLink>
      </NextLink>
      <Flex sx={{ height: 40, alignItems: 'center' }}>
        <NextLink href='/honkai3rd/battlesuits' passHref>
          <NavLink mr={3} sx={{ fontFamily: 'monospace' }}>
            Battlesuits
          </NavLink>
        </NextLink>
        <NextLink href='/honkai3rd/weapons' passHref>
          <NavLink mr={3} sx={{ fontFamily: 'monospace' }}>
            Weapons
          </NavLink>
        </NextLink>
        <NextLink href='/honkai3rd/stigmata' passHref>
          <NavLink mr={3} sx={{ fontFamily: 'monospace' }}>
            Stigmata
          </NavLink>
        </NextLink>
        <NextLink href='/honkai3rd/elfs' passHref>
          <NavLink mr={3} sx={{ fontFamily: 'monospace' }}>
            ELFs
          </NavLink>
        </NextLink>
      </Flex>
    </Flex>
  )
}

export default Honkai3rdNavigator
