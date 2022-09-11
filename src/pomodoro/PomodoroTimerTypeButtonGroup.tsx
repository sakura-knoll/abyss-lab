import classcat from 'classcat'
import { memo } from 'react'
import { Button, Flex } from 'theme-ui'
import { TimerType } from './interfaces'

interface PomodoroTimerTypeButtonGroupProps {
  timerType: TimerType
  onTimerButtonSelect: (timerType: TimerType) => void
}

const PomodoroTimerTypeButtonGroup = ({
  timerType,
  onTimerButtonSelect,
}: PomodoroTimerTypeButtonGroupProps) => {
  return (
    <Flex sx={{ justifyContent: 'center', maxWidth: 400, width: '100%' }}>
      <Button
        variant='pomodoro'
        sx={{ mr: 1, flex: 1 }}
        className={classcat([timerType === 'pomodoro' && 'active'])}
        onClick={() => onTimerButtonSelect('pomodoro')}
      >
        Pomodoro
      </Button>
      <Button
        variant='pomodoro'
        sx={{ mr: 1, flex: 1 }}
        className={classcat([timerType === 'short-break' && 'active'])}
        onClick={() => onTimerButtonSelect('short-break')}
      >
        Short Break
      </Button>
      <Button
        sx={{ flex: 1 }}
        variant='pomodoro'
        className={classcat([timerType === 'long-break' && 'active'])}
        onClick={() => onTimerButtonSelect('long-break')}
      >
        Long Break
      </Button>
    </Flex>
  )
}

export default memo(PomodoroTimerTypeButtonGroup)
