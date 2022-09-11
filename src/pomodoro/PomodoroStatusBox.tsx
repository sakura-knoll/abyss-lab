import { memo } from 'react'
import { Text } from 'theme-ui'
import { TimerType } from './interfaces'

interface PomodoroStatusBoxProps {
  finishedCount: number
  finishedCountSinceLongBreak: number
  longBreakInterval: number
  timerType: TimerType
}

const PomodoroStatusBox = ({
  finishedCount,
  finishedCountSinceLongBreak,
  longBreakInterval,
  timerType,
}: PomodoroStatusBoxProps) => {
  const nextBreakShouldBeLongBreak =
    finishedCountSinceLongBreak >= longBreakInterval - 1
  const nextTimerType =
    timerType === 'pomodoro'
      ? nextBreakShouldBeLongBreak
        ? 'long-break'
        : 'short-break'
      : 'pomodoro'

  return (
    <Text sx={{ textAlign: 'center', display: 'block' }}>
      {finishedCount > 0 ? `🍅 Done: ${finishedCount}` : `Let's start!`}
      <br />

      {nextTimerType === 'pomodoro' ? (
        <>Next: Pomodoro</>
      ) : nextTimerType === 'short-break' ? (
        <>
          Next: Short Break({finishedCountSinceLongBreak}/
          {longBreakInterval - 1})
        </>
      ) : (
        <>Next: Long Break</>
      )}
    </Text>
  )
}

export default memo(PomodoroStatusBox)
