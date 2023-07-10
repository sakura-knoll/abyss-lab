import { formatSubSkillInfo } from './formatText'

describe('formatSubSkillInfo', () => {
  it('prepends 0 if the calculated value below 0', () => {
    const params = {
      info: '필살기 꿈 세계 창조는 추가로 SP를 소모해 물리 대미지가 추가 소모 SP*#1[f2]%만큼 증가하고, 크리티컬률이 추가 소모 SP*#2[f2]%만큼 증가한다(최대 추가 소모 SP: 50pt). 해당 효과는 피니쉬가 종료될 때까지 지속되며, 캐릭터가 사망하거나 퇴장 시 해제된다.',
      maxLv: 11,
      paramBase1: 0.004,
      paramBase2: 0.0025,
      paramBase3: 0,
      paramAdd1: 0.0003,
      paramAdd2: 0.00025,
      paramAdd3: 0
    }

    const result = formatSubSkillInfo(params)

    expect(result).toBe(
      '필살기 꿈 세계 창조는 추가로 SP를 소모해 물리 대미지가 추가 소모 SP*<color=#23B2E3FF>0.70%</color>만큼 증가하고, 크리티컬률이 추가 소모 SP*<color=#23B2E3FF>0.50%</color>만큼 증가한다(최대 추가 소모 SP: 50pt). 해당 효과는 피니쉬가 종료될 때까지 지속되며, 캐릭터가 사망하거나 퇴장 시 해제된다.'
    )
  })

  it('appends 0, based on precision, if the calculated value does not have decimals', () => {
    const params = {
      info: '전투 중 초기 SP가 #1[f1] 증가하며, 오픈월드에서는 10분에 1회 발동한다.',

      maxLv: 11,
      paramBase1: 20,
      paramBase2: 0,
      paramBase3: 0,
      paramAdd1: 2,
      paramAdd2: 0,
      paramAdd3: 0
    }

    const result = formatSubSkillInfo(params)

    expect(result).toBe('전투 중 초기 SP가 <color=#23B2E3FF>40.0</color> 증가하며, 오픈월드에서는 10분에 1회 발동한다.')
  })
  it('prepends 0 if the calculated value below 0', () => {
    const params = {
      info: '파티원이 출혈 상태의 적 공격 시, 출혈 상태 스택마다 크리티컬률이 #1[f1]% 증가하고, 캐릭터 자신의 물리 대미지가 #2[f1]% 증가한다.',
      maxLv: 11,
      paramBase1: 0.004,
      paramBase2: 0.0025,
      paramBase3: 0,
      paramAdd1: 0.0003,
      paramAdd2: 0.00025,
      paramAdd3: 0
    }

    const result = formatSubSkillInfo(params)

    expect(result).toBe(
      '필살기 꿈 세계 창조는 추가로 SP를 소모해 물리 대미지가 추가 소모 SP*<color=#23B2E3FF>0.70%</color>만큼 증가하고, 크리티컬률이 추가 소모 SP*<color=#23B2E3FF>0.50%</color>만큼 증가한다(최대 추가 소모 SP: 50pt). 해당 효과는 피니쉬가 종료될 때까지 지속되며, 캐릭터가 사망하거나 퇴장 시 해제된다.'
    )
  })
})
