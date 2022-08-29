import { useMemo } from 'react'
import ReactSelect, { components } from 'react-select'
import { Flex, Image } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { signetGroups } from '../../../lib/honkai3rd/elysianRealm'

interface SignetGroupSelectProps {
  instanceId: string
  value: string
  onChange: (newValue: string) => void
}

const SignetGroupSelect = ({
  instanceId,
  value,
  onChange,
}: SignetGroupSelectProps) => {
  const options = useMemo(() => {
    return signetGroups.slice(1).map((signetGroup) => {
      return {
        value: signetGroup.id,
        label: signetGroup.krAltName,
      }
    })
  }, [])

  const currentOption = options.find((option) => option.value === value)

  return (
    <ReactSelect
      instanceId={instanceId}
      value={currentOption}
      onChange={(option) => {
        if (option == null) {
          return
        }
        onChange(option.value)
      }}
      options={options}
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
                    src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/signets/${props.data.value}.png`}
                    sx={{ flexShrink: 0, mr: 2 }}
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
                    src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/signets/${props.data.value}.png`}
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

export default SignetGroupSelect
