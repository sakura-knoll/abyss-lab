/** @jsxImportSource theme-ui */
import { NavLink, Text } from '@theme-ui/components'
import NextLink from 'next/link'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { useTranslation } from '../../lib/i18n'
import SquareImageBox from '../atoms/SquareImageBox'

type NavItemTarget = 'battlesuits' | 'stigmata' | 'weapons' | 'elfs' | 'elysian-realm' | 'media'
interface NavItemProps {
  target: NavItemTarget
}

const NavItem = ({ target }: NavItemProps) => {
  const { t } = useTranslation()
  return (
    <NextLink href={getHref(target)} passHref>
      <NavLink
        sx={{
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          p: 1
        }}
      >
        <SquareImageBox size={30} mr={1} src={getIconByTarget(target)} />
        <Text
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {t(`common.${target}`)}
        </Text>
      </NavLink>
    </NextLink>
  )
}

export default NavItem

function getIconByTarget(target: string) {
  switch (target) {
    case 'versions':
      return `${assetsBucketBaseUrl}/honkai3rd/nav-icons/versions.webp`
    case 'media':
      return `${assetsBucketBaseUrl}/honkai3rd/nav-icons/grand-instructor.webp`
    default:
      return `${assetsBucketBaseUrl}/honkai3rd/nav-icons/${target}.png`
  }
}

function getHref(target: NavItemTarget) {
  switch (target) {
    case 'battlesuits':
    case 'weapons':
    case 'elfs':
      return `/honkai3rd/${target}`
    case 'stigmata':
      return '/honkai3rd/stigmata-sets'
    case 'elysian-realm':
      return '/honkai3rd/er'
  }
  return `/honkai3rd/${target}`
}
