/** @jsxImportSource theme-ui */
import { Box, Heading, Link } from '@theme-ui/components'
import NextLink from 'next/link'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { listVersionData } from '../../../server/data/honkai3rd/versions'
import { format as formatDate } from 'date-fns'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import { VersionData } from '../../../lib/honkai3rd/versions'
import { getI18NProps } from '../../../server/i18n'
import { NextPageContext } from 'next'
import { useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { StigmataSet } from '../../../lib/honkai3rd/stigmata'

interface VersionIndexPageProps {
  versionDataList: VersionData[]
  currentVersionData: VersionData
  currentVersionNewBattlesuits: BattlesuitData[]
  currentVersionNewWeapons: WeaponData[]
  currentVersionNewStigmataSets: StigmataSet[]
}

const VersionIndexPage = ({ versionDataList }: VersionIndexPageProps) => {
  const { t } = useTranslation()

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('common.versions')} - ${t('common.honkai-3rd')} - ${t(
          'common.abyss-lab'
        )}`}
        description={t('versions.list-page-description')}
        canonicalHref={`/honkai3rd/versions`}
      />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/versions', label: t('common.versions') },
          ]}
        />

        <Heading as='h1' mb={3}>
          {t('versions.versions')}
        </Heading>
        <Box>
          {versionDataList.map((versionData) => {
            return (
              <Box key={versionData.version} mb={2}>
                <Heading as='h3'>
                  <NextLink
                    href={`/honkai3rd/versions/${versionData.version}`}
                    passHref
                  >
                    <Link>
                      {versionData.version} : {versionData.name} (
                      {formatDate(new Date(versionData.duration[0]), 'PP')} -{' '}
                      {versionData.duration[1] != null
                        ? formatDate(new Date(versionData.duration[1]), 'PP')
                        : ''}
                      )
                    </Link>
                  </NextLink>
                </Heading>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Honkai3rdLayout>
  )
}

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      versionDataList: listVersionData(locale),
      ...(await getI18NProps(locale)),
    },
  }
}

export default VersionIndexPage
