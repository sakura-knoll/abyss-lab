/** @jsxImportSource theme-ui */
import { useRouter } from 'next/router'
import { Link, Text } from 'theme-ui'
import SquareImageBox from './SquareImageBox'

interface FilterButtonProps {
  active?: boolean
  icon?: string
  label: string
  value: string
  m?: string | number
  close?: () => void
}

const FilterButton = ({
  active = false,
  icon,
  label,
  value,
  m,
  close,
}: FilterButtonProps) => {
  const { push } = useRouter()
  return (
    <Link
      href={`?filter=${value}`}
      m={m}
      py={1}
      px={2}
      className={active ? 'active' : ''}
      sx={{ display: 'flex' }}
      variant='buttons.primary'
      onClick={(event) => {
        event.preventDefault()
        if (close != null) {
          close()
        }
        push({ query: { filter: value } }, undefined, { shallow: true })
      }}
    >
      {icon != null && (
        <SquareImageBox
          src={`/assets/honkai3rd/${icon}.png`}
          alt={label}
          size={30}
          mr={1}
        />
      )}
      <Text sx={{ lineHeight: '30px' }}>{label}</Text>
    </Link>
  )
}

export default FilterButton
