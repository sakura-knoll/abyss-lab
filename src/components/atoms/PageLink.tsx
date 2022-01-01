/** @jsxImportSource theme-ui */
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link, LinkProps } from '@theme-ui/components'

type PageLinkProps = Omit<LinkProps, 'href'> &
  Pick<NextLinkProps, 'href' | 'shallow'>

const PageLink = ({ href, shallow, ...otherProps }: PageLinkProps) => {
  return (
    <NextLink href={href} shallow={shallow} passHref={true}>
      <Link {...otherProps} />
    </NextLink>
  )
}

export default PageLink
