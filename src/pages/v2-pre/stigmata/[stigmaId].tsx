import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading } from 'theme-ui'
import FormattedText from '../../../components/v2-pre/FormattedText'
import { formatSubSkillInfo, replaceNewLine } from '../../../lib/v2-pre/data/formatText'
import { loadStigmaData, loadStigmataCatalog } from '../../../lib/v2-pre/server/loadData'
import { RootStigma, SkillTagItem } from '../../../lib/v2-pre/data/types'
import { Fragment } from 'react'
import TagIcon from '../../../components/v2-pre/TagIcon'
import { getStigmaTypeLabel } from '../../../lib/v2-pre/data/text'
import StigmaTypeIcon from '../../../components/v2-pre/StigmaTypeIcon'
import StigmaIcon from '../../../components/v2-pre/StigmaIcon'
import StigmaFigureImage from '../../../components/v2-pre/StigmaFigureImage'

interface WeaponShowPageProps {
  rootStigma: RootStigma
}

const StigmaShowPage = ({ rootStigma }: WeaponShowPageProps) => {
  const stigma = rootStigma.stigmata[rootStigma.stigmata.length - 1]
  return (
    <Box>
      <Heading as="h1">{stigma.name}</Heading>

      <Box>
        <StigmaFigureImage stigma={stigma} size={720} />
      </Box>

      <Box mb={3}>
        <StigmaIcon key={stigma.id} icon={stigma.icon} rarity={stigma.rarity} />
      </Box>

      <Card mb={3}>
        <Box sx={{ p: 1, borderBottom: 'default' }}>{replaceNewLine(stigma.description)}</Box>
        <Flex sx={{ alignItems: 'center', p: 1, borderBottom: 'default' }}>
          <StigmaTypeIcon type={stigma.type} />
          <Box ml={1}>{getStigmaTypeLabel(stigma.type)}</Box>
        </Flex>
        <Box sx={{ p: 1 }}>
          HP : {Math.floor(stigma.hpBase + stigma.hpAdd * (stigma.maxLv - 1))} / ATK :{' '}
          {Math.floor(stigma.attackBase + stigma.attackAdd * (stigma.maxLv - 1))} / DEF :{' '}
          {Math.floor(stigma.defenceBase + stigma.defenceAdd * (stigma.maxLv - 1))} / CRT :{' '}
          {Math.floor(stigma.criticalBase + stigma.criticalAdd * (stigma.maxLv - 1))} (at Max Lv {stigma.maxLv})
        </Box>
      </Card>

      <Heading as="h2">Skills</Heading>
      <Card>
        {stigma.skills.map(skill => {
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
                    maxLv: stigma.maxLv,
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

export default StigmaShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { stigmaId: string } }) {
  const rootStigma = loadStigmaData(params.stigmaId)

  return {
    props: { rootStigma }
  }
}

export async function getStaticPaths() {
  const stigmataCatalog = loadStigmataCatalog()

  return {
    paths: stigmataCatalog.map(catalogItem => {
      return {
        params: { stigmaId: catalogItem.id }
      }
    }),
    fallback: false
  }
}

interface SkillTagBoxProps {
  tag: SkillTagItem
}

const SkillTagItem = ({ tag }: SkillTagBoxProps) => {
  return <TagIcon type={tag.type} strength={tag.strength} comment={tag.comment} size="sm" />
}
