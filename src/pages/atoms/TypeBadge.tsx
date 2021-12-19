import React, { useMemo } from 'react'
import { Badge } from 'react-bootstrap'
import { BattlesuitType } from '../../data/honkai3rd/battlesuits'

interface TypeBadgeProps {
  type: BattlesuitType
}

const TypeBadge = ({ type }: TypeBadgeProps) => {
  const { name, backgroundColor } = useMemo(() => {
    switch (type) {
      case 'psychic':
        return {
          name: 'Psychic',
          backgroundColor: 'pink',
        }
      case 'mecha':
        return {
          name: 'Mechanic',
          backgroundColor: 'blue',
        }
      case 'biologic':
        return {
          name: 'Biologic',
          backgroundColor: 'orange',
        }
      case 'quantum':
        return {
          name: 'Quantum',
          backgroundColor: 'purple',
        }
      case 'imginary':
        return {
          name: 'Imaginery',
          backgroundColor: 'yellow',
        }
      default:
        return {
          name: 'Unknown',
          backgroundColor: 'gray',
        }
    }
  }, [type])

  return (
    <Badge bg='' style={{ backgroundColor }}>
      {name}
    </Badge>
  )
}

export default TypeBadge
