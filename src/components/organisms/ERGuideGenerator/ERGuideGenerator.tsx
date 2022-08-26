/* eslint-disable @next/next/no-page-custom-font */
import { useCallback, useState } from 'react'
import { Box } from 'theme-ui'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import DifficultyBox from './DifficultyBox'
import FontHead from './FontHead'
import SignetBox from './SignetBox'
import { colors } from './styles'
import ValkBox from './ValkBox'
import {
  PopulatedSignetGroup,
  RemembranceSigil,
} from '../../../lib/honkai3rd/elysianRealm'
import SigilBox from './SigilBox'
import SupportBox from './SupportBox'
import DataForm from './DataForm'
import EquipmentBox from './EquipmentBox'
import { Data, DataUpdater, ExSignetType } from './types'

interface ERGuideGeneratorProps {
  weapons: WeaponData[]
  battlesuits: BattlesuitData[]
  exSignetGroup: PopulatedSignetGroup
  sigils: RemembranceSigil[]
}

const exSignetTypes: ExSignetType[] = ['start', '1st', '2nd', 'backup', 'na']

const ERGuideGenerator = ({
  weapons,
  battlesuits,
  exSignetGroup,
  sigils,
}: ERGuideGeneratorProps) => {
  const [data, setData] = useState<Data>({
    battlesuitId: 'vill-v',
    difficulty: 'corruption',
    exSignets:
      exSignetGroup.sets
        .find((set) => set.id === 'elysia-vill-v')
        ?.signets.map((signet, index) => {
          return {
            type: exSignetTypes[index],
            name: signet.name,
          }
        }) || [],
    supportSets: [
      { type: 'util', battlesuitIds: ['le', 'ae'] },
      { type: 'dps', battlesuitIds: ['br', 'ae'] },
    ],
    sigilSets: [
      {
        type: 'start',
        sigilIds: ['burden', 'it-will-be-written'],
      },
      {
        type: 'mid',
        sigilIds: ['burden', 'it-will-be-written'],
      },
      {
        type: 'end',
        sigilIds: ['burden', 'it-will-be-written'],
      },
    ],
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
          <SigilBox sigilSets={data.sigilSets} />
          <EquipmentBox />
        </Box>
      </Box>

      <DataForm
        exSignetGroup={exSignetGroup}
        battlesuits={battlesuits}
        updateData={updateData}
        data={data}
        sigils={sigils}
      />
    </Box>
  )
}

export default ERGuideGenerator
