/** @jsxImportSource theme-ui */
import { Box, Heading } from '@theme-ui/components'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { NextPageContext } from 'next'
import { getI18NProps } from '../../../server/i18n'
import { useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { times } from 'ramda'

const enemyIdList = [
  ...times((i) => i + 0, 1000).map((i) => {
    const stringified = i.toString()
    return `BOSS_${'0'.repeat(3 - stringified.length) + stringified}`
  }),
  // ...times((i) => i + 65, 26)
  //   .reduce<[number, number][]>((array, first) => {
  //     array.push(
  //       ...times((i) => i + 65, 26).map<[number, number]>((second) => [
  //         first,
  //         second,
  //       ])
  //     )
  //     return array
  //   }, [])
  //   .map(([first, second]) => {
  //     return String.fromCharCode(first) + String.fromCharCode(second)
  //   })
  //   .reduce<string[]>((idList, prefix) => {
  //     idList.push(
  //       ...times((i) => i + 12, 1).map((i) => {
  //         const stringified = i.toString()
  //         return `${prefix}_${'0'.repeat(3 - stringified.length) + stringified}`
  //       })
  //     )
  //     return idList
  //   }, []),
]

console.log(
  times((i) => i + 65, 26)
    .reduce<[number, number][]>((array, first) => {
      array.push(
        ...times((i) => i + 65, 26).map<[number, number]>((second) => [
          first,
          second,
        ])
      )
      return array
    }, [])
    .map(([first, second]) => {
      return String.fromCharCode(first) + String.fromCharCode(second)
    })
    .reduce<string[]>((idList, prefix) => {
      idList.push(
        ...times((i) => i + 10, 1).map((i) => {
          const stringified = i.toString()
          return `${prefix}_${'0'.repeat(3 - stringified.length) + stringified}`
        })
      )
      return idList
    }, [])
)

// console.log(
//   times(i => i + 65, 26).map(code => {
//     return [...times((i) => i + 10, 10).map((i) => {
//       const stringified = i.toString()
//       return `_${'0'.repeat(3 - stringified.length) + stringified}`
//     })]
//   })
// )

const Honkai3rdIndexPage = () => {
  const { t } = useTranslation()
  const [validList, setValidList] = useState<string[]>([])
  const validMap = useMemo(() => {
    return new Map(validList.map((id) => [id, id]))
  }, [validList])
  const initializedRef = useRef(false)

  const appendValidList = useCallback((enemyId: string) => {
    setValidList((previousList) => {
      return [...previousList, enemyId]
    })
  }, [])

  useEffect(() => {
    let data = validList
    if (!initializedRef.current) {
      initializedRef.current = true
      let rawValidEnemyIdList = localStorage.getItem('valid-enemy-id-list')
      try {
        console.log('load')
        data = JSON.parse(rawValidEnemyIdList || '[]')
        if (!Array.isArray(data)) {
          throw new Error('data must be array')
        }
      } catch (error) {
        console.warn(error)
        data = []
      }
      setValidList(data)
      return
    }

    console.log('save')
    localStorage.setItem('valid-enemy-id-list', JSON.stringify(data))
  }, [validList])

  return (
    <Box>
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: Home - ${t('nav.abyss-lab')}`}
        description={t('index.description')}
      />
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[{ href: 'honkai3rd', label: t('breadcrumb.honkai-3rd') }]}
        />
        <Heading as='h1'>Enemies </Heading>
      </Box>

      <Box>
        {enemyIdList
          .filter((enemyId) => !validMap.get(enemyId))
          .map((enemyId) => {
            return (
              <Box key={enemyId}>
                <img
                  alt={enemyId}
                  src={`https://upload-os-bbs.mihoyo.com/game_record/honkai3rd/global/SpriteOutput/OpenWorld/QuestBossIcon/${enemyId}.png`}
                />
                <button
                  onClick={() => {
                    appendValidList(enemyId)
                  }}
                >
                  Add
                </button>
              </Box>
            )
          })}
      </Box>
      <h2>Valid</h2>
      <Box>
        {validList.map((enemyId) => {
          return (
            <Box key={enemyId}>
              <img
                alt={enemyId}
                src={`https://upload-os-bbs.mihoyo.com/game_record/honkai3rd/global/SpriteOutput/OpenWorld/QuestBossIcon/${enemyId}.png`}
              />
              {enemyId}
              <button
                onClick={() => {
                  appendValidList(enemyId)
                }}
              >
                Add
              </button>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      ...(await getI18NProps(locale)),
    },
  }
}

export default Honkai3rdIndexPage
