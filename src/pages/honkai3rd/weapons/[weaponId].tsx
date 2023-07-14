import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading } from 'theme-ui'
import FormattedText from '../../../components/v2/FormattedText'
import { formatSubSkillInfo, replaceNewLine } from '../../../lib/v2/data/formatText'
import { loadWeaponCatalog, loadWeaponData } from '../../../lib/v2/server/loadData'
import { RootWeaponData } from '../../../lib/v2/data/types'
import { Fragment } from 'react'
import { getWeaponTypeLabel } from '../../../lib/v2/data/text'
import WeaponTypeIcon from '../../../components/v2/WeaponTypeIcon'
import WeaponIcon from '../../../components/v2/WeaponIcon'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import Head from '../../../components/atoms/Head'
import { useTranslation } from 'next-i18next'
import { getI18NProps } from '../../../server/i18n'
import Breadcrumb from '../../../components/organisms/Breadcrumb'

interface WeaponShowPageProps {
  rootWeapon: RootWeaponData
}

const WeaponShowPage = ({ rootWeapon }: WeaponShowPageProps) => {
  const { t } = useTranslation()
  const weapon = rootWeapon.weapons[rootWeapon.weapons.length - 1]

  const weaponTypeLabel = getWeaponTypeLabel(weapon.type)
  const atk = Math.floor(weapon.attackBase + weapon.attackAdd * (weapon.maxLv - 1))
  const crt = Math.floor(weapon.criticalBase + weapon.criticalAdd * (weapon.maxLv - 1))

  return (
    <Honkai3rdLayout>
      <Head
        title={`${weapon.name} - ${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        description={`${t('common.honkai-3rd')} ${t('weapons-show.weapon')} / ${'⭐'.repeat(
          weapon.rarity
        )} / ${weaponTypeLabel} / ATK : ${atk} / CRT : ${crt}`}
        canonicalHref={`/honkai3rd/v2/weapons/${weapon.id}`}
      />
      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/v2/weapons', label: t('common.weapons') },
            { href: `/honkai3rd/v2/weapons/${weapon.id}`, label: weapon.name }
          ]}
        />

        <Heading as="h1">{weapon.name}</Heading>

        <Box mb={3}>
          <WeaponIcon key={weapon.id} icon={weapon.icon} rarity={weapon.rarity} />
        </Box>

        <Card mb={3}>
          <Box sx={{ p: 1, borderBottom: 'default' }}>{replaceNewLine(weapon.description)}</Box>
          <Flex sx={{ alignItems: 'center', p: 1, borderBottom: 'default' }}>
            <WeaponTypeIcon type={weapon.type} />
            <Box ml={1}>{getWeaponTypeLabel(weapon.type)}</Box>
          </Flex>
          <Box sx={{ p: 1 }}>
            ATK : {atk} / CRT : {crt} (at Max Lv {weapon.maxLv})
          </Box>
        </Card>

        <Heading as="h2">Skills</Heading>
        <Card>
          {weapon.skills.map(skill => {
            return (
              <Fragment key={skill.id}>
                <Box sx={{ borderBottom: 'default' }}>
                  <Heading
                    as="h3"
                    sx={{
                      p: 1,
                      m: 1
                    }}
                  >
                    {skill.name}
                  </Heading>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    borderBottom: 'default',
                    '&:last-child': {
                      borderBottom: 'none'
                    }
                  }}
                >
                  <FormattedText>
                    {formatSubSkillInfo({
                      info: skill.info,
                      maxLv: weapon.maxLv,
                      paramBase1: skill.param1,
                      paramBase2: skill.param2,
                      paramBase3: skill.param3,
                      paramAdd1: skill.param1Add,
                      paramAdd2: skill.param2Add,
                      paramAdd3: skill.param3Add
                    })}
                  </FormattedText>
                </Box>
              </Fragment>
            )
          })}
        </Card>
        {/* <pre>{JSON.stringify(weapon, null, 2)}</pre> */}
      </Box>
    </Honkai3rdLayout>
  )
}

export default WeaponShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { weaponId: string } }) {
  const rootWeapon = loadWeaponData(params.weaponId)

  return {
    props: { rootWeapon, ...(await getI18NProps(locale)) }
  }
}

export async function getStaticPaths() {
  const weaponCatalog = loadWeaponCatalog()

  return {
    paths: weaponCatalog.map(catalogItem => {
      return {
        params: { weaponId: catalogItem.id }
      }
    }),
    fallback: false
  }
}
