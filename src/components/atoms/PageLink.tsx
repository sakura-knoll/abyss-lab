/** @jsxImportSource theme-ui */
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link, LinkProps } from '@theme-ui/components'

type PageLinkProps = LinkProps & NextLinkProps

const PageLink = ({ href, ...otherProps }: PageLinkProps) => {
  return (
    <NextLink href={href} passHref={true}>
      <Link {...otherProps} />
    </NextLink>
  )
}

export default PageLink
