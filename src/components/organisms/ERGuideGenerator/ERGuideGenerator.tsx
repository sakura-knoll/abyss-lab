/* eslint-disable @next/next/no-page-custom-font */
import { useCallback, useMemo, useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import DifficultyBox from './DifficultyBox'
import FontHead from './FontHead'
import SignetBox from './SignetBox'
import { colors } from './styles'
import ValkBox from './ValkBox'
import {
  erVersions,
  PopulatedSignetGroup,
} from '../../../lib/honkai3rd/elysianRealm'
import SigilBox from './SigilBox'
import SupportBox from './SupportBox'
import DataForm from './DataForm'
import EquipmentBox from './EquipmentBox'
import { Data, DataUpdater } from './types'

interface ERGuideGeneratorProps {
  weapons: WeaponData[]
  battlesuits: BattlesuitData[]
  exSignetGroup: PopulatedSignetGroup
}

const ERGuideGenerator = ({
  weapons,
  battlesuits,
  exSignetGroup,
}: ERGuideGeneratorProps) => {
  const battlesuitOptions = useMemo(() => {
    return erVersions
      .reduce<string[]>((battlesuitIds, version) => {
        return [...battlesuitIds, ...version.battlesuits]
      }, [])
      .map((battlesuitId) => {
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
  }, [battlesuits])

  const [data, setData] = useState<Data>({
    battlesuitId: battlesuitOptions[0].value,
    difficulty: 'corruption',
    exSignets: [],
  })

  const updateData = useCallback<DataUpdater>(
    (key, value) => {
      setData((previousData) => {
        const newData = {
          ...previousData,
          [key]: value,
        }

        return newData
      })
    },
    [setData]
  )

  return (
    <Box>
      <FontHead />
      <Flex>
        <Box
          sx={{
            width: 960,
            height: 640,
            position: 'relative',
            backgroundColor: colors.backgroundColor,
            color: '#FFF',
          }}
        >
          <SignetBox />
          <DifficultyBox difficulty={data.difficulty} />
          <ValkBox
            battlesuitId={data.battlesuitId}
            exSignets={data.exSignets}
          />
          <SupportBox />
          <SigilBox />
          <EquipmentBox />
        </Box>

        <Box sx={{ flexGrow: 1, p: 2 }}>
          <DataForm
            exSignetGroup={exSignetGroup}
            battlesuitOptions={battlesuitOptions}
            updateData={updateData}
            data={data}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default ERGuideGenerator
