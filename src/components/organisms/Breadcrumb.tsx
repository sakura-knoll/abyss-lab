/** @jsxImportSource theme-ui */
import { mdiChevronRight, mdiHome } from '@mdi/js'
import Icon from '@mdi/react'
import { NavLink, Flex } from '@theme-ui/components'
import NextLink from 'next/link'
import React from 'react'

interface BreadcrumbItem {
  href: string
  label: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <Flex
      mb={3}
      sx={{
        backgroundColor: 'gray.2',
        paddingY: 2,
        paddingX: 4,
        borderRadius: 8,
        alignItems: 'center',
      }}
    >
      <NextLink passHref href='/'>
        <NavLink sx={{ display: 'flex' }}>
          <Icon size={0.8} path={mdiHome} />
        </NavLink>
      </NextLink>
      {items.map((item) => {
        return (
          <React.Fragment key={item.href}>
            <Icon size={0.8} path={mdiChevronRight} />
            <NextLink passHref href={item.href}>
              <NavLink>{item.label}</NavLink>
            </NextLink>
          </React.Fragment>
        )
      })}
    </Flex>
  )
}

export default Breadcrumb
