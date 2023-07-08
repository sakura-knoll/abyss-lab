import { BattlesuitSkill } from './types'

export function sortBattlesuitSkill(a: BattlesuitSkill, b: BattlesuitSkill) {
  return reversedSkillTypeOrder.indexOf(b.skillType) - reversedSkillTypeOrder.indexOf(a.skillType)
}

const reversedSkillTypeOrder = ['leader', 'passive', 'evasion', 'special', 'ultimate', 'basic', 'sp', 'none'].reverse()
