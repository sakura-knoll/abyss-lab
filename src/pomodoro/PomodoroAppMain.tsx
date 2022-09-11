import classcat from 'classcat'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Box,
  Button,
  // Checkbox,
  Flex,
  Heading,
  Input,
  Label,
  Link,
  Slider,
  Text,
} from 'theme-ui'
import {
  defaultPomodoroSettings,
  loadPomodoroSettings,
  savePomodoroSettings,
  saveTimerEvents,
} from './data'
import {
  PauseTimerEvent,
  PomodoroSettings,
  ResumeTimerEvent,
  StartTimerEvent,
  TimerEvent,
  TimerEventType,
  TimerType,
} from './interfaces'
// import JSONDebugBox from './JSONDebugBox'
import PomodoroTimerTypeButtonGroup from './PomodoroTimerTypeButtonGroup'
import { createMemoFunction } from './utils'
import { useValueRef } from './hooks'
import ProgressCircle from './ProgressCircle'
import RemainingTimeBox from './RemainingTimeBox'
import PomodoroStatusBox from './PomodoroStatusBox'
import PomodoroImage from './PomodoroImage'

interface PomodoroAppMainProps {
  initialTimerEvents: TimerEvent[]
}

const PomodoroAppMain = ({ initialTimerEvents }: PomodoroAppMainProps) => {
  const [events, setEvents] = useState<TimerEvent[]>(initialTimerEvents)
  const initialRenderingRef = useRef(false)
  const [timerType, setTimerType] = useState<TimerType>('pomodoro')
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    console.log(loadPomodoroSettings())
    return loadPomodoroSettings()
  })
  const settingsRef = useRef<PomodoroSettings>(settings)
  useEffect(() => {
    settingsRef.current = settings
    savePomodoroSettings(settings)
  }, [settings])

  const eventsRef = useRef<TimerEvent[]>(events)
  const longBreakIntervalRef = useValueRef(settings.longBreakInterval)
  useMemo(() => {
    eventsRef.current = events
  }, [events])
  const alarmAudioRef = useRef<HTMLAudioElement>(null)
  const tickingAudioRef = useRef<HTMLAudioElement>(null)
  const rideonAudioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (alarmAudioRef.current != null) {
      alarmAudioRef.current.volume = settings.volume
    }
    if (tickingAudioRef.current != null) {
      tickingAudioRef.current.volume = settings.volume
    }
    if (rideonAudioRef.current != null) {
      rideonAudioRef.current.volume = settings.volume
    }
  }, [settings.volume])

  const playTickingSound = useCallback(() => {
    if (tickingAudioRef.current == null) {
      return
    }
    tickingAudioRef.current.currentTime = 0
    tickingAudioRef.current.loop = true
    tickingAudioRef.current.play()
  }, [])
  const stopTickingSound = useCallback(() => {
    if (tickingAudioRef.current == null) {
      return
    }
    tickingAudioRef.current.pause()
  }, [])

  const unshiftTimerEvent = useCallback((event: TimerEvent) => {
    setEvents((previousEvents) => {
      return [event, ...previousEvents]
    })
  }, [])

  useEffect(() => {
    if ((initialRenderingRef.current = false)) {
      initialRenderingRef.current = true
    } else {
      console.log('save timer events')
      saveTimerEvents(events)
    }
  }, [events])

  const lastEvent = events[0]

  const [
    finishedPomodoroCountSinceLongBreak,
    setFinishedPomodoroCountSinceLongBreak,
  ] = useState(() => {
    return getFinishedPomodoroCountSinceLongBreak(events)
  })

  const [displayStatus, setDisplayStatus] = useState(() => {
    const { status } = getTimerStatus(events)
    return status
  })
  const [displayRemainingTime, setDisplayRemainingTime] = useState(() => {
    const { remainingTime } = getTimerStatus(events)
    return remainingTime
  })
  const [displayDuration, setDisplayDuration] = useState(() => {
    const { lastTimerDuration } = getTimerStatus(events)
    return lastTimerDuration
  })
  const [finishedCount, setFinishedCount] = useState(() => {
    return getFinishedPomodoroCount(events)
  })

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const refreshTimerIntervalRef = useRef<NodeJS.Timer | null>(null)
  const startRefresh = useCallback(() => {
    if (refreshTimerIntervalRef.current != null) {
      clearInterval(refreshTimerIntervalRef.current)
    }

    refreshTimerIntervalRef.current = setInterval(() => {
      const { status, remainingTime, lastTimerDuration } = getTimerStatus(
        eventsRef.current
      )
      if (status !== 'idle') {
        setDisplayRemainingTime(remainingTime)
        setDisplayDuration(lastTimerDuration)
      }
    }, 1000 / 60)
  }, [])
  const endRefresh = useCallback(() => {
    if (refreshTimerIntervalRef.current != null) {
      clearInterval(refreshTimerIntervalRef.current)
    }
  }, [])
  const startTimer = useCallback((callback: () => void, ms: number) => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }
    startRefresh()
    timeoutRef.current = setTimeout(callback, ms)
  }, [])
  const endTimer = useCallback(() => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }
    endRefresh()
  }, [])

  useEffect(() => {
    return () => {
      endRefresh()
    }
  }, [])

  const finish = useCallback((silentAlarm: boolean = false) => {
    endTimer()
    const { lastTimerType } = getTimerStatus(eventsRef.current)
    const finishedPomodoroCountSinceLongBreak =
      getFinishedPomodoroCountSinceLongBreak(eventsRef.current)
    const finishedCount = getFinishedPomodoroCount(eventsRef.current)
    if (!silentAlarm) {
      if (lastTimerType === 'pomodoro' && alarmAudioRef.current != null) {
        alarmAudioRef.current.currentTime = 0
        alarmAudioRef.current.play()
      } else if (rideonAudioRef.current != null) {
        rideonAudioRef.current.currentTime = 0
        rideonAudioRef.current.play()
      }
    }
    stopTickingSound()
    const nextBreakShouldBeLongBreak =
      finishedPomodoroCountSinceLongBreak >= longBreakIntervalRef.current - 1
    const nextTimerType =
      lastTimerType === 'pomodoro'
        ? nextBreakShouldBeLongBreak
          ? 'long-break'
          : 'short-break'
        : 'pomodoro'
    unshiftTimerEvent(createTimerEvent('finish'))
    if (lastTimerType === 'pomodoro') {
      setFinishedPomodoroCountSinceLongBreak(
        nextBreakShouldBeLongBreak ? 0 : finishedPomodoroCountSinceLongBreak + 1
      )
      setFinishedCount(finishedCount + 1)
    }

    const nextTimerDuration = getTimerDuration(
      nextTimerType,
      settingsRef.current
    )
    setDisplayDuration(nextTimerDuration)
    setTimerType(nextTimerType)
    setDisplayRemainingTime(nextTimerDuration * 1000)
    setDisplayStatus('idle')
  }, [])

  useEffect(() => {
    const { status, remainingTime } = getTimerStatus(events)
    if (status === 'running') {
      setTimeout(finish, remainingTime < 0 ? 0 : remainingTime)
    }
    return () => {
      endTimer()
    }
  }, [])

  const onStartResumeButtonClick = useCallback(() => {
    if (alarmAudioRef.current != null) {
      alarmAudioRef.current.pause()
    }
    const { status, remainingTime } = getTimerStatus(events)
    switch (status) {
      case 'running': // pause
        stopTickingSound()
        if (remainingTime > 0) {
          setDisplayStatus('paused')
          unshiftTimerEvent(createTimerEvent('pause'))
          endTimer()
        }
        break
      case 'paused': // pause -> running
        if (timerType === 'pomodoro') {
          playTickingSound()
        }
        setDisplayStatus('running')
        unshiftTimerEvent(createTimerEvent('resume'))
        startTimer(finish, remainingTime)
        break
      case 'idle': // idle -> running
      default:
        if (timerType === 'pomodoro') {
          playTickingSound()
        }

        setDisplayStatus('running')
        const newEvent = createStartTimerEvent({
          duration: getTimerDuration(timerType, settings),
          timerType,
        })
        unshiftTimerEvent(newEvent)
        startTimer(finish, getTimerDuration(timerType, settings) * 1000)
    }
  }, [timerType, events, settings])

  const onTimerButtonSelect = useCallback(
    (selectedTimerType: TimerType) => {
      const { status } = getTimerStatus(events)

      if (status === 'idle') {
        setTimerType(selectedTimerType)
        setDisplayRemainingTime(
          getTimerDuration(selectedTimerType, settings) * 1000
        )
      }

      if (status === 'running' || status === 'paused') {
        // should ask to finish or to cancel
      }
    },
    [events, settings]
  )

  const onFinishButtonClick = useCallback(() => {
    const { status } = getTimerStatus(events)
    if (status === 'idle') {
      return
    }

    finish(true)
  }, [events])

  const onCancelButtonClick = useCallback(() => {
    const { status } = getTimerStatus(events)
    if (status === 'idle') {
      return
    }

    stopTickingSound()
    endTimer()
    unshiftTimerEvent(createTimerEvent('cancel'))
    setDisplayRemainingTime(getTimerDuration(timerType, settings) * 1000)
    setDisplayStatus('idle')
  }, [events])

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'auto',
        position: 'absolute',
        width: '100%',
        color: 'white',
        bg:
          timerType === 'pomodoro'
            ? 'red.6'
            : timerType === 'short-break'
            ? 'green.9'
            : 'blue.9',
        fontFamily: 'monospace',
        p: 0,
        m: 0,
      }}
    >
      <Box
        sx={{
          mt: 5,
          p: 2,
        }}
      >
        <Flex sx={{ justifyContent: 'center' }}>
          <PomodoroTimerTypeButtonGroup
            timerType={timerType}
            onTimerButtonSelect={onTimerButtonSelect}
          />
        </Flex>
        <Flex
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Flex sx={{ justifyContent: 'center', mt: 4, mb: 2 }}>
            <Box sx={{ width: 150, height: 150, position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 150,
                  height: 150,
                }}
              >
                <ProgressCircle
                  size={150}
                  progress={
                    (displayDuration - displayRemainingTime / 1000) /
                    displayDuration
                  }
                />
              </Box>
              <PomodoroImage
                displayStatus={displayStatus}
                timerType={timerType}
                finishedCountSinceLongBreak={
                  finishedPomodoroCountSinceLongBreak
                }
              />
            </Box>
          </Flex>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 3,
              mt: 2,
            }}
          >
            <RemainingTimeBox displayRemainingTime={displayRemainingTime} />
            <PomodoroStatusBox
              finishedCount={finishedCount}
              timerType={timerType}
              finishedCountSinceLongBreak={finishedPomodoroCountSinceLongBreak}
              longBreakInterval={settings.longBreakInterval}
            />
          </Flex>
        </Flex>

        <Flex sx={{ justifyContent: 'center' }}>
          <Button
            variant='pomodoro'
            sx={{ mr: 1, width: [100, 150, 200] }}
            className={classcat([
              lastEvent != null && lastEvent.type === 'start' && 'active',
            ])}
            onClick={onStartResumeButtonClick}
          >
            {lastEvent != null && lastEvent.type === 'start'
              ? 'Pause'
              : lastEvent != null && lastEvent.type === 'pause'
              ? 'Resume'
              : 'Start'}
          </Button>
          <Button
            variant='pomodoro'
            sx={{ mr: 1 }}
            onClick={onFinishButtonClick}
          >
            Finish
          </Button>
          <Button
            variant='pomodoro'
            onClick={onCancelButtonClick}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
        </Flex>

        <Box sx={{ maxWidth: '460px', margin: '0 auto' }}>
          <Box sx={{ mt: '60px', mb: 3 }}>
            <Box sx={{ width: '100%', background: 'white', height: 1 }}></Box>
          </Box>

          <Heading>Settings</Heading>

          <Box sx={{ mb: 3 }}>
            <Box>Pomodoro Count: {finishedCount}</Box>
            <Button
              variant='pomodoro'
              onClick={() => {
                setEvents((prevEvents) => {
                  setFinishedPomodoroCountSinceLongBreak(0)
                  setFinishedCount(0)
                  return shiftFinishedEvents(prevEvents)
                })
              }}
            >
              Reset Count
            </Button>
          </Box>

          <Box sx={{ mb: 4 }}>
            {/* <Label>Sound</Label> */}
            {/* <Label>
              <Checkbox
                checked={settings.tickSound}
                onChange={(event) => {
                  setSettings((prevSettings) => {
                    return {
                      ...prevSettings,
                      tickSound: event.target.checked,
                    }
                  })
                }}
              />{' '}
              Tick Sound
            </Label>
            <Label>
              <Checkbox
                checked={settings.pomodoroFinishSound}
                onChange={(event) => {
                  setSettings((prevSettings) => {
                    return {
                      ...prevSettings,
                      pomodoroFinishSound: event.target.checked,
                    }
                  })
                }}
              />{' '}
              Alarm Sound when Pomodoro End
            </Label> */}
            {/* <Label>
              <Checkbox
                checked={settings.breakFinishSound}
                onChange={(event) => {
                  setSettings((prevSettings) => {
                    return {
                      ...prevSettings,
                      breakFinishSound: event.target.checked,
                    }
                  })
                }}
              />{' '}
              Rideon Sound when Break End
            </Label> */}
            <Box>
              <Label>Sound Volumn</Label>
              <Slider
                value={settings.volume * 100}
                max={100}
                min={0}
                onChange={(event) => {
                  setSettings((prevSettings) => {
                    return {
                      ...prevSettings,
                      volume: parseInt(event.target.value, 10) / 100,
                    }
                  })
                }}
              />
            </Box>
          </Box>
          {/* <Box sx={{ mb: 3 }}>
            <Label>Auto Start</Label>
            <Label>
              <Checkbox
                checked={settings.autoStartPomodoros}
                onChange={(event) => {
                  setSettings((prevSettings) => {
                    return {
                      ...prevSettings,
                      autoStartPomodoros: event.target.checked,
                    }
                  })
                }}
              />{' '}
              Auto Start Pomodoros
            </Label>
            <Label>
              <Checkbox
                checked={settings.autoStartBreaks}
                onChange={(event) => {
                  setSettings((prevSettings) => {
                    return {
                      ...prevSettings,
                      autoStartBreaks: event.target.checked,
                    }
                  })
                }}
              />{' '}
              Auto-start Breaks
            </Label>
          </Box> */}
          <Box sx={{ mb: 3 }}>
            <Label>Duration</Label>
            <Label>Pomodoro Duration(seconds)</Label>
            <Input
              type='number'
              min={1}
              value={settings.pomodoroDuration}
              onChange={(event) => {
                let newValue = parseInt(event.target.value, 10)
                setSettings((prevSettings) => {
                  return {
                    ...prevSettings,
                    pomodoroDuration: isNaN(newValue) ? 1 : newValue,
                  }
                })
              }}
            />
            <Label>Short Break Duration(seconds)</Label>
            <Input
              type='number'
              min={1}
              value={settings.shortBreakDuration}
              onChange={(event) => {
                let newValue = parseInt(event.target.value, 10)
                setSettings((prevSettings) => {
                  return {
                    ...prevSettings,
                    shortBreakDuration: isNaN(newValue) ? 1 : newValue,
                  }
                })
              }}
            />
            <Label>Long Break Duration(seconds)</Label>
            <Input
              type='number'
              min={1}
              value={settings.longBreakDuration}
              onChange={(event) => {
                let newValue = parseInt(event.target.value, 10)
                setSettings((prevSettings) => {
                  return {
                    ...prevSettings,
                    longBreakDuration: isNaN(newValue) ? 1 : newValue,
                  }
                })
              }}
            />
            <Label>Long Break Interval</Label>
            <Input
              type='number'
              min={0}
              value={settings.longBreakInterval}
              onChange={(event) => {
                let newValue = parseInt(event.target.value, 10)
                setSettings((prevSettings) => {
                  return {
                    ...prevSettings,
                    longBreakInterval: isNaN(newValue) ? 0 : newValue,
                  }
                })
              }}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Label>Reset Settings</Label>
            <Button
              variant='pomodoro'
              onClick={() => {
                setSettings(defaultPomodoroSettings)
              }}
            >
              Reset
            </Button>
          </Box>
          <Box mb={4}>
            <Label>Made by Sakura Knoll</Label>
            <Label>
              <Text sx={{ mr: 2 }}>Feedback:</Text>
              <Link
                href='https://github.com/sakura-knoll/abyss-lab/issues'
                target='_blank'
              >
                Github
              </Link>
              ,
              <Link
                href='https://arca.live/b/cherryhill'
                target='_blank'
                sx={{ ml: 2 }}
              >
                arca.live
              </Link>
            </Label>
          </Box>
        </Box>

        <audio src='/pomodoro/warning.ogg' ref={alarmAudioRef} />
        <audio src='/pomodoro/ticking.wav' ref={tickingAudioRef} />
        <audio src='/pomodoro/rideon.ogg' ref={rideonAudioRef} />
      </Box>
      {/* <JSONDebugBox data={events} /> */}
    </Box>
  )
}

