import { Button } from '@theme-ui/components'
import React, { useCallback } from 'react'
import SquareImageBox from './SquareImageBox'

interface FilterButtonProps {
  active?: boolean
  icon?: string
  label: string
  setFilter: (filter: string) => void
  value: string
  m?: string | number
}

const FilterButton = ({
  active = false,
  setFilter,
  icon,
  label,
  value,
  m,
}: FilterButtonProps) => {
  const selectFilter = useCallback(() => {
    setFilter(value)
  }, [setFilter, value])
  return (
    <Button
      m={m}
      py={1}
      px={2}
      onClick={selectFilter}
      className={active ? 'active' : ''}
      sx={{ display: 'flex' }}
    >
      {icon != null && (
        <SquareImageBox
          src={`/assets/honkai3rd/${icon}.png`}
          alt={label}
          size={30}
          mr={1}
        />
      )}
      {label}
    </Button>
  )
}

export default FilterButton
