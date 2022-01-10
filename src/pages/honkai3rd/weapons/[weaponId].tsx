/** @jsxImportSource theme-ui */
import { Box, Card, Heading, Paragraph } from '@theme-ui/components'
import { NextPageContext } from 'next'
import SquareImageBox from '../../../components/atoms/SquareImageBox'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { WeaponData } from '../../../lib/honkai3rd/weapons'
import { generateI18NPaths, getI18NProps } from '../../../server/i18n'
import {
  getWeaponById,
  listWeapons,
} from '../../../server/data/honkai3rd/weapons'
import { useRouter } from 'next/router'
import { useTranslation, translate } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'

interface WeaponShowPageProps {
  weapon: WeaponData
}

const WeaponShowPage = ({ weapon }: WeaponShowPageProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const weaponName = translate(locale, { 'ko-KR': weapon.krName }, weapon.name)
  const weaponCategory = t(`weapons-show.${weapon.category}`)

  return (
    <Box>
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: ${weaponName} - Abyss Lab`}
        description={`${t('breadcrumb.honkai-3rd')} ${t(
          'weapons-show.weapon'
        )} / ${'⭐'.repeat(weapon.rarity)} / ${weaponCategory} / ATK : ${
          weapon.atk
        } / CRT : ${weapon.crt}`}
      />
      <Honkai3rdNavigator />

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
            src={`/assets/honkai3rd/weapons/${weapon.id}.png`}
          />
        </Box>

        <Card mb={3}>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {weaponCategory}
          </Box>
          <Box p={2} sx={{ borderBottom: 'default' }}>
            {'⭐'.repeat(weapon.rarity)}
          </Box>
          <Box p={2}>
            ATK : {weapon.atk} / CRT : {weapon.crt}
          </Box>
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
    </Box>
  )
}

export default WeaponShowPage

export async function getStaticProps({
  params,
  locale,
}: NextPageContext & { params: { weaponId: string } }) {
  const weapon = getWeaponById(params.weaponId)

  return {
    props: { weapon, ...(await getI18NProps(locale)) },
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
