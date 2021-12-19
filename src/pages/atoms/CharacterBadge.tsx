import React, { useMemo } from 'react'
import { Badge } from 'react-bootstrap'

interface CharacterBadgeProps {
  character: Character
}

const CharacterBadge = ({ character }: CharacterBadgeProps) => {
  const name = useMemo(() => {
    switch (character) {
      case 'kiana':
        return 'Kiana Kaslana'
      case 'bronya':
        return 'Bronya Zaychik'
      case 'mei':
        return 'Raiden Mei'
      case 'himeko':
        return 'Murata Himeko'
      case 'hua':
        return 'Fu Hua'
      case 'kallen':
        return 'Kallen Kaslana'
      case 'theresa':
        return 'Theresa Apocalypse'
      case 'rita':
        return 'Rita Rossweisse'
      case 'olenyevas':
        return 'Olenyevas'
      case 'seele':
        return 'Seele Vollerei'
      case 'yae':
        return 'Yae Sakura'
      default:
        return 'Undefined'
    }
  }, [])

  return <Badge>{name}</Badge>
}

export default CharacterBadge
