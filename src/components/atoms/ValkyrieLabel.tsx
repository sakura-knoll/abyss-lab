/** @jsxImportSource theme-ui */
import { Flex, Text } from '@theme-ui/components'
import { useRouter } from 'next/router'
import { valkyries } from '../../lib/honkai3rd/battlesuits'
import { translate } from '../../lib/i18n'
import SquareImageBox from './SquareImageBox'

interface ValkyrieLabelProps {
  valkyrie: string
}

const ValkyrieLabel = ({ valkyrie }: ValkyrieLabelProps) => {
  const { icon, label, krLabel } = valkyries.find(
    (aValkyrie) => aValkyrie.value === valkyrie
  ) || { label: valkyrie, krLabel: valkyrie }
  const { locale } = useRouter()

  const translatedLabel = translate(locale, { 'ko-KR': krLabel }, label)

  return (
    <Flex sx={{ alignItems: 'center' }}>
      {icon && (
        <SquareImageBox
          size={30}
          src={`/assets/honkai3rd/${icon}.png`}
          alt={translatedLabel}
          mr={1}
        />
      )}
      <Text>{translatedLabel}</Text>
    </Flex>
  )
}

export default ValkyrieLabel
