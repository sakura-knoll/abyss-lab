/** @jsxImportSource theme-ui */
import { Box } from '@theme-ui/components'
import { BattlesuitData } from '../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../lib/honkai3rd/weapons'
import { VersionData } from '../../lib/honkai3rd/versions'
import { getI18NProps } from '../../server/i18n'
import { NextPageContext } from 'next'
import { useTranslation } from '../../lib/i18n'
import Head from '../../components/atoms/Head'
import { StigmataSet } from '../../lib/honkai3rd/stigmata'
import Honkai3rdNavigator from '../../components/organisms/Honkai3rdNavigator'

interface VersionIndexPageProps {
  versionDataList: VersionData[]
  currentVersionData: VersionData
  currentVersionNewBattlesuits: BattlesuitData[]
  currentVersionNewWeapons: WeaponData[]
  currentVersionNewStigmataSets: StigmataSet[]
}

const HomePage = ({}: VersionIndexPageProps) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Head title={`${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`} canonicalHref={`/honkai3rd`} />

      <Box p={2}>
        <Head title={`${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`} canonicalHref={`/honkai3rd`} />

        <Honkai3rdNavigator />
      </Box>
    </Box>
  )
}

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      ...(await getI18NProps(locale))
    }
  }
}

export default HomePage
