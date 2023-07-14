import { BattlesuitSkill } from './types'

export function formatSkillInfo(skill: BattlesuitSkill) {
  let param1 = 0
  let param2 = 0
  let param3 = 0
  if (skill.paramSubId1 !== 0) {
    const subSkill = skill.subSkills.find(subSkill => subSkill.id === skill.paramSubId1.toString())
    if (subSkill != null) {
      param1 = calculateParams(subSkill).param1
    }
  }
  if (skill.paramSubId2 !== 0) {
    const subSkill = skill.subSkills.find(subSkill => subSkill.id === skill.paramSubId2.toString())
    if (subSkill != null) {
      param2 = calculateParams(subSkill).param2
    }
  }
  if (skill.paramSubId3 !== 0) {
    const subSkill = skill.subSkills.find(subSkill => subSkill.id === skill.paramSubId1.toString())
    if (subSkill != null) {
      param1 = calculateParams(subSkill).param3
    }
  }
  const params = {
    param1,
    param2,
    param3
  }

  return replaceParams(replaceNewLine(skill.info), params)
}

export function formatSubSkillInfo({
  info,
  maxLv,
  paramBase1,
  paramBase2,
  paramBase3,
  paramAdd1,
  paramAdd2,
  paramAdd3
}: {
  info: string
  maxLv: number
  paramBase1: number
  paramBase2: number
  paramBase3: number
  paramAdd1: number
  paramAdd2: number
  paramAdd3: number
}) {
  return replaceParams(
    replaceNewLine(info),
    calculateParams({
      maxLv,
      paramBase1,
      paramBase2,
      paramBase3,
      paramAdd1,
      paramAdd2,
      paramAdd3
    })
  )
}

export function replaceNewLine(value: string) {
  if (value == null) {
    return ''
  }
  return value.replace(/\\n/g, '\n').trim()
}

function convertToPercentage(value: number) {
  return value * 100
}

function trimValue(value: number, precision: number = 1): string {
  if (precision === 0) {
    return Math.round(value).toString()
  }

  const rounded = Math.round(value * Math.pow(10, precision)).toString()

  return `${rounded.slice(0, -1 * precision) || '0'}.${rounded.slice(-1 * precision)}`
}

function calculateParams(params: {
  maxLv: number
  paramBase1: number
  paramBase2: number
  paramBase3: number
  paramAdd1: number
  paramAdd2: number
  paramAdd3: number
}): {
  param1: number
  param2: number
  param3: number
} {
  return {
    param1: params.paramBase1 + (params.maxLv - 1) * params.paramAdd1,
    param2: params.paramBase2 + (params.maxLv - 1) * params.paramAdd2,
    param3: params.paramBase3 + (params.maxLv - 1) * params.paramAdd3
  }
}

const paramRegex = /#([123])\[(i|f[0-9])\](%)?/
function replaceParams(
  text: string,
  params: {
    param1: number
    param2: number
    param3: number
  }
): string {
  const result = paramRegex.exec(text)
  if (result == null) {
    return text
  }
  const paramNumber = result[1]
  const precision = result[2] === 'i' ? 0 : parseInt(result[2].slice(1), 10)
  const asPercentage = result[3]!!

  const value = paramNumber === '1' ? params.param1 : paramNumber === '2' ? params.param2 : params.param3

  const valueString = asPercentage
    ? trimValue(convertToPercentage(value), precision) + '%'
    : trimValue(value, precision)

  const replacedText = text.replace(paramRegex, '<color=#23B2E3FF>' + valueString + '</color>')

  return replaceParams(replacedText, params)
}
