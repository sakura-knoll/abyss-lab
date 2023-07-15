import { tokenize } from './tokenize'

describe('tokenize', () => {
  it('tokenizes malformed value', () => {
    const rawString = '<color=#FFC741FF>분기'

    const result = tokenize(rawString)

    expect(result).toEqual([
      {
        type: 'element',
        tagName: 'color',
        attributes: {
          color: '#FFC741FF'
        },
        children: [
          {
            type: 'text',
            text: '분기'
          }
        ]
      }
    ])
  })
  it('tokenizes nested tags', () => {
    const rawString =
      '기본 공격 또는 분기 공격이 적에게 연소 게이지를 <color=#FEDF4CFF><color=#23B2E3FF>4.0</color>pt 누적한다.</color> 발동 간격: <color=#23B2E3FF>6.0</color>초. 기본 공격과 분기 공격이 가하는 화염 원소 대미지가 <color=#23B2E3FF>30.0%</color> 증가한다.'

    const result = tokenize(rawString)

    expect(result).toEqual([
      {
        type: 'text',
        text: '기본 공격 또는 분기 공격이 적에게 연소 게이지를 '
      },
      {
        type: 'element',
        tagName: 'color',
        attributes: {
          color: '#FEDF4CFF'
        },
        children: [
          {
            type: 'element',
            tagName: 'color',
            attributes: { color: '#23B2E3FF' },

            children: [
              {
                type: 'text',
                text: '4.0'
              }
            ]
          },
          {
            type: 'text',
            text: 'pt 누적한다.'
          }
        ]
      },
      {
        type: 'text',
        text: ' 발동 간격: '
      },
      {
        type: 'element',
        tagName: 'color',
        attributes: { color: '#23B2E3FF' },
        children: [{ type: 'text', text: '6.0' }]
      },
      {
        type: 'text',
        text: '초. 기본 공격과 분기 공격이 가하는 화염 원소 대미지가 '
      },
      {
        type: 'element',
        tagName: 'color',
        attributes: { color: '#23B2E3FF' },
        children: [{ type: 'text', text: '30.0%' }]
      },
      {
        type: 'text',
        text: ' 증가한다.'
      }
    ])
  })

  it('tokenizes size tag', () => {
    const rawString = '<size=14>Hello</size>'

    const result = tokenize(rawString)

    expect(result).toEqual([
      {
        type: 'element',
        tagName: 'size',
        attributes: {
          size: '14'
        },
        children: [
          {
            type: 'text',
            text: 'Hello'
          }
        ]
      }
    ])
  })
})
