/** @jsxImportSource theme-ui */
import { Box, Flex, Text } from '@theme-ui/components'
import {
  addDays,
  addWeeks,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  format,
  subDays,
} from 'date-fns'
import { times } from 'ramda'
import { useMemo, MouseEventHandler } from 'react'

export interface GanttChartItem {
  id: string
  row: number
  duration: [string, string]
  label: React.ReactNode
  onClick?: MouseEventHandler<HTMLDivElement>
}

interface GanttChartProps {
  startDate: string
  endDate: string
  today: string
  items: GanttChartItem[]
}

const GanttChart = ({
  startDate: startDateString,
  endDate: endDateString,
  today: todayDateString,
  items,
}: GanttChartProps) => {
  const startDate = new Date(startDateString)
  const endDate = new Date(endDateString)
  const firstDateToRender = subDays(startDate, startDate.getDay() - 1)
  const lastDateToRender = addDays(endDate, 6 - endDate.getDay() + 1)
  const todayDate = new Date(todayDateString)

  const daysToRender = differenceInCalendarDays(
    lastDateToRender,
    firstDateToRender
  )
  const weeksToRender = differenceInCalendarWeeks(
    lastDateToRender,
    firstDateToRender
  )

  const totalRow = useMemo(() => {
    return items.reduce((max, item) => {
      return item.row > max ? item.row : max
    }, 1)
  }, [items])

  return (
    <Box sx={{ width: weeksToRender * 280 + 70 }}>
      <Flex
        sx={{
          marginLeft: -20,
        }}
      >
        {times((index) => {
          const weekNumber = index + 1
          return (
            <Box
              key={`week-${weekNumber}`}
              sx={{
                width: 280,
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              Week {weekNumber}
            </Box>
          )
        }, weeksToRender)}
      </Flex>
      <Box
        sx={{
          position: 'relative',
          height: totalRow * 50 + 40,
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          borderBottomColor: 'gray.5',
          borderTopStyle: 'solid',
          borderTopWidth: 1,
          borderTopColor: 'gray.5',
        }}
      >
        {times((index) => {
          return (
            <Box
              key={`day-border-${index}`}
              sx={{
                position: 'absolute',
                height: totalRow * 50 + 40,
                borderRightStyle: 'solid',
                borderRightWidth: 1,
                borderRightColor: index % 7 === 6 ? 'gray.5' : 'gray.3',
                left: (index + 1) * 40 - 1 - 20,
              }}
            />
          )
        }, daysToRender + 1)}

        {times((index) => {
          const weekNumber = index + 1
          return (
            <Text
              key={`week-start-date-${index}`}
              sx={{
                position: 'absolute',
                color: 'gray.5',
                zIndex: 21,
                top: 0,
                left: weekNumber * 280 - 15,
                width: 300,
                pointerEvents: 'none',
              }}
            >
              {format(addWeeks(firstDateToRender, weekNumber), 'PP')}
            </Text>
          )
        }, weeksToRender - 1)}
        <Box
          sx={{
            boxSizing: 'border-box',
            position: 'absolute',
            width: 40,
            height: totalRow * 50 + 40,
            backgroundColor: 'blue.5',
            borderStyle: 'solid',
            borderColor: 'blue.7',
            opacity: 0.2,
            zIndex: 20,
            borderRadius: 4,
            left:
              differenceInCalendarDays(todayDate, firstDateToRender) * 40 - 20,
            pointerEvents: 'none',
          }}
        />

        <Box
          sx={{
            boxSizing: 'border-box',
            position: 'absolute',
            width: 1,
            height: totalRow * 50 + 40,
            backgroundColor: 'red.3',
            zIndex: 20,
            left: differenceInCalendarDays(startDate, firstDateToRender) * 40,
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            boxSizing: 'border-box',
            position: 'absolute',
            width: 1,
            height: totalRow * 50 + 40,
            backgroundColor: 'red.3',
            zIndex: 20,
            left: differenceInCalendarDays(endDate, firstDateToRender) * 40,
            pointerEvents: 'none',
          }}
        />
        <Text
          sx={{
            position: 'absolute',
            transform: 'rotate(90deg)',
            color: 'red.5',
            zIndex: 21,
            top: 150,
            left:
              differenceInCalendarDays(startDate, firstDateToRender) * 40 +
              -160,
            width: 300,
            pointerEvents: 'none',
          }}
        >
          {format(startDate, 'PP')}
        </Text>
        <Text
          sx={{
            position: 'absolute',
            transform: 'rotate(90deg)',
            color: 'red.5',
            zIndex: 21,
            top: 150,
            left:
              differenceInCalendarDays(endDate, firstDateToRender) * 40 + -140,
            width: 300,
            pointerEvents: 'none',
          }}
        >
          {format(endDate, 'PP')}
        </Text>

        <Text
          sx={{
            position: 'absolute',
            color: 'blue.7',
            transform: 'rotate(90deg)',
            zIndex: 21,
            top: 150,
            left:
              differenceInCalendarDays(new Date(todayDate), firstDateToRender) *
                40 -
              150,
            width: 300,
            pointerEvents: 'none',
          }}
        >
          Today ({format(todayDate, 'PP')})
        </Text>

        {items.map((item) => {
          const offset =
            differenceInCalendarDays(
              new Date(item.duration[0]),
              firstDateToRender
            ) * 40
          const length =
            differenceInCalendarDays(
              new Date(item.duration[1]),
              new Date(item.duration[0])
            ) * 40

          return (
            <Flex
              key={item.id}
              py={2}
              px={3}
              sx={{
                boxSizing: 'border-box',
                position: 'absolute',
                borderColor: 'gray.5',
                borderWidth: 1,
                borderStyle: 'solid',
                backgroundColor: 'white',
                width: length,
                left: offset,
                top: (item.row - 1) * 50 + 20,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                height: 40,
                borderRadius: 40,
                fontWeight: 700,
                zIndex: 10,
                '&:hover': {
                  minWidth: length,
                  width: 'inherit',
                  zIndex: 25,
                  boxShadow: 'default',
                  transition: 'box-shadow 200ms ease-in-out',
                },
              }}
            >
              {item.label}
            </Flex>
          )
        })}
      </Box>
    </Box>
  )
}

export default GanttChart
