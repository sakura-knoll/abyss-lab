import { Box, Flex, Image, Label, Select } from 'theme-ui'
import ReactSelect, { components } from 'react-select'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { Data, DataUpdater, ExSignetType } from './types'
import {
  erVersions,
  PopulatedSignetGroup,
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
import { useMemo } from 'react'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import DifficultySelect from './DifficultySelect'
import { getExSignetLabel } from './utils'

interface DataFormProps {
  updateData: DataUpdater
  data: Data
  battlesuits: BattlesuitData[]
  exSignetGroup: PopulatedSignetGroup
}

const DataForm = ({
  updateData,
  data,
  battlesuits,
  exSignetGroup,
}: DataFormProps) => {
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const supportBattlesuitOptions = useMemo(() => {
    return supportBattlesuitIds.map((battlesuitId) => {
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

  return (
    <Box>
      <Box>
        <Label>난이도</Label>
        <DifficultySelect
          onChange={(newValue) => updateData('difficulty', newValue)}
          value={data.difficulty}
        />
      </Box>
      <Box>
        <Label>발키리</Label>
        <ReactSelect
          instanceId={'battlesuit-select'}
          defaultValue={battlesuitOptions[0]}
          onChange={(option) => {
            if (option == null) {
              return
            }
            updateData('battlesuitId', option.value)
            const exSignetSet = exSignetGroup.sets.find((signetSet) => {
              return signetSet.id === `elysia-${option.value}`
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
          options={battlesuitOptions}
          components={{
            Option: (props) => {
              return (
                <>
                  <components.Option {...props}>
                    <Flex sx={{ alignItems: 'center', color: 'black' }}>
                      <Image
                        width={20}
                        height={20}
                        alt={props.data.label}
                        src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${props.data.value}.png`}
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
                  const nameArray = data.exSignets.map((signet) => signet.name)
                  const oldIndex = nameArray.indexOf(active.id as string)
                  const newIndex = nameArray.indexOf(over.id as string)
                  const newNameArray = arrayMove(nameArray, oldIndex, newIndex)
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
      <Box>
        <Label>서포트 발키리</Label>
        {data.supportSets.map((supportSet, index) => {
          const support1 = battlesuits.find((battlesuit) => {
            return battlesuit.id === supportSet.battlesuitIds[0]
          })
          const support2 = battlesuits.find((battlesuit) => {
            return battlesuit.id === supportSet.battlesuitIds[1]
          })

          return (
            <Box key={index}>
              <Box>{supportSet.type === 'util' ? '유틸' : '딜링'}</Box>
              <Box>
                <Box sx={{ mb: 1 }}>
                  <ReactSelect
                    instanceId={`battlesuit-support-select-${index}-1`}
                    value={
                      support1 != null
                        ? { label: support1.name, value: support1.id }
                        : null
                    }
                    onChange={(option) => {
                      if (option == null) {
                        return
                      }
                      const newSupportSets = data.supportSets.slice()
                      newSupportSets[index].battlesuitIds[0] = option.value
                      updateData('supportSets', newSupportSets)
                    }}
                    options={supportBattlesuitOptions}
                    components={{
                      Option: (props) => {
                        return (
                          <>
                            <components.Option {...props}>
                              <Flex
                                sx={{ alignItems: 'center', color: 'black' }}
                              >
                                <Image
                                  width={20}
                                  height={20}
                                  alt={props.data.label}
                                  src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${props.data.value}.png`}
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
                </Box>
                <Box sx={{ mb: 1 }}>
                  <ReactSelect
                    instanceId={`battlesuit-support-select-${index}-2`}
                    value={
                      support2 != null
                        ? { label: support2.name, value: support2.id }
                        : null
                    }
                    onChange={(option) => {
                      if (option == null) {
                        return
                      }
                      const newSupportSets = data.supportSets.slice()
                      newSupportSets[index].battlesuitIds[1] = option.value
                      updateData('supportSets', newSupportSets)
                    }}
                    options={supportBattlesuitOptions}
                    components={{
                      Option: (props) => {
                        return (
                          <>
                            <components.Option {...props}>
                              <Flex
                                sx={{ alignItems: 'center', color: 'black' }}
                              >
                                <Image
                                  width={20}
                                  height={20}
                                  alt={props.data.label}
                                  src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/portrait-${props.data.value}.png`}
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
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
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
