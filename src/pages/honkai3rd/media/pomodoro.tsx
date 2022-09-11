import { useEffect, useState } from 'react'
import { Box, ThemeProvider } from 'theme-ui'
import PomodoroAppMain from '../../../pomodoro/PomodoroAppMain'
import { loadTimerEvents } from '../../../pomodoro/data'
import { TimerEvent } from '../../../pomodoro/interfaces'
import { theme } from '../../../pomodoro/theme'

const PomodoroAppPage = () => {
  const [initialized, setInitialized] = useState(false)
  const [initialTimerEvents, setInitialTimerEvents] = useState<TimerEvent[]>([])
  useEffect(() => {
    setInitialTimerEvents(loadTimerEvents())
    setInitialized(true)
  }, [])

  if (!initialized) {
    return <Box>Loading</Box>
  }
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <PomodoroAppMain initialTimerEvents={initialTimerEvents} />
      </ThemeProvider>
    </Box>
  )
}

export default PomodoroAppPage
