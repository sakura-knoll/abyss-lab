/** @jsxImportSource theme-ui */
import { Flex, Text } from '@theme-ui/components'
import { useRouter } from 'next/router'
import { battlesuitFeatures } from '../../lib/honkai3rd/battlesuits'
import { translate } from '../../lib/i18n'
import SquareImageBox from './SquareImageBox'

interface BattlesuitFeatureLabelProps {
  feature: string
}

const BattlesuitFeatureLabel = ({ feature }: BattlesuitFeatureLabelProps) => {
  const { locale } = useRouter()
  const featureData = battlesuitFeatures.find(
    (aFeature) => aFeature.value === feature
  )
  if (featureData == null) {
    return <Text>{feature}</Text>
  }

  const { label, icon, krLabel } = featureData

  const translatedLabel = translate(locale, { 'ko-KR': krLabel }, label)

  return (
    <Flex sx={{ alignItems: 'center' }}>
      {featureData != null && (
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

export default BattlesuitFeatureLabel
