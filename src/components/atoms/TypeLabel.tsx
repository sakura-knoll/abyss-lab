/** @jsxImportSource theme-ui */
import { Flex, Text } from '@theme-ui/components'
import { useRouter } from 'next/router'
import { battlesuitTypes } from '../../lib/honkai3rd/battlesuits'
import { translate } from '../../lib/i18n'
import { capitalize } from '../../lib/string'
import SquareImageBox from './SquareImageBox'

interface TypeLabelProps {
  type: string
}

const TypeLabel = ({ type }: TypeLabelProps) => {
  const battlesuitType = battlesuitTypes.find((aType) => aType.value === type)

  const { locale } = useRouter()
  const label =
    battlesuitType != null
      ? translate(
          locale,
          { 'ko-KR': battlesuitType.krLabel },
          battlesuitType.label
        )
      : capitalize(type)

  return (
    <Flex sx={{ alignItems: 'center' }}>
      {isValidType(type) && (
        <SquareImageBox
          size={30}
          src={`/assets/honkai3rd/type-icons/${type}.png`}
          alt={label}
          mr={1}
        />
      )}
      <Text>{label}</Text>
    </Flex>
  )
}

export default TypeLabel

function isValidType(type: string): boolean {
  switch (type) {
    case 'mecha':
    case 'biologic':
    case 'psychic':
    case 'quantum':
    case 'imaginary':
      return true
  }
  return false
}
