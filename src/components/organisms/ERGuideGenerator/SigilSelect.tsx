import { RemembranceSigil } from '../../../lib/honkai3rd/elysianRealm'
import ReactSelect, { components } from 'react-select'
import { Flex, Image } from 'theme-ui'
import { memo, useMemo } from 'react'
import { assetsBucketBaseUrl } from '../../../lib/consts'

interface SigilSelectProps {
  instanceId: string
  value: string
  optionIds: string[]
  sigils: RemembranceSigil[]
  onChange: (newValue: string) => void
}

const SigilSelect = ({
  instanceId,
  optionIds,
  sigils,
  onChange,
  value,
}: SigilSelectProps) => {
  const sigilOptions = useMemo(() => {
    return optionIds.map((sigilId) => {
      const sigil = sigils.find((aSigil) => {
        return aSigil.id === sigilId
      })
      if (sigil == null) {
        return {
          value: 'unknown',
          label: 'unknown',
        }
      }
      return {
        value: sigil.id,
        label: sigil.name,
      }
    })
  }, [optionIds, sigils])

  const sigil = useMemo(
    () =>
      sigils.find((sigil) => {
        return sigil.id === value
      }),
    [sigils, value]
  )

  return (
    <ReactSelect
      instanceId={instanceId}
      value={
        sigil != null
          ? {
              label: sigil.name,
              value: sigil.id,
            }
          : null
      }
      onChange={(option) => {
        if (option == null) {
          return
        }
        onChange(option.value)
      }}
      options={sigilOptions}
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
                    src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/${props.data.value}.png`}
                    mr={2}
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
                    src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/remembrance-sigils/${props.data.value}.png`}
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

export default memo(SigilSelect)
