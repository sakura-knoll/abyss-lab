import { Box, Flex, Label, Select } from 'theme-ui'
import { Data, DataUpdater, ExSignetType } from './types'
import {
  erVersions,
  isGeneralSigil,
  PopulatedSignetGroup,
  RemembranceSigil,
  remembranceSigilIds,
  supportBattlesuitIds,
} from '../../../lib/honkai3rd/elysianRealm'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import DifficultySelect from './DifficultySelect'
import { getExSignetLabel } from './utils'
import BattlesuitSelect from './BattlesuitSelect'
import SigilSelect from './SigilSelect'

interface DataFormProps {
  updateData: DataUpdater
  data: Data
  battlesuits: BattlesuitData[]
  exSignetGroup: PopulatedSignetGroup
  sigils: RemembranceSigil[]
}

const DataForm = ({
  updateData,
  data,
  battlesuits,
  exSignetGroup,
  sigils,
}: DataFormProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <Flex sx={{ maxWidth: 960 }}>
      <Box sx={{ width: '50%', p: 2 }}>
        <Box>
          <Label>난이도</Label>
          <DifficultySelect
            onChange={(newValue) => updateData('difficulty', newValue)}
            value={data.difficulty}
          />
        </Box>
        <Box>
          <Label>발키리</Label>
          <BattlesuitSelect
            instanceId='battlesuit-select'
            battlesuits={battlesuits}
            optionIds={erVersions.reduce<string[]>((battlesuitIds, version) => {
              return [...battlesuitIds, ...version.battlesuits]
            }, [])}
            value={data.battlesuitId}
            onChange={(newValue) => {
              updateData('battlesuitId', newValue)
              const exSignetSet = exSignetGroup.sets.find((signetSet) => {
                return signetSet.id === `elysia-${newValue}`
              })
              if (exSignetSet != null) {
                updateData(
                  'exSignets',
                  exSignetSet.signets.map((signet, index) => {
                    return {
                      type:
                        data.exSignets[index] != null
                          ? data.exSignets[index].type
                          : 'na',
                      name: signet.name,
                    }
                  })
                )
              }
            }}
          />
        </Box>
        <Box>
          <Label>전용 각인</Label>
          <Flex>
            <Box>
              {data.exSignets.map((signet, index) => {
                return (
                  <Flex
                    key={index}
                    sx={{ p: 1, height: 35, alignItems: 'center' }}
                  >
                    <Select
                      value={signet.type}
                      sx={{ p: 0, width: 60, px: 1 }}
                      onChange={(event) => {
                        const newExSignets = data.exSignets.slice()
                        newExSignets[index] = {
                          ...data.exSignets[index],
                          type: event.target.value as ExSignetType,
                        }
                        updateData('exSignets', newExSignets)
                      }}
                    >
                      <option value='start'>시작</option>
                      <option value='1st'>우선</option>
                      <option value='2nd'>차선</option>
                      <option value='backup'>땜빵</option>
                      <option value='na'>미선택</option>
                    </Select>
                  </Flex>
                )
              })}
            </Box>
            <Box sx={{ flex: 1 }}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => {
                  const { active, over } = event
                  if (over == null) {
                    return
                  }

                  if (active.id !== over.id) {
                    const nameArray = data.exSignets.map(
                      (signet) => signet.name
                    )
                    const oldIndex = nameArray.indexOf(active.id as string)
                    const newIndex = nameArray.indexOf(over.id as string)
                    const newNameArray = arrayMove(
                      nameArray,
                      oldIndex,
                      newIndex
                    )
                    const newExSignets = data.exSignets.map((signet, index) => {
                      return {
                        ...signet,
                        name: newNameArray[index],
                      }
                    })
                    updateData('exSignets', newExSignets)
                  }
                }}
              >
                <SortableContext
                  items={data.exSignets.map((signet) => ({
                    id: signet.name,
                  }))}
                  strategy={verticalListSortingStrategy}
                >
                  {data.exSignets.map((signet) => (
                    <SortableItem key={signet.name} name={signet.name} />
                  ))}
                </SortableContext>
              </DndContext>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box sx={{ width: '50%', p: 2 }}>
        <Box>
          <Label>서포트 발키리</Label>
          {data.supportSets.map((supportSet, index) => {
            return (
              <Box key={index}>
                <Box>{supportSet.type === 'util' ? '유틸' : '딜링'}</Box>
                <Box>
                  <Box sx={{ mb: 1 }}>
                    <BattlesuitSelect
                      instanceId={`battlesuit-support-select-${index}-1`}
                      value={supportSet.battlesuitIds[0]}
                      optionIds={supportBattlesuitIds}
                      battlesuits={battlesuits}
                      onChange={(newValue) => {
                        const newSupportSets = data.supportSets.slice()
                        newSupportSets[index] = {
                          ...newSupportSets[index],
                          battlesuitIds: [
                            ...newSupportSets[index].battlesuitIds,
                          ],
                        }
                        newSupportSets[index].battlesuitIds[0] = newValue
                        if (
                          data.supportSets[index].battlesuitIds[1] === newValue
                        ) {
                          newSupportSets[index].battlesuitIds[1] =
                            data.supportSets[index].battlesuitIds[0]
                        }
                        updateData('supportSets', newSupportSets)
                      }}
                    />
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <BattlesuitSelect
                      instanceId={`battlesuit-support-select-${index}-2`}
                      value={supportSet.battlesuitIds[1]}
                      optionIds={supportBattlesuitIds}
                      battlesuits={battlesuits}
                      onChange={(newValue) => {
                        const newSupportSets = data.supportSets.slice()
                        newSupportSets[index] = {
                          ...newSupportSets[index],
                          battlesuitIds: [
                            ...newSupportSets[index].battlesuitIds,
                          ],
                        }
                        newSupportSets[index].battlesuitIds[1] = newValue
                        if (
                          data.supportSets[index].battlesuitIds[0] === newValue
                        ) {
                          newSupportSets[index].battlesuitIds[0] =
                            data.supportSets[index].battlesuitIds[1]
                        }
                        updateData('supportSets', newSupportSets)
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Label>증명</Label>
          {data.sigilSets.map((sigilSet, index) => {
            return (
              <Box key={index}>
                <Box>
                  {sigilSet.type === 'start'
                    ? '초반'
                    : sigilSet.type === 'mid'
                    ? '중반'
                    : '후반'}
                </Box>
                <SigilSelect
                  instanceId={`sigil-select-${index}-general`}
                  value={sigilSet.sigilIds[0]}
                  optionIds={remembranceSigilIds.filter(isGeneralSigil)}
                  sigils={sigils}
                  onChange={(newValue) => {
                    const newSigilSets = data.sigilSets.slice()
                    newSigilSets[index] = {
                      ...newSigilSets[index],
                      sigilIds: [newValue, newSigilSets[index].sigilIds[1]],
                    }
                    updateData('sigilSets', newSigilSets)
                  }}
                />
                <SigilSelect
                  instanceId={`sigil-select-${index}-support`}
                  value={sigilSet.sigilIds[1]}
                  optionIds={remembranceSigilIds.filter(
                    (sigilId) => !isGeneralSigil(sigilId)
                  )}
                  sigils={sigils}
                  onChange={(newValue) => {
                    const newSigilSets = data.sigilSets.slice()
                    newSigilSets[index] = {
                      ...newSigilSets[index],
                      sigilIds: [newSigilSets[index].sigilIds[0], newValue],
                    }
                    updateData('sigilSets', newSigilSets)
                  }}
                />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Flex>
  )
}

export default DataForm

export function SortableItem(props: { name: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.name })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Flex
        sx={{
          height: 35,
          cursor: 'ns-resize',
          alignItems: 'center',
          p: 1,
        }}
      >
        {getExSignetLabel(props.name)}
      </Flex>
    </div>
  )
}