export default PomodoroAppMain

function createStartTimerEvent(
  eventData: Omit<StartTimerEvent, 'type' | 'date'>
): StartTimerEvent {
  return {
    type: 'start',
    ...eventData,
    date: new Date(),
  }
}

function createTimerEvent(type: Exclude<TimerEventType, 'start'>): TimerEvent {
  return {
    type,
    date: new Date(),
  }
}

export type TimerStatus = 'idle' | 'running' | 'paused'
interface TimerStats {
  status: TimerStatus
  lastTimerType: TimerType
  remainingTime: number
  lastTimerDuration: number
}

function getTimerStatus(events: TimerEvent[]): TimerStats {
  const unresolvedTimerEvents = getUnresolvedTimerEvents(events)

  if (unresolvedTimerEvents.length === 0) {
    return {
      status: 'idle',
      lastTimerType: 'pomodoro',
      remainingTime: 0,
      lastTimerDuration: 1,
    }
  }

  const {
    lastEventType,
    lastTimerType,
    calculatedRemainingTimeInMs,
    previousResumeDate,
    lastTimerDuration,
  } = getUnresolvedTimerStatus(unresolvedTimerEvents)

  if (lastEventType === 'pause') {
    return {
      status: 'paused',
      lastTimerType,
      remainingTime: calculatedRemainingTimeInMs,
      lastTimerDuration,
    }
  } else {
    return {
      status: 'running',
      lastTimerType,
      remainingTime:
        calculatedRemainingTimeInMs -
        (new Date().getTime() - previousResumeDate.getTime()),
      lastTimerDuration,
    }
  }
}

