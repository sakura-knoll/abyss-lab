/* eslint-disable @next/next/no-page-custom-font */
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { pick } from 'ramda'
import { Box, Button, Flex, Heading } from 'theme-ui'
import ERGuideGenerator from '../../../../components/organisms/ERGuideGenerator/ERGuideGenerator'
import { BattlesuitData } from '../../../../lib/honkai3rd/battlesuits'
import { PopulatedSignetGroup } from '../../../../lib/honkai3rd/elysianRealm'
import { WeaponData } from '../../../../lib/honkai3rd/weapons'
import { listBattlesuits } from '../../../../server/data/honkai3rd/battlesuits'
import { getSignetGroupById } from '../../../../server/data/honkai3rd/elysianRealm'
import { listWeapons } from '../../../../server/data/honkai3rd/weapons'
import { getI18NProps } from '../../../../server/i18n'

interface GenerateGuidePageProps {
  weapons: WeaponData[]
  battlesuits: BattlesuitData[]
  exSignetGroup: PopulatedSignetGroup
}

const GenerateGuidePage = ({
  weapons,
  battlesuits,
  exSignetGroup,
}: GenerateGuidePageProps) => {
  const router = useRouter()

  return (
    <Box>
      <Flex m={2} sx={{ alignItems: 'center' }}>
        <Button
          onClick={() => {
            router.push('/honkai3rd')
          }}
          mr={2}
        >
          Back
        </Button>
        <Heading>ER Guide Generator</Heading>
      </Flex>
      <ERGuideGenerator
        weapons={weapons}
        battlesuits={battlesuits}
        exSignetGroup={exSignetGroup}
      />
    </Box>
  )
}

export default GenerateGuidePage

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      weapons: listWeapons('ko-KR').map((weapon) => {
        return pick(['name', 'id', 'rarity', 'category'], weapon)
      }),
      battlesuits: listBattlesuits('ko-KR').map((battlesuit) => {
        return {
          id: battlesuit.id,
          name: battlesuit.name,
          type: battlesuit.type,
          valkyrie: battlesuit.valkyrie,
        }
      }),
      exSignetGroup: getSignetGroupById('elysia', 'ko-KR'),
      ...(await getI18NProps('ko-KR')),
    },
  }
}
