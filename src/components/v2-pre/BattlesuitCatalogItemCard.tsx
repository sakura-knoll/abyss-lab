import { Box } from 'theme-ui'
import { BattlesuitCatalogItem } from '../../lib/v2-pre/data/types'
import BattlesuitAvatarIcon from './BattlesuitAvatarIcon'

interface BattlesuitCatalogItemCardProps {
  battlesuit: BattlesuitCatalogItem
  label?: boolean
}

const BattlesuitCatalogItemCard = ({ battlesuit, label = false }: BattlesuitCatalogItemCardProps) => {
  return (
    <Box
      sx={{
        mb: 2,
        transform: 'scale(1)',
        transition: 'transform 200ms ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}
    >
      <BattlesuitAvatarIcon battlesuit={battlesuit} />
      <Box
        sx={{
          textAlign: 'center',
          overflow: 'hidden',
          width: 110,
          marginLeft: -10,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {battlesuit.fullName}
      </Box>
    </Box>
  )
}

export default BattlesuitCatalogItemCard
