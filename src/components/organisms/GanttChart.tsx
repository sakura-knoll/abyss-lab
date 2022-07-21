/** @jsxImportSource theme-ui */
import { Box, Flex, Text } from '@theme-ui/components'
import {
  addDays,
  addWeeks,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  format,
} from 'date-fns'
import { times } from 'ramda'
import React, { useMemo, MouseEventHandler } from 'react'

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
  today: Date | null
  items: GanttChartItem[]
}

const widthOfDay = 20
const widthOfWeek = widthOfDay * 7

const itemHeight = 30

const GanttChart = ({
  startDate: startDateString,
  endDate: endDateString,
  today,
  items,
}: GanttChartProps) => {
  const startDate = new Date(startDateString)
  const endDate = new Date(endDateString)
  const firstDateToRender = startDate
  const lastDateToRender = endDate
  const todayDate = today

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
    <Box sx={{ width: weeksToRender * widthOfWeek + 70 }}>
      <WeekLabelRow
        firstDateToRender={firstDateToRender}
        weeksToRender={weeksToRender}
      />
      <Box
        sx={{
          position: 'relative',
          height: totalRow * (itemHeight + 10) + 30,
        }}
      >
        {times((index) => {
          return (
            <DateMeasure
              key={`day-border-${index}`}
              index={index}
              totalRow={totalRow}
            />
          )
        }, daysToRender + 1)}

        {times((index) => {
          return (
            <Box
              key={`weekdate-${index}`}
              sx={{
                position: 'absolute',
                left: index * widthOfDay,
                width: widthOfDay,
                textAlign: 'center',
                color:
                  (index - 1) % 7 === 2
                    ? 'red'
                    : (index - 1) % 7 === 1
                    ? 'blue'
                    : 'default',
              }}
            >
              {format(addDays(firstDateToRender, index), 'EEEEE')}
            </Box>
          )
        }, daysToRender + 1)}

        {todayDate != null && todayDate <= endDate && (
          <TodayBox
            totalRow={totalRow}
            todayDate={todayDate}
            firstDateToRender={firstDateToRender}
          />
        )}

        <Box
          sx={{
            boxSizing: 'border-box',
            position: 'absolute',
            width: 1,
            top: 24,
            height: totalRow * (itemHeight + 10) + itemHeight - 24,
            backgroundColor: 'red.9',
            opacity: 0.8,
            zIndex: 20,
            left:
              differenceInCalendarDays(endDate, firstDateToRender) *
                widthOfDay +
              widthOfDay / 2,
            pointerEvents: 'none',
          }}
        />
        <Text
          sx={{
            position: 'absolute',
            transform: 'rotate(90deg)',
            color: 'red.5',
            zIndex: 21,
            top: 170,
            left:
              differenceInCalendarDays(endDate, firstDateToRender) *
                widthOfDay +
              widthOfDay / 2 +
              -140,
            width: 300,
            pointerEvents: 'none',
          }}
        >
          {format(endDate, 'PP')}
        </Text>

        {items.map((item) => {
          const offset =
            differenceInCalendarDays(
              new Date(item.duration[0]),
              firstDateToRender
            ) *
              widthOfDay +
            widthOfDay / 2
          const length =
            differenceInCalendarDays(
              new Date(item.duration[1]),
              new Date(item.duration[0])
            ) * widthOfDay

          return (
            <Flex
              key={item.id}
              py={2}
              px={2}
              sx={{
                boxSizing: 'border-box',
                position: 'absolute',
                borderColor: 'border',
                borderWidth: 1,
                borderStyle: 'solid',
                backgroundColor: 'background',
                width: length,
                left: offset,
                top: (item.row - 1) * (itemHeight + 10) + 30,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                height: itemHeight,
                borderRadius: itemHeight / 2,
                fontSize: 1,
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

const WeekLabelRow = ({
  weeksToRender,
  firstDateToRender,
}: {
  weeksToRender: number
  firstDateToRender: Date
}) => {
  return (
    <Flex sx={{}}>
      {times((index) => {
        const weekNumber = index
        return (
          <Box
            key={`week-${weekNumber}`}
            sx={{
              width: widthOfWeek,
              color: 'textMuted',
            }}
          >
            {format(addWeeks(firstDateToRender, weekNumber), 'PP')}
          </Box>
        )
      }, weeksToRender)}
    </Flex>
  )
}

const DateMeasure = ({
  index,
  totalRow,
}: {
  index: number
  totalRow: number
}) => {
  return (
    <Box
      key={`day-border-${index}`}
      sx={{
        position: 'absolute',
        height: totalRow * 50 + widthOfDay,
        borderRightStyle: index % 7 === 0 ? 'solid' : 'dashed',
        borderRightWidth: 1,
        borderRightColor: index % 7 === 0 ? 'border' : 'altBorder',
        left: index * widthOfDay,
      }}
    />
  )
}

const TodayBox = ({
  totalRow,
  todayDate,
  firstDateToRender,
}: {
  totalRow: number
  todayDate: Date
  firstDateToRender: Date
}) => {
  return (
    <>
      <Text
        sx={{
          position: 'absolute',
          color: 'blue.7',
          transform: 'rotate(90deg)',
          zIndex: 21,
          top: 170,
          left:
            (differenceInCalendarDays(new Date(todayDate), firstDateToRender) +
              1) *
              widthOfDay -
            160,
          width: 300,
          pointerEvents: 'none',
        }}
      >
        Today ({format(todayDate, 'PP')})
      </Text>
      <Box
        sx={{
          boxSizing: 'border-box',
          position: 'absolute',
          width: widthOfDay,
          height: totalRow * (itemHeight + 10) + itemHeight,
          backgroundColor: 'blue.5',
          borderStyle: 'solid',
          borderColor: 'blue.7',
          borderRadius: 4,
          opacity: 0.3,
          zIndex: 20,
          left:
            (differenceInCalendarDays(todayDate, firstDateToRender) + 1) *
              widthOfDay -
            20,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
