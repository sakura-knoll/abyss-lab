import { Box, Flex, Image, Label, Select } from 'theme-ui'
import ReactSelect, { components } from 'react-select'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { Data, DataUpdater, ExSignetType } from './types'
import { PopulatedSignetGroup } from '../../../lib/honkai3rd/elysianRealm'
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

interface DataFormProps {
  battlesuitOptions: { value: string; label: string }[]
  updateData: DataUpdater
  data: Data
  exSignetGroup: PopulatedSignetGroup
}

const DataForm = ({
  updateData,
  data,
  battlesuitOptions,
  exSignetGroup,
}: DataFormProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <Box>
      <Box>
        <Label>난이도</Label>
        <Select
          onChange={(event) => {
            switch (event.target.value) {
              case 'abstinence':
              case 'corruption':
              case 'inferno':
                updateData('difficulty', event.target.value)
                break
            }
          }}
          value={data.difficulty}
        >
          <option value='corruption'>침식</option>
          <option value='abstinence'>제약</option>
          <option value='inferno'>겁화</option>
        </Select>
      </Box>
      <Box>
        <Label>발키리</Label>
        <ReactSelect
          instanceId={'battlesuit-select'}
          defaultValue={battlesuitOptions[0]}
          onChange={(data) => {
            if (data == null) {
              return
            }
            updateData('battlesuitId', data.value)
            const exSignetSet = exSignetGroup.sets.find((signetSet) => {
              return signetSet.id === `elysia-${data.value}`
            })
            if (exSignetSet != null) {
              updateData(
                'exSignets',
                exSignetSet.signets.map((signet) => {
                  return {
                    type: '1st',
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
          <Box>
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
        sx={{ height: 35, cursor: 'ns-resize', alignItems: 'center', p: 1 }}
      >
        {props.name}
      </Flex>
    </div>
  )
}
