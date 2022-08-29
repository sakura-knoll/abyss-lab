import { useCallback, useMemo } from 'react'
import { Box, Flex, Label } from 'theme-ui'
import { StigmataData } from '../../../lib/honkai3rd/stigmata'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import StigmaSelect from './StigmaSelect'
import { ERGGDataUpdater, ERGGEquipmentSet } from './types'
import WeaponSelect from './WeaponSelect'

interface EquipmentSetControlProps {
  index: number
  equipmentSet: ERGGEquipmentSet
  updateData: ERGGDataUpdater
  weapons: WeaponData[]
  stigmata: StigmataData[]
  topStigmaIds: string[]
  midStigmaIds: string[]
  botStigmaIds: string[]
}

const EquipmentSetControl = ({
  index,
  equipmentSet,
  updateData,
  weapons,
  stigmata,
  topStigmaIds,
  midStigmaIds,
  botStigmaIds,
}: EquipmentSetControlProps) => {
  const handleWeaponChange = useCallback(
    (newValue: string) => {
      updateData('equipmentSets', (previousEquipmentSets) => {
        const newEquipmentSets = previousEquipmentSets.slice()
        newEquipmentSets[index] = {
          ...newEquipmentSets[index],
          weapon: newValue,
        }
        return newEquipmentSets
      })
    },
    [index, updateData]
  )
  const weaponIds = useMemo(() => weapons.map((weapon) => weapon.id), [weapons])

  const handleTopStigmaChange = useCallback(
    (newValue: string) => {
      updateData('equipmentSets', (previousEquipmentSets) => {
        const newEquipmentSets = previousEquipmentSets.slice()
        newEquipmentSets[index] = {
          ...newEquipmentSets[index],
          top: newValue,
        }
        return newEquipmentSets
      })
    },
    [index, updateData]
  )

  const handleMidStigmaChange = useCallback(
    (newValue: string) => {
      updateData('equipmentSets', (previousEquipmentSets) => {
        const newEquipmentSets = previousEquipmentSets.slice()
        newEquipmentSets[index] = {
          ...newEquipmentSets[index],
          mid: newValue,
        }
        return newEquipmentSets
      })
    },
    [index, updateData]
  )

  const handleBotStigmaChange = useCallback(
    (newValue: string) => {
      updateData('equipmentSets', (previousEquipmentSets) => {
        const newEquipmentSets = previousEquipmentSets.slice()
        newEquipmentSets[index] = {
          ...newEquipmentSets[index],
          bot: newValue,
        }
        return newEquipmentSets
      })
    },
    [index, updateData]
  )

  return (
    <Box>
      <Box>{equipmentSet.type === 'best' ? '베스트' : '대체'}</Box>
      <Flex sx={{ alignItems: 'center' }}>
        <Box sx={{ mr: 2 }}>
          <Label>무기</Label>
        </Box>
        <Box sx={{ flexShrink: 0, flex: 1 }}>
          <WeaponSelect
            instanceId={`equipment-${index}-weapon`}
            value={equipmentSet.weapon}
            onChange={handleWeaponChange}
            weapons={weapons}
            optionIds={weaponIds}
          />
        </Box>
      </Flex>
      <Flex sx={{ alignItems: 'center' }}>
        <Box sx={{ mr: 2 }}>
          <Label>상단</Label>
        </Box>
        <Box sx={{ flexShrink: 0, flex: 1 }}>
          <StigmaSelect
            instanceId={`equipment-${index}-top`}
            value={equipmentSet.top}
            onChange={handleTopStigmaChange}
            stigmata={stigmata}
            optionIds={topStigmaIds}
          />
        </Box>
      </Flex>
      <Flex sx={{ alignItems: 'center' }}>
        <Box sx={{ mr: 2 }}>
          <Label>중단</Label>
        </Box>
        <Box sx={{ flexShrink: 0, flex: 1 }}>
          <StigmaSelect
            instanceId={`equipment-${index}-mid`}
            value={equipmentSet.mid}
            onChange={handleMidStigmaChange}
            stigmata={stigmata}
            optionIds={midStigmaIds}
          />
        </Box>
      </Flex>
      <Flex sx={{ alignItems: 'center' }}>
        <Box sx={{ mr: 2 }}>
          <Label>하단</Label>
        </Box>
        <Box sx={{ flexShrink: 0, flex: 1 }}>
          <StigmaSelect
            instanceId={`equipment-${index}-bot`}
            value={equipmentSet.bot}
            onChange={handleBotStigmaChange}
            stigmata={stigmata}
            optionIds={botStigmaIds}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default EquipmentSetControl
