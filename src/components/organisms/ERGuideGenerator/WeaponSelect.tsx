import ReactSelect, { components } from 'react-select'
import { Flex, Image } from 'theme-ui'
import { useMemo } from 'react'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { WeaponData } from '../../../lib/honkai3rd/weapons'

interface WeaponSelectProps {
  instanceId: string
  value: string
  optionIds: string[]
  weapons: WeaponData[]
  onChange: (newValue: string) => void
}

const WeaponSelect = ({
  instanceId,
  optionIds,
  weapons,
  onChange,
  value,
}: WeaponSelectProps) => {
  const weaponOptions = useMemo(() => {
    return optionIds.map((weaponId) => {
      const weapon = weapons.find((aWeapon) => {
        return aWeapon.id === weaponId
      })
      if (weapon == null) {
        return {
          value: 'unknown',
          label: 'unknown',
        }
      }
      return {
        value: weapon.id,
        label: weapon.name,
      }
    })
  }, [optionIds, weapons])

  const weapon = useMemo(
    () =>
      weapons.find((aWeapon) => {
        return aWeapon.id === value
      }),
    [value, weapons]
  )

  return (
    <ReactSelect
      instanceId={instanceId}
      value={
        weapon != null
          ? {
              label: weapon.name,
              value: weapon.id,
            }
          : null
      }
      onChange={(option) => {
        if (option == null) {
          return
        }
        onChange(option.value)
      }}
      options={weaponOptions}
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
                    src={`${assetsBucketBaseUrl}/honkai3rd/weapons/${props.data.value}.png`}
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
                    src={`${assetsBucketBaseUrl}/honkai3rd/weapons/${props.data.value}.png`}
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

export default WeaponSelect
