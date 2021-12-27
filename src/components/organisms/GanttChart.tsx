import { Box, Flex, Text } from '@theme-ui/components'
import {
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  format,
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
  const todayDate = new Date(todayDateString)

  const totalDays = differenceInCalendarDays(endDate, startDate)
  const totalWeeks = differenceInCalendarWeeks(endDate, startDate)

  const totalRow = useMemo(() => {
    return items.reduce((max, item) => {
      return item.row > max ? item.row : max
    }, 1)
  }, [])

  return (
    <Box mb={3} sx={{ width: totalWeeks * 280 }}>
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
        }, totalWeeks)}
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
        }, totalDays)}
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
            left: differenceInCalendarDays(todayDate, startDate) * 40 - 20,
            pointerEvents: 'none',
          }}
        />

        <Text
          sx={{
            position: 'absolute',
            color: 'blue.7',
            transform: 'rotate(90deg)',
            zIndex: 21,
            top: 150,
            left:
              differenceInCalendarDays(new Date(todayDate), startDate) * 40 -
              150,
            width: 300,
            pointerEvents: 'none',
          }}
        >
          Today ({format(todayDate, 'P')})
        </Text>

        {items.map((item) => {
          const offset =
            differenceInCalendarDays(new Date(item.duration[0]), startDate) * 40
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
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
