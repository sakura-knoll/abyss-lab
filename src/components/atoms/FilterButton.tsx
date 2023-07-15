/** @jsxImportSource theme-ui */
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Link } from 'theme-ui'

interface FilterButtonProps {
  active?: boolean
  icon?: string
  href: string
  m?: string | number
  children: ReactNode
}

const FilterButton = ({ active = false, children, href, m }: FilterButtonProps) => {
  const { push } = useRouter()
  return (
    <Link
      href={href}
      m={m}
      py={1}
      px={2}
      className={active ? 'active' : ''}
      sx={{ display: 'flex' }}
      variant="buttons.primary"
      onClick={event => {
        event.preventDefault()
        push(href, href, { shallow: true })
      }}
    >
      {children}
    </Link>
  )
}

export default FilterButton
