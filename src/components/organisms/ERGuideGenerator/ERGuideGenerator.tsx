/* eslint-disable @next/next/no-page-custom-font */
import { useCallback, useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import DifficultyBox from './DifficultyBox'
import FontHead from './FontHead'
import SignetBox from './SignetBox'
import { colors } from './styles'
import ValkBox from './ValkBox'
import { PopulatedSignetGroup } from '../../../lib/honkai3rd/elysianRealm'
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
  const [data, setData] = useState<Data>({
    battlesuitId: 'vill-v',
    difficulty: 'corruption',
    exSignets: [],
    supportSets: [
      { type: 'util', battlesuitIds: ['le', 'ae'] },
      { type: 'dps', battlesuitIds: ['br', 'ae'] },
    ],
    sigilSets: [],
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
        <Box sx={{ width: 960 }}>
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
            <SupportBox
              battlesuits={battlesuits}
              supportSets={data.supportSets}
            />
            <SigilBox />
            <EquipmentBox />
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1, p: 2 }}>
          <DataForm
            exSignetGroup={exSignetGroup}
            battlesuits={battlesuits}
            updateData={updateData}
            data={data}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default ERGuideGenerator
