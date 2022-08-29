import { Box } from 'theme-ui'
import { colors } from './styles'

interface DifficultyBoxProps {
  difficulty: 'abstinence' | 'corruption' | 'inferno'
}

const DifficultyBox = ({ difficulty }: DifficultyBoxProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 15,
        width: 60,
        height: 105,
        backgroundColor:
          difficulty === 'corruption'
            ? colors.corruptionDifficultyColor
            : difficulty === 'abstinence'
            ? colors.abstinenceDifficultyColor
            : colors.infernoDifficultyColor,
        padding: '5px',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        boxShadow: '5px 5px 10px rgba(0,0,0,0.5)',
      }}
      className='difficultyLabel'
    >
      <Box
        sx={{
          color: colors.backgroundColor,
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 16,
        }}
      >
        난이도
      </Box>
      <Box
        sx={{
          borderColor: colors.backgroundColor,
          borderWidth: '1px 0 1px',
          borderStyle: 'dashed',
          width: '100%',
        }}
      />
      <Box
        sx={{
          color: colors.backgroundColor,
          fontWeight: 'bold',
          fontSize: 25,
          textAlign: 'center',
        }}
      >
        {difficulty === 'corruption'
          ? '침식'
          : difficulty === 'abstinence'
          ? '제약'
          : '겁화'}
      </Box>
      <Box
        sx={{
          borderColor: colors.backgroundColor,
          borderWidth: '1px 0 1px',
          borderStyle: 'dashed',
          width: '100%',
        }}
      />
      <Box
        sx={{
          color: colors.backgroundColor,
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 16,
        }}
      >
        추천
      </Box>
    </Box>
  )
}

export default DifficultyBox
