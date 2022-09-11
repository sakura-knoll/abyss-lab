export type TimerType = 'pomodoro' | 'short-break' | 'long-break'

export type TimerEventType = 'start' | 'pause' | 'resume' | 'cancel' | 'finish'

export interface StartTimerEvent {
  type: 'start'
  date: Date
  duration: number
  timerType: TimerType
}

export interface PauseTimerEvent {
  type: 'pause'
  date: Date
}

export interface ResumeTimerEvent {
  type: 'resume'
  date: Date
}
export interface CancelTimerEvent {
  type: 'cancel'
  date: Date
}

export interface FinishTimerEvent {
  type: 'finish'
  date: Date
}

export type TimerEvent =
  | StartTimerEvent
  | PauseTimerEvent
  | ResumeTimerEvent
  | CancelTimerEvent
  | FinishTimerEvent

export interface PomodoroSettings {
  tickSound: boolean
  pomodoroFinishSound: boolean
  breakFinishSound: boolean
  volume: number
  autoStartPomodoros: boolean
  autoStartBreaks: boolean
  pomodoroDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  longBreakInterval: number
}
