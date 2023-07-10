export type TextToken = {
  type: 'text'
  text: string
}
export type ElementToken = {
  type: 'element'
  tagName: string
  children: FormattedTextToken[]
  attributes: {
    [key: string]: any
  }
}

export type FormattedTextToken = TextToken | ElementToken

export function tokenize(value: string) {
  let tokens: FormattedTextToken[] = []
  let currentValue = value.replace(/{{/g, '').replace(/}}/g, '')

  while (currentValue.length > 0) {
    const openingBracketStartIndex = currentValue.indexOf('<color')
    if (openingBracketStartIndex < 0) {
      tokens.push({ type: 'text', text: currentValue })
      eat(openingBracketStartIndex)
      break
    }

    if (openingBracketStartIndex > 0) {
      const beforeBracket = currentValue.slice(0, openingBracketStartIndex)
      tokens.push({ type: 'text', text: beforeBracket })
      eat(openingBracketStartIndex)
      continue
    }

    const openingBracketEndIndex = currentValue.indexOf('>')
    if (openingBracketEndIndex < 0) {
      tokens.push({ type: 'text', text: currentValue })
      eat(currentValue.length)
      continue
    }

    const [tagName, attr] = currentValue.slice(openingBracketStartIndex + 1, openingBracketEndIndex).split('=')

    // Child exists try to find end
    const nextClosingBracketStartIndex = findClosingBracketStartIndex(currentValue)
    const children = tokenize(currentValue.slice(openingBracketEndIndex + 1, nextClosingBracketStartIndex))
    tokens.push({
      type: 'element',
      tagName,
      attributes: {
        color: attr
      },
      children
    })
    const nextClosingBracketEndIndex = currentValue.indexOf('>', nextClosingBracketStartIndex)
    if (nextClosingBracketEndIndex < 0) {
      eat(currentValue.length)
    } else {
      eat(nextClosingBracketEndIndex + 1)
    }
  }

  return tokens

  function eat(length: number) {
    currentValue = currentValue.slice(length)
  }
}

function findClosingBracketStartIndex(value: string): number {
  let currentValue = value
  let cursor = 0
  let depth = 0
  let nextOpeningBracketStartIndex = -1
  let nextClosingBracketStartIndex = -1

  while (cursor < value.length) {
    nextOpeningBracketStartIndex = currentValue.indexOf('<', cursor)
    nextClosingBracketStartIndex = currentValue.indexOf('</', cursor)
    cursor = nextOpeningBracketStartIndex
    if (nextClosingBracketStartIndex === -1) {
      return value.length
    }
    if (nextOpeningBracketStartIndex === nextClosingBracketStartIndex) {
      depth -= 1

      if (depth === 0) {
        return nextClosingBracketStartIndex
      }

      const nextClosingBracketEndIndex = currentValue.indexOf('>', cursor)
      cursor = nextClosingBracketEndIndex
      continue
    }

    let nextOpeningBracketCloseIndex = currentValue.indexOf('>', nextOpeningBracketStartIndex)
    if (nextOpeningBracketCloseIndex === -1) {
      return value.length
    }
    cursor = nextOpeningBracketCloseIndex
    depth += 1
  }

  throw new Error('Failed to find closing bracket. The value might be malformed?')
}
