/** @jsxImportSource theme-ui */
import PageLink from './PageLink'
import SquareImageBox from './SquareImageBox'

interface FilterButtonProps {
  active?: boolean
  icon?: string
  label: string
  value: string
  m?: string | number
}

const FilterButton = ({
  active = false,
  icon,
  label,
  value,
  m,
}: FilterButtonProps) => {
  return (
    <PageLink
      href={{ query: { filter: value } }}
      shallow={true}
      m={m}
      py={1}
      px={2}
      className={active ? 'active' : ''}
      sx={{ display: 'flex' }}
      variant='buttons.primary'
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
    </PageLink>
  )
}

export default FilterButton
