/** @jsxImportSource theme-ui */
import { Box, Card, Heading, Paragraph } from '@theme-ui/components'
import { NextPageContext } from 'next'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import { generateI18NPaths, getI18NProps } from '../../../server/i18n'
import {
  getWeaponById,
  getWeaponMapByIds,
  listWeapons,
} from '../../../server/data/honkai3rd/weapons'
import { useRouter } from 'next/router'
import { useTranslation, translate } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import PageLink from '../../../components/atoms/PageLink'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import { getBattlesuitMapByIds } from '../../../server/data/honkai3rd/battlesuits'
import { BattlesuitData } from '../../../lib/honkai3rd/battlesuits'
import BattlesuitCard from '../../../components/molecules/BattlesuitCard'
import WeaponCard from '../../../components/molecules/WeaponCard'
import SourceCard from '../../../components/molecules/SourceCard'

interface WeaponShowPageProps {
  weapon: WeaponData
  battlesuitMap: { [key: string]: BattlesuitData }
  weaponMap: { [key: string]: WeaponData }
}

const WeaponShowPage = ({
  weapon,
  battlesuitMap,
  weaponMap,
}: WeaponShowPageProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const weaponName = translate(locale, { 'ko-KR': weapon.krName }, weapon.name)
  const weaponCategory = t(`weapons-show.${weapon.category}`)

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: ${weaponName} - ${t(
          'nav.abyss-lab'
        )}`}
        description={`${t('breadcrumb.honkai-3rd')} ${t(
          'weapons-show.weapon'
        )} / ${'⭐'.repeat(weapon.rarity)} / ${weaponCategory} / ATK : ${
          weapon.atk
        } / CRT : ${weapon.crt}`}
      />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('breadcrumb.honkai-3rd') },
            { href: '/honkai3rd/weapons', label: t('breadcrumb.weapons') },
            {
              href: `/honkai3rd/weapons/${weapon.id}`,
              label: weaponName,
            },
          ]}
        />

        <Heading as='h1'>{weaponName}</Heading>

        <Box mb={3}>
          <SquareImageBox
            size={100}
            alt={weaponName}
            src={`${assetsBucketBaseUrl}/honkai3rd/weapons/${weapon.id}.png`}
          />
        </Box>

        <Card mb={3}>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            <PageLink
              href={{
                pathname: '/honkai3rd/weapons',
                query: { filter: weapon.category },
              }}
            >
              {weaponCategory}
            </PageLink>
          </Box>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {'⭐'.repeat(weapon.rarity)}
          </Box>
          <Box p={2}>
            ATK : {weapon.atk} / CRT : {weapon.crt}
          </Box>
          {weapon.battlesuits != null && weapon.battlesuits.length > 0 && (
            <Box sx={{ p: 2, borderTop: 'default' }}>
              <Heading as='h4'>{t('weapons-show.best-on')}</Heading>
              {weapon.battlesuits.map(({ id: battlesuitId }) => {
                return (
                  <BattlesuitCard
                    key={battlesuitId}
                    size='sm'
                    battlesuit={battlesuitMap[battlesuitId]}
                  />
                )
              })}
            </Box>
          )}
          {weapon.priWeapon != null && (
            <Box sx={{ p: 2, borderTop: 'default' }}>
              <Heading as='h4'>{t('weapons-show.pri-weapon')}</Heading>
              <WeaponCard size='sm' weapon={weaponMap[weapon.priWeapon]} />
            </Box>
          )}
          {weapon.originalWeapons != null && weapon.originalWeapons.length > 0 && (
            <Box sx={{ p: 2, borderTop: 'default' }}>
              <Heading as='h4'>{t('weapons-show.original-weapon')}</Heading>
              {weapon.originalWeapons.map((originalWeaponId) => {
                return (
                  <WeaponCard
                    key={originalWeaponId}
                    size='sm'
                    weapon={weaponMap[originalWeaponId]}
                  />
                )
              })}
            </Box>
          )}
          {weapon.sources != null && (
            <Box sx={{ p: 2, borderTop: 'default' }}>
              <Heading as='h4'>{t('weapons-show.sources')}</Heading>
              {weapon.sources
                .sort((a, b) => a.type.localeCompare(b.type))
                .map((source) => {
                  return <SourceCard key={source.type} source={source} />
                })}
            </Box>
          )}
        </Card>

        <Box>
          {weapon.skills.map((skill) => {
            return (
              <Card key={skill.name} mb={3}>
                <Heading as='h3' p={2} m={0} sx={{ borderBottom: 'default' }}>
                  {translate(locale, { 'ko-KR': skill.krName }, skill.name)}
                </Heading>
                <Paragraph
                  p={2}
                  sx={{
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {translate(
                    locale,
                    { 'ko-KR': skill.krDescription },
                    skill.description
                  )}
                </Paragraph>
              </Card>
            )
          })}
        </Box>
      </Box>
    </Honkai3rdLayout>
  )
}

export default WeaponShowPage

export async function getStaticProps({
  params,
  locale,
}: NextPageContext & { params: { weaponId: string } }) {
  const weapon = getWeaponById(params.weaponId)
  const battlesuitMap = getBattlesuitMapByIds(
    weapon != null && weapon.battlesuits != null
      ? weapon.battlesuits.map(({ id }) => id)
      : []
  )

  const weaponIds = []
  if (weapon != null) {
    if (weapon.priWeapon != null) {
      weaponIds.push(weapon.priWeapon)
    }
    if (weapon.originalWeapons != null) {
      weaponIds.push(...weapon.originalWeapons)
    }
  }
  const weaponMap = getWeaponMapByIds(weaponIds)

  return {
    props: {
      weapon,
      battlesuitMap,
      weaponMap,
      ...(await getI18NProps(locale)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: generateI18NPaths(
      listWeapons().map((weapon) => {
        return {
          params: { weaponId: weapon.id },
        }
      })
    ),
    fallback: false,
  }
}
