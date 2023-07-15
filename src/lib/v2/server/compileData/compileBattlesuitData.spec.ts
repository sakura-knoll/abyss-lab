import { compileBattlesuitData } from './compileBattlesuitData'

describe('compileBattlesuitData', () => {
  it('converts tags', () => {
    const list = compileBattlesuitData('en-US')

    expect(list[0]).toMatchObject({
      id: expect.any(String),
      tags: ['physical-dmg', 'stun', 'burst', 'time-mastery']
    })
    // console.log(list[0])
  })
})
