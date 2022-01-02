/** @jsxImportSource theme-ui */
import { Flex, Text } from '@theme-ui/components'
import { battlesuitFeatures } from '../../lib/honkai3rd/battlesuits'
import SquareImageBox from './SquareImageBox'

interface BattlesuitFeatureLabelProps {
  feature: string
}

const BattlesuitFeatureLabel = ({ feature }: BattlesuitFeatureLabelProps) => {
  const featureData = battlesuitFeatures.find(
    (aFeature) => aFeature.value === feature
  )
  if (featureData == null) {
    return <Text>{feature}</Text>
  }
  const { label, icon } = featureData
  return (
    <Flex sx={{ alignItems: 'center' }}>
      {featureData != null && (
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

export default BattlesuitFeatureLabel
