import { useMemo } from 'react'
import ReactSelect, { components } from 'react-select'
import { Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'

interface BattlesuitSelectProps {
  instanceId: string
  value: string
  optionIds: string[]
  battlesuits: BattlesuitData[]
  onChange: (newValue: string) => void
}

const BattlesuitSelect = ({
  instanceId,
  optionIds,
  value,
  battlesuits,
  onChange,
}: BattlesuitSelectProps) => {
  const battlesuitOptions = useMemo(() => {
    return optionIds.map((battlesuitId) => {
      const battlesuit = battlesuits.find((aBattlesuit) => {
        return aBattlesuit.id === battlesuitId
      })
      if (battlesuit == null) {
        return {
          value: 'unknown',
          label: 'unknown',
        }
      }
      return {
        value: battlesuit.id,
        label: battlesuit.name,
      }
    })
  }, [battlesuits, optionIds])

  const battlesuit = battlesuits.find((battlesuit) => {
    return battlesuit.id === value
  })

  return (
    <ReactSelect
      instanceId={instanceId}
      value={
        battlesuit != null
          ? {
              label: battlesuit.name,
              value: battlesuit.id,
            }
          : null
      }
      onChange={(option) => {
        if (option == null) {
          return
        }
        onChange(option.value)
      }}
      options={battlesuitOptions}
      components={{
        Option: (props) => {
          return (
            <>
              <components.Option {...props}>
                <Flex sx={{ alignItems: 'center', color: 'black' }}>
                  <Image
                    width={20}
                    height={20}
                    alt={props.data.label}
                    src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${props.data.value}.png`}
                    mr={2}
                  />
                  {props.children}
                </Flex>
              </components.Option>
            </>
          )
        },
      }}
    />
  )
}

export default BattlesuitSelect
