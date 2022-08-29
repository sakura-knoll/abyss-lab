/* eslint-disable @next/next/no-page-custom-font */
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Label,
  Text,
  Textarea,
} from 'theme-ui'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import DifficultyBox from './DifficultyBox'
import SignetBox from './SignetBox'
import { colors } from './styles'
import ValkBox from './ValkBox'
import {
  PopulatedSignetGroup,
  RemembranceSigil,
} from '../../../lib/honkai3rd/elysianRealm'
import SigilBox from './SigilBox'
import SupportBox from './SupportBox'
import DataForm from './DataForm'
import EquipmentBox from './EquipmentBox'
import { Data, DataUpdater, ExSignetType } from './types'
import { StigmataData } from '../../../lib/honkai3rd/stigmata'
import { saveAs } from 'file-saver'
import { toBlob } from 'html-to-image'
import { assetsBucketBaseUrl } from '../../../lib/consts'

interface ERGuideGeneratorProps {
  weapons: WeaponData[]
  stigmata: StigmataData[]
  battlesuits: BattlesuitData[]
  exSignetGroup: PopulatedSignetGroup
  sigils: RemembranceSigil[]
}

const exSignetTypes: ExSignetType[] = ['start', '1st', '2nd', 'backup', 'na']

const ERGuideGenerator = ({
  weapons,
  stigmata,
  battlesuits,
  exSignetGroup,
  sigils,
}: ERGuideGeneratorProps) => {
  const [data, setData] = useState<Data>({
    tag: '',
    signature:
      '작성자 : XXX\nAbyss Lab에서 생성됨\nhttps://abyss-lab.app/honkai3rd',
    battlesuitId: 'vill-v',
    difficulty: 'corruption',
    exSignets:
      exSignetGroup.sets
        .find((set) => set.id === 'elysia-vill-v')
        ?.signets.map((signet, index) => {
          return {
            type: exSignetTypes[index],
            name: signet.name,
          }
        }) || [],
    supportSets: [
      { type: 'util', battlesuitIds: ['le', 'ae'] },
      { type: 'dps', battlesuitIds: ['br', 'ae'] },
    ],
    sigilSets: [
      {
        type: 'start',
        sigilIds: ['burden', 'it-will-be-written'],
      },
      {
        type: 'mid',
        sigilIds: ['burden', 'it-will-be-written'],
      },
      {
        type: 'end',
        sigilIds: ['burden', 'it-will-be-written'],
      },
    ],
    equipmentSets: [
      {
        type: 'best',
        weapon: 'vill-v-pri-weapon',
        top: 'carlo-collodi-top',
        mid: 'carlo-collodi-mid',
        bot: 'carlo-collodi-bot',
      },
      {
        type: 'alt',
        weapon: 'vill-v-pri-weapon',
        top: 'carlo-collodi-top',
        mid: 'carlo-collodi-mid',
        bot: 'carlo-collodi-bot',
      },
    ],
    signets: [
      {
        type: 'core',
        group: 'vill-v',
        nexus: 2,
        description:
          '테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트',
      },
      {
        type: 'core',
        group: 'vill-v',
        nexus: 2,
        description:
          '테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트 테스트 텍스트',
      },
      {
        type: 'sub',
        group: 'vill-v',
        nexus: 2,
        description: '',
      },
      {
        type: 'sub',
        group: 'vill-v',
        nexus: 2,
        description: '',
      },
      {
        type: 'sub',
        group: 'vill-v',
        nexus: 2,
        description: '',
      },
    ],
  })
  const guideRef = useRef(null)

  const updateData = useCallback<DataUpdater>(
    (key, value) => {
      setData((previousData) => {
        const newData = {
          ...previousData,
          [key]: typeof value === 'function' ? value(previousData[key]) : value,
        }

        return newData
      })
    },
    [setData]
  )

  const [customStyle, setCustomStyle] = useState('')
  const loadedRef = useRef(false)
  useEffect(() => {
    if (loadedRef.current) {
      localStorage.setItem('ergg:customStyle', customStyle)
    } else {
      setCustomStyle(localStorage.getItem('ergg:customStyle') || '')
      loadedRef.current = true
    }
  }, [customStyle])

  return (
    <Box>
      <Box sx={{ width: 960 }}>
        <Box
          ref={guideRef}
          sx={{
            width: 960,
            height: 660,
            position: 'relative',
            backgroundColor: colors.backgroundColor,
            color: '#FFF',
            fontFamily: `'NanumSquare', sans-serif`,
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@font-face {
              font-family: 'GyeonggiTitleM';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GyeonggiTitleM.woff') format('woff');
              font-weight: normal;
              font-style: normal;
          }
          @font-face {
            font-family: 'YdestreetB';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/YdestreetB.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }
        @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');
        @font-face {
          font-family: 'ghanachoco';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ghanachoco.woff') format('woff');
          font-weight: normal;
          font-style: normal;
      }


      .exSignetLabel {
        font-family: 'ghanachoco';
      }
      .difficultyLabel {
        font-family: 'YdestreetB';
      }
      .signetTypeLabel {
        font-family: 'YdestreetB';
      }
      .signetDescription {
        font-family: 'GyeonggiTitleM';
      }
      .signetGroupLabel {
        font-family: 'YdestreetB';
      }
      .tagLabel {
        font-family: 'YdestreetB';
      }
          `,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 960,
              height: 660,
              opacity: 0.15,
              backgroundImage: `url('/assets/erbg.png')`,
              backgroundSize: 1300,
              backgroundPositionY: -55,
              backgroundPositionX: -30,
            }}
          ></Box>
          <style
            dangerouslySetInnerHTML={{
              __html: customStyle,
            }}
          />
          <Flex
            sx={{
              position: 'absolute',
              top: 15,
              left: 85,
            }}
          >
            {data.rank && (
              <Image
                alt={data.rank}
                width={40}
                height={40}
                src={`${assetsBucketBaseUrl}/honkai3rd/rank-icons/${data.rank}-rank.png`}
                sx={{ mr: '5px' }}
              />
            )}
            {data.tag && (
              <Box
                sx={{
                  padding: '5px',
                  border: 'solid 1px gray',
                  boxSizing: 'border-box',
                  backgroundColor: '#181614',
                  boxShadow: '5px 5px 10px rgba(0,0,0,0.5)',
                }}
                className='tagLabel'
              >
                {data.tag}
              </Box>
            )}
          </Flex>
          <Flex
            sx={{
              position: 'absolute',
              right: 10,
              padding: '5px 10px',
              boxSizing: 'border-box',
              bottom: 15,
              maxWidth: 460,
              alignItems: 'center',
              whiteSpace: 'pre-wrap',
              color: '#A59A9B',
              fontStyle: 'italic',
              textAlign: 'right',
            }}
          >
            <Text>{data.signature}</Text>
          </Flex>
          <SignetBox signets={data.signets} />
          <DifficultyBox difficulty={data.difficulty} />

          <ValkBox
            battlesuitId={data.battlesuitId}
            exSignets={data.exSignets}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 15 + (87 + 10) * 2,
              left: 15,
            }}
          >
            <SupportBox supportSets={data.supportSets} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 15 + 87 + 10,
              left: 15,
            }}
          >
            <SigilBox sigilSets={data.sigilSets} sigils={sigils} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '15px',
              left: 15,
            }}
          >
            <EquipmentBox
              equipmentSets={data.equipmentSets}
              weapons={weapons}
              stigmata={stigmata}
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <Button
          onClick={async () => {
            if (guideRef.current == null) {
              return
            }

            const blob = await toBlob(guideRef.current)

            if (blob == null) {
              return
            }
            saveAs(blob, 'guide.png')
          }}
        >
          Download
        </Button>
      </Box>

      <DataForm
        exSignetGroup={exSignetGroup}
        battlesuits={battlesuits}
        updateData={updateData}
        data={data}
        sigils={sigils}
        weapons={weapons}
        stigmata={stigmata}
      />

      <Box>
        <Heading as='h3'>사용된 폰트</Heading>
        <Box as='ul'>
          <Box as='li'>
            Y이드스트릿체 https://www.yspotlight.co.kr/brand/font?tabNo=1
          </Box>
          <Box as='li'>나눔스퀘어 https://hangeul.naver.com/2017/nanum</Box>
          <Box as='li'>
            경기천년제목
            https://www.gg.go.kr/contents/contents.do?ciIdx=679&menuId=2457
          </Box>
          <Box as='li'>
            가나초콜릿 hhttps://www.lotteconf.co.kr/prcenter/gana
          </Box>
        </Box>
        <Box>
          <Label>Custom Style(Don&apos;t paste any suspicious scripts!!)</Label>
          <Textarea
            value={customStyle}
            onChange={(event) => {
              setCustomStyle(event.target.value)
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ERGuideGenerator
