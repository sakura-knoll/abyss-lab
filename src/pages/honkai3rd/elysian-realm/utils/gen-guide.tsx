/* eslint-disable @next/next/no-page-custom-font */
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { pick } from 'ramda'
import { Box, Button, Flex, Heading } from 'theme-ui'
import ERGuideGenerator from '../../../../components/organisms/ERGuideGenerator/ERGuideGenerator'
import { BattlesuitData } from '../../../../lib/honkai3rd/battlesuits'
import {
  PopulatedSignetGroup,
  RemembranceSigil,
} from '../../../../lib/honkai3rd/elysianRealm'
import { WeaponData } from '../../../../lib/honkai3rd/weapons'
import { StigmataData } from '../../../../lib/honkai3rd/stigmata'
import { listBattlesuits } from '../../../../server/data/honkai3rd/battlesuits'
import {
  getRemembranceSigils,
  getSignetGroupById,
} from '../../../../server/data/honkai3rd/elysianRealm'
import { listStigmata } from '../../../../server/data/honkai3rd/stigmata'
import { listWeapons } from '../../../../server/data/honkai3rd/weapons'
import { getI18NProps } from '../../../../server/i18n'
import Head from '../../../../components/atoms/Head'
import { useTranslation } from 'next-i18next'

interface GenerateGuidePageProps {
  weapons: WeaponData[]
  stigmata: StigmataData[]
  battlesuits: BattlesuitData[]
  exSignetGroup: PopulatedSignetGroup
  sigils: RemembranceSigil[]
}

const GenerateGuidePage = ({
  weapons,
  stigmata,
  battlesuits,
  exSignetGroup,
  sigils,
}: GenerateGuidePageProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <Box>
      <Head
        title={`ER Guide Generator- ${t('common.honkai-3rd')} - ${t(
          'common.abyss-lab'
        )}`}
        canonicalHref={`/honkai3rd/elysian-realm/utils/gen-guide`}
      />
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
        stigmata={stigmata}
        battlesuits={battlesuits}
        exSignetGroup={exSignetGroup}
        sigils={sigils}
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
      stigmata: listStigmata('ko-KR').map((stigmata) => {
        return pick(['name', 'id', 'type'], stigmata)
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
      sigils: getRemembranceSigils('ko-KR'),
      ...(await getI18NProps('ko-KR')),
    },
  }
}
