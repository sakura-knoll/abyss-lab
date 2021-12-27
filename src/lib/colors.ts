import openColors from 'open-color'

export const colors = Object.entries(openColors)
  .map(([colorName, colorObjectMap]) => {
    return [colorName, Object.values(colorObjectMap) as string[]] as [
      string,
      string[]
    ]
  })
  .reduce<{ [key: string]: string[] }>((map, [colorName, colorArray]) => {
    map[colorName] = colorArray
    return map
  }, {})