type UnresolvedTimerEvent = StartTimerEvent | PauseTimerEvent | ResumeTimerEvent
const getUnresolvedTimerEvents = createMemoFunction(function (
  events: TimerEvent[]
): UnresolvedTimerEvent[] {
  let unresolvedTimerEvents = []

  if (events.length > 0) {
    for (let targetIndex = 0; targetIndex < events.length; targetIndex++) {
      const targetEvent = events[targetIndex]
      if (targetEvent.type === 'cancel' || targetEvent.type === 'finish') {
        break
      }
      unresolvedTimerEvents.unshift(targetEvent)
      if (targetEvent.type === 'start') {
        break
      }
    }
  }

  return unresolvedTimerEvents
})

interface UnresolvedTimerStatus {
  lastEventType: 'pause' | 'resume' | 'start'
  lastTimerType: TimerType
  calculatedRemainingTimeInMs: number
  previousResumeDate: Date
  lastTimerDuration: number
}

const getUnresolvedTimerStatus = createMemoFunction(function (
  unresolvedTimerEvents: UnresolvedTimerEvent[]
): UnresolvedTimerStatus {
  unresolvedTimerEvents = unresolvedTimerEvents.slice()
  let startEvent = unresolvedTimerEvents.shift() as StartTimerEvent
  let calculatedRemainingTimeInMs = startEvent.duration * 1000

  let previousResumeDate = startEvent.date
  let lastEventType: 'start' | 'pause' | 'resume' = startEvent.type

  while (unresolvedTimerEvents.length > 0) {
    const targetEvent = unresolvedTimerEvents.shift()
    if (targetEvent == null) {
      break
    }
    lastEventType = targetEvent.type
    if (targetEvent.type === 'pause') {
      calculatedRemainingTimeInMs -=
        targetEvent.date.getTime() - previousResumeDate.getTime()
    }
    if (targetEvent.type === 'resume') {
      previousResumeDate = targetEvent.date
    }
  }

  return {
    lastEventType,
    lastTimerType: startEvent.timerType,
    calculatedRemainingTimeInMs,
    previousResumeDate,
    lastTimerDuration: startEvent.duration,
  }
})

