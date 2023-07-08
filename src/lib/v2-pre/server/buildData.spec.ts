import { buildBattlesuitList } from './buildData'

describe('buildBattlesuitList', () => {
  it('build list', () => {
    const list = buildBattlesuitList()
    expect(list[0]).toMatchObject({
      id: expect.any(String),
      tags: ['physical-dmg', 'stun', 'burst', 'time-mastery']
    })
    // console.log(list[0])
  })
})
