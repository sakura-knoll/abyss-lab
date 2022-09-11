import { Image } from 'theme-ui'
import { TimerType } from './interfaces'
import { TimerStatus } from './PomodoroAppMain'

const images: {
  [key: string]: { size: number; src: string; offsetY?: number }
} = {
  arrive: {
    size: 100,
    src: '/pomodoro/arrive.gif',
    offsetY: -10,
  },
  ride: {
    size: 100,
    src: '/pomodoro/ride.gif',
  },
  code: {
    size: 76,
    src: '/pomodoro/code.gif',
  },
  hop: {
    size: 60,
    src: '/pomodoro/hop.gif',
  },
  attack: {
    size: 100,
    src: '/pomodoro/attack.gif',
  },
  drink: {
    size: 68,
    src: '/pomodoro/drink.gif',
  },
  rest: {
    size: 100,
    src: '/pomodoro/rest.gif',
  },
  love: {
    size: 60,
    src: '/pomodoro/love.gif',
    offsetY: 4,
  },
  sleep: {
    size: 85,
    src: '/pomodoro/sleep.gif',
    offsetY: -5,
  },
  no: {
    size: 80,
    src: '/pomodoro/no.gif',
    offsetY: -5,
  },
}

interface PomodoroImageProps {
  displayStatus: TimerStatus
  timerType: TimerType
  finishedCountSinceLongBreak: number
}

const PomodoroImage = ({
  displayStatus,
  timerType,
  finishedCountSinceLongBreak,
}: PomodoroImageProps) => {
  const imageKey = getImageKey(
    displayStatus,
    timerType,
    finishedCountSinceLongBreak
  )
  const { size, src, offsetY = 0 } = images[imageKey]
  const offset = (150 - size) / 2
  return (
    <Image
      sx={{
        borderRadius: 10,
        position: 'absolute',
        left: offset,
        top: offset + offsetY,
      }}
      width={size}
      height={size}
      src={src}
    />
  )
}

export default PomodoroImage

function getImageKey(
  displayStatus: TimerStatus,
  timerType: TimerType,
  finishedCountSinceLongBreak: number
) {
  return displayStatus === 'paused'
    ? 'no'
    : timerType === 'pomodoro'
    ? displayStatus === 'idle'
      ? 'arrive'
      : finishedCountSinceLongBreak === 0
      ? 'ride'
      : finishedCountSinceLongBreak === 1
      ? 'code'
      : finishedCountSinceLongBreak === 2
      ? 'hop'
      : 'attack'
    : timerType === 'short-break'
    ? finishedCountSinceLongBreak === 1
      ? 'rest'
      : finishedCountSinceLongBreak === 2
      ? 'drink'
      : 'love'
    : 'sleep'
}