function getFinishedPomodoroCountSinceLongBreak(events: TimerEvent[]): number {
  let finishedPomodoroCount = 0
  let starting = false
  for (const event of events.slice()) {
    if (!starting) {
      if (event.type === 'finish') {
        starting = true
      }
    } else {
      if (event.type === 'start') {
        starting = false
        if (event.timerType === 'pomodoro') {
          finishedPomodoroCount++
        }
        if (event.timerType === 'long-break') {
          break
        }
      }
    }
  }

  return finishedPomodoroCount
}

function getFinishedPomodoroCount(events: TimerEvent[]): number {
  let finishedPomodoroCount = 0
  let starting = false
  for (const event of events.slice()) {
    if (!starting) {
      if (event.type === 'finish') {
        starting = true
      }
    } else {
      if (event.type === 'start') {
        starting = false
        if (event.timerType === 'pomodoro') {
          finishedPomodoroCount++
        }
      }
    }
  }
  return finishedPomodoroCount
}

function getTimerDuration(timerType: TimerType, settings: PomodoroSettings) {
  switch (timerType) {
    case 'long-break':
      return settings.longBreakDuration
    case 'short-break':
      return settings.shortBreakDuration
    case 'pomodoro':
    default:
      return settings.pomodoroDuration
  }
}

function shiftFinishedEvents(events: TimerEvent[]): TimerEvent[] {
  let newEvents = []
  for (const event of events) {
    if (event.type === 'finish') {
      break
    } else {
      newEvents.unshift(event)
    }
  }
  return newEvents
}
