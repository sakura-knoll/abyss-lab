import ReactSelect, { components } from 'react-select'
import { Flex, Image } from 'theme-ui'
import { useMemo } from 'react'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { StigmataData } from '../../../lib/honkai3rd/stigmata'

interface StigmaSelectProps {
  instanceId: string
  value: string
  optionIds: string[]
  stigmata: StigmataData[]
  onChange: (newValue: string) => void
}

const StigmaSelect = ({
  instanceId,
  optionIds,
  stigmata,
  onChange,
  value,
}: StigmaSelectProps) => {
  const stigmaOptions = useMemo(() => {
    return optionIds.map((stigmaId) => {
      const stigma = stigmata.find((aStigma) => {
        return aStigma.id === stigmaId
      })
      if (stigma == null) {
        return {
          value: 'unknown',
          label: 'unknown',
        }
      }
      return {
        value: stigma.id,
        label: stigma.name,
      }
    })
  }, [optionIds, stigmata])

  const stigma = useMemo(
    () =>
      stigmata.find((aStigma) => {
        return aStigma.id === value
      }),
    [value, stigmata]
  )

  return (
    <ReactSelect
      instanceId={instanceId}
      value={
        stigma != null
          ? {
              label: stigma.name,
              value: stigma.id,
            }
          : null
      }
      onChange={(option) => {
        if (option == null) {
          return
        }
        onChange(option.value)
      }}
      options={stigmaOptions}
      components={{
        SingleValue: (props) => {
          return (
            <>
              <components.SingleValue {...props}>
                <Flex sx={{ alignItems: 'center', color: 'black' }}>
                  <Image
                    width={20}
                    height={20}
                    alt={props.data.label}
                    src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${props.data.value}.png`}
                    sx={{ mr: 2, flexShrink: 0 }}
                  />
                  {props.children}
                </Flex>
              </components.SingleValue>
            </>
          )
        },
        Option: (props) => {
          return (
            <>
              <components.Option {...props}>
                <Flex sx={{ alignItems: 'center', color: 'black' }}>
                  <Image
                    width={20}
                    height={20}
                    alt={props.data.label}
                    src={`${assetsBucketBaseUrl}/honkai3rd/stigmata/icon-${props.data.value}.png`}
                    sx={{ mr: 2, flexShrink: 0 }}
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

export default StigmaSelect
