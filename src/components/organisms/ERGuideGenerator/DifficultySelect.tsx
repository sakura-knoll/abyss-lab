import { Select } from 'theme-ui'
import { Difficulty } from './types'

interface DifficultySelectProps {
  onChange: (newValue: Difficulty) => void
  value: Difficulty
}

const DifficultySelect = ({ onChange, value }: DifficultySelectProps) => {
  return (
    <Select
      onChange={(event) => {
        switch (event.target.value) {
          case 'abstinence':
          case 'corruption':
          case 'inferno':
            onChange(event.target.value)
            break
        }
      }}
      value={value}
    >
      <option value='corruption'>침식</option>
      <option value='abstinence'>제약</option>
      <option value='inferno'>겁화</option>
    </Select>
  )
}

export default DifficultySelect
