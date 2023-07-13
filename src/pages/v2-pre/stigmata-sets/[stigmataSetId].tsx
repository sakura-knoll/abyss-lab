import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading, Link } from 'theme-ui'
import FormattedText from '../../../components/v2-pre/FormattedText'
import { formatSubSkillInfo } from '../../../lib/v2-pre/data/formatText'
import { loadStigmaData, loadStigmataSetCatalog, loadStigmataSetData } from '../../../lib/v2-pre/server/loadData'
import { RootStigma, StigmataSet } from '../../../lib/v2-pre/data/types'
import { Fragment } from 'react'
import StigmaIcon from '../../../components/v2-pre/StigmaIcon'
import StigmaFigureImage from '../../../components/v2-pre/StigmaFigureImage'

interface StigmataSetShowPage {
  stigmataSet: StigmataSet
  stigmata: RootStigma[]
}

const StigmataSetShowPage = ({ stigmataSet, stigmata }: StigmataSetShowPage) => {
  return (
    <Box>
      <Heading as="h1">{stigmataSet.name}</Heading>
      <Card mb={3}>
        {stigmata.map(rootStigma => {
          const stigma = rootStigma.stigmata[rootStigma.stigmata.length - 1]
          return (
            <>
              <Flex sx={{ borderBottom: 'default', '&:last-child': { borderBottom: 'none' } }}>
                <Box sx={{ flexShrink: 0, borderRight: 'default', p: 1 }}>
                  <StigmaIcon key={stigma.id} icon={stigma.icon} rarity={stigma.rarity} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Flex sx={{ borderBottom: 'default', alignItems: 'center', p: 1 }}>
                    <Heading
                      as="h3"
                      sx={{
                        my: 1
                      }}
                    >
                      <Link href={`/v2-pre/stigmata/${rootStigma.id}`}>{stigma.name}</Link>
                    </Heading>
                  </Flex>

                  <Flex sx={{ alignItems: 'center', p: 1, borderBottom: 'default' }}>
                    <Box>
                      HP : {Math.floor(stigma.hpBase + stigma.hpAdd * (stigma.maxLv - 1))} / ATK :{' '}
                      {Math.floor(stigma.attackBase + stigma.attackAdd * (stigma.maxLv - 1))} / DEF :{' '}
                      {Math.floor(stigma.defenceBase + stigma.defenceAdd * (stigma.maxLv - 1))} / CRT :{' '}
                      {Math.floor(stigma.criticalBase + stigma.criticalAdd * (stigma.maxLv - 1))} (at Max Lv{' '}
                      {stigma.maxLv})
                    </Box>
                  </Flex>
                  {stigma.skills.map(skill => {
                    return (
                      <Fragment key={skill.id}>
                        <Box sx={{ borderBottom: 'default', p: 1 }}>
                          <Heading
                            as="h3"
                            sx={{
                              mx: 0,
                              my: 1
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
                </Box>
              </Flex>
            </>
          )
        })}
      </Card>

      <Card mb={3}>
        {stigmataSet.skills.map((skill, index) => {
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
                  {skill.name} <small>{index + 2}세트</small>
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
                    maxLv: 1,
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

      <Heading>Images</Heading>
      <Box mb={3}>
        {stigmata.map(rootStigma => {
          const stigma = rootStigma.stigmata[rootStigma.stigmata.length - 1]
          return <StigmaFigureImage key={stigma.id} stigma={stigma} size={480} />
        })}
      </Box>

      {/* <pre>{JSON.stringify(stigmataSet, null, 2)}</pre> */}
    </Box>
  )
}

export default StigmataSetShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { stigmataSetId: string } }) {
  const stigmataSet = loadStigmataSetData(params.stigmataSetId)
  const stigmata = stigmataSet.stigmaIdList.map(id => {
    return loadStigmaData(id)
  })

  return {
    props: {
      stigmataSet,
      stigmata
    }
  }
}

export async function getStaticPaths() {
  const stigmataSetCatalog = loadStigmataSetCatalog()

  return {
    paths: stigmataSetCatalog.map(catalogItem => {
      return {
        params: { stigmataSetId: catalogItem.id }
      }
    }),
    fallback: false
  }
}
