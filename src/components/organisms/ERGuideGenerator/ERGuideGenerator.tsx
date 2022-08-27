/* eslint-disable @next/next/no-page-custom-font */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Button, Label, Textarea } from 'theme-ui'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import DifficultyBox from './DifficultyBox'
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
import { StigmataData } from '../../../lib/honkai3rd/stigmata'
import { saveAs } from 'file-saver'
import { toBlob } from 'html-to-image'

interface ERGuideGeneratorProps {
  weapons: WeaponData[]
  stigmata: StigmataData[]
  battlesuits: BattlesuitData[]
  exSignetGroup: PopulatedSignetGroup
  sigils: RemembranceSigil[]
}

const exSignetTypes: ExSignetType[] = ['start', '1st', '2nd', 'backup', 'na']

const ERGuideGenerator = ({
  weapons,
  stigmata,
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
    equipmentSets: [
      {
        type: 'best',
        weapon: 'vill-v-pri-weapon',
        top: 'carlo-collodi-top',
        mid: 'carlo-collodi-mid',
        bot: 'carlo-collodi-bot',
      },
      {
        type: 'alt',
        weapon: 'vill-v-pri-weapon',
        top: 'carlo-collodi-top',
        mid: 'carlo-collodi-mid',
        bot: 'carlo-collodi-bot',
      },
    ],
    signets: [
      {
        type: 'core',
        group: 'vill-v',
        nexus: 2,
        description:
          '테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트',
      },
      {
        type: 'core',
        group: 'vill-v',
        nexus: 2,
        description:
          '테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트',
      },
      {
        type: 'sub',
        group: 'vill-v',
        nexus: 2,
        description: '',
      },
      {
        type: 'sub',
        group: 'vill-v',
        nexus: 2,
        description: '',
      },
      {
        type: 'sub',
        group: 'vill-v',
        nexus: 2,
        description: '',
      },
    ],
  })
  const guideRef = useRef(null)

  const updateData = useCallback<DataUpdater>(
    (key, value) => {
      setData((previousData) => {
        const newData = {
          ...previousData,
          [key]: typeof value === 'function' ? value(previousData[key]) : value,
        }

        return newData
      })
    },
    [setData]
  )

  const [customStyle, setCustomStyle] = useState('')
  const loadedRef = useRef(false)
  useEffect(() => {
    if (loadedRef.current) {
      localStorage.setItem('ergg:customStyle', customStyle)
    } else {
      setCustomStyle(localStorage.getItem('ergg:customStyle') || '')
      loadedRef.current = true
    }
  }, [customStyle])

  return (
    <Box>
      <Box sx={{ width: 960 }}>
        <Box
          ref={guideRef}
          sx={{
            width: 960,
            height: 640,
            position: 'relative',
            backgroundColor: colors.backgroundColor,
            color: '#FFF',
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: customStyle,
            }}
          />
          <SignetBox signets={data.signets} />
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
          <EquipmentBox equipmentSets={data.equipmentSets} />
        </Box>
      </Box>

      <Box>
        <Button
          onClick={async () => {
            if (guideRef.current == null) {
              return
            }

            const blob = await toBlob(guideRef.current)

            if (blob == null) {
              return
            }
            saveAs(blob, 'guide.png')
          }}
        >
          Download
        </Button>
        <Box>
          <Label>Custom Style(Don't paste any suspicious scripts!!)</Label>
          <Textarea
            value={customStyle}
            onChange={(event) => {
              setCustomStyle(event.target.value)
            }}
          />
        </Box>
      </Box>

      <DataForm
        exSignetGroup={exSignetGroup}
        battlesuits={battlesuits}
        updateData={updateData}
        data={data}
        sigils={sigils}
        weapons={weapons}
        stigmata={stigmata}
      />
    </Box>
  )
}

export default ERGuideGenerator
