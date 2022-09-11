import { secondsToMinutes } from 'date-fns'
import { Text } from 'theme-ui'

interface RemainingTimeBoxProps {
  displayRemainingTime: number
}

const RemainingTimeBox = ({ displayRemainingTime }: RemainingTimeBoxProps) => {
  if (displayRemainingTime < 0) {
    displayRemainingTime = 0
  }
  const durationInSecs = Math.ceil(displayRemainingTime / 1000)
  const minutes = secondsToMinutes(durationInSecs)
  const secs = durationInSecs % 60

  return (
    <Text sx={{ fontSize: 72, fontFamily: 'monospace', lineHeight: '1em' }}>
      {prependZero(minutes, 2)}:{prependZero(secs, 2)}
    </Text>
  )
}

export default RemainingTimeBox

function prependZero(value: number, digits: number) {
  const fillCount = digits - value.toString().length

  return `${'0'.repeat(fillCount)}${value}`
}
