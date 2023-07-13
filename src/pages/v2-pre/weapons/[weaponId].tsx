import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading } from 'theme-ui'
import FormattedText from '../../../components/v2-pre/FormattedText'
import { formatSubSkillInfo, replaceNewLine } from '../../../lib/v2-pre/data/formatText'
import { loadWeaponCatalog, loadWeaponData } from '../../../lib/v2-pre/server/loadData'
import { RootWeaponData } from '../../../lib/v2-pre/data/types'
import { Fragment } from 'react'
import { getWeaponTypeLabel } from '../../../lib/v2-pre/data/text'
import WeaponTypeIcon from '../../../components/v2-pre/WeaponTypeIcon'
import WeaponIcon from '../../../components/v2-pre/WeaponIcon'

interface WeaponShowPageProps {
  rootWeapon: RootWeaponData
}

const WeaponShowPage = ({ rootWeapon }: WeaponShowPageProps) => {
  const weapon = rootWeapon.weapons[rootWeapon.weapons.length - 1]
  return (
    <Box>
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
          ATK : {Math.floor(weapon.attackBase + weapon.attackAdd * (weapon.maxLv - 1))} / CRT :{' '}
          {Math.floor(weapon.criticalBase + weapon.criticalAdd * (weapon.maxLv - 1))} (at Max Lv {weapon.maxLv})
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
  )
}

export default WeaponShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { weaponId: string } }) {
  const rootWeapon = loadWeaponData(params.weaponId)

  return {
    props: { rootWeapon }
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
