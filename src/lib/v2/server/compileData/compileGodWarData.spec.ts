import { compileGodWarData } from './compileGodWarData'

describe('compileGodWarData', () => {
  it('compiles main battlesuit abilities and signets', () => {
    const { mainAvatarList } = compileGodWarData('en-US')

    const targetItem = mainAvatarList[11]
    expect(targetItem).toMatchObject({
      battlesuit: expect.any(String),
      abilities: expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          desc: expect.any(String)
        })
      ]),
      signets: expect.arrayContaining([
        {
          id: expect.any(String),
          buffSuit: expect.any(String),
          name: expect.any(String),
          desc: expect.any(String),
          quality: expect.any(Number)
        }
      ])
    })
  })

  it('compiles buff list per suit', () => {
    const { buffSuitBuffListMap } = compileGodWarData('en-US')

    const targetItem = buffSuitBuffListMap.get('3')

    expect(targetItem).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          buffSuit: expect.any(String),
          name: expect.any(String),
          desc: expect.any(String),
          quality: expect.any(Number)
        })
      ])
    )
  })
})
