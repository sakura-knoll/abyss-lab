import { Text } from 'theme-ui'
import { FormattedTextToken, tokenize } from '../../lib/v2-pre/formattedText/tokenize'

interface FormattedTextProps {
  children: string
}

const FormattedText = ({ children }: FormattedTextProps) => {
  const tokens = tokenize(children)

  return <>{renderTokens(tokens)}</>

  function renderTokens(tokens: FormattedTextToken[]) {
    return tokens.map((token, index) => {
      if (token.type === 'element') {
        return (
          <Text key={index} style={{ color: adjustColor(token.attributes.color) }}>
            {renderTokens(token.children)}
          </Text>
        )
      }

      return token.text
    })
  }
}

export default FormattedText

function adjustColor(color: unknown): string | undefined {
  if (typeof color !== 'string') {
    return undefined
  }
  const normalizedColor = color.toUpperCase()

  if (normalizedColor.startsWith('#FEDF4C')) {
    return '#e6c010'
  }

  if (normalizedColor.startsWith('#FFC741')) {
    return '#f0a030'
  }

  if (
    normalizedColor.startsWith('#23B2E') ||
    normalizedColor.startsWith('#23B2E') ||
    normalizedColor.startsWith('#23B2E')
  ) {
    return '#1d9ecc'
  }

  return color
}
