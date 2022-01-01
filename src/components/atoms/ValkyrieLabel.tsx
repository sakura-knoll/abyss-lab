import { Flex, Text } from '@theme-ui/components'
import { valkyries } from '../../lib/honkai3rd/battlesuits'
import SquareImageBox from './SquareImageBox'

interface ValkyrieLabelProps {
  valkyrie: string
}

const ValkyrieLabel = ({ valkyrie }: ValkyrieLabelProps) => {
  const { icon, label } = valkyries.find(
    (aValkyrie) => aValkyrie.value === valkyrie
  ) || { label: valkyrie }

  return (
    <Flex sx={{ alignItems: 'center' }}>
      {icon && (
        <SquareImageBox
          size={30}
          src={`/assets/honkai3rd/${icon}.png`}
          alt={label}
          mr={1}
        />
      )}
      <Text>{label}</Text>
    </Flex>
  )
}

export default ValkyrieLabel
