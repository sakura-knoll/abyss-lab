import { PomodoroSettings, TimerEvent } from './interfaces'

const pomodoroTasksKey = 'pomodoro:tasks'
export function loadTimerEvents(): TimerEvent[] {
  try {
    const parsedData = JSON.parse(
      localStorage.getItem(pomodoroTasksKey) || '[]'
    )

    return (parsedData as any[]).map(({ date, ...otherProps }) => {
      const task: TimerEvent = {
        ...otherProps,
        date: new Date(date),
      }
      return task
    })
  } catch (error) {
    console.warn(error)
    return []
  }
}

export function saveTimerEvents(timerEvents: TimerEvent[]) {
  const serializedTasks = timerEvents.map(({ ...otherTaskProps }) => {
    const serializedTask: any = {
      ...otherTaskProps,
      date: otherTaskProps.date.toString(),
    }

    return serializedTask
  })
  localStorage.setItem(pomodoroTasksKey, JSON.stringify(serializedTasks))
}

export const defaultPomodoroSettings: PomodoroSettings = {
  tickSound: true,
  pomodoroFinishSound: true,
  breakFinishSound: true,
  volume: 1,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  pomodoroDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  longBreakInterval: 4,
}

const pomodoroSettingsKey = 'pomodoro:settings'
export function loadPomodoroSettings(): PomodoroSettings {
  try {
    const storedValue = localStorage.getItem(pomodoroSettingsKey)
    if (storedValue == null) {
      return defaultPomodoroSettings
    }
    const settings = JSON.parse(storedValue)
    return settings
  } catch (error) {
    console.warn(error)
    return defaultPomodoroSettings
  }
}

export function savePomodoroSettings(settings: PomodoroSettings) {
  localStorage.setItem(pomodoroSettingsKey, JSON.stringify(settings))
}
