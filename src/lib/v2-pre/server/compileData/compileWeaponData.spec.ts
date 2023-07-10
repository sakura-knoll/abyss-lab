import { compileWeaponData } from './compileWeaponData'

describe('compileWeaponData', () => {
  it('compiles', () => {
    const list = compileWeaponData()

    const targetItem = list.find(weapon => weapon.id === '10277')

    expect(targetItem).toMatchObject({
      id: expect.any(String),
      weapons: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String)
        })
      ])
    })

    expect(targetItem?.weapons[3]).toMatchObject({
      skills: [
        {
          id: '1221'
        },
        {
          id: '2297'
        }
      ]
    })
    // console.log(targetItem!.weapons[3])
  })
})
