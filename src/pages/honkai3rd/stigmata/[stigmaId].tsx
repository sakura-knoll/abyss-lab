import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading } from 'theme-ui'
import FormattedText from '../../../components/v2/FormattedText'
import { formatSubSkillInfo, replaceNewLine } from '../../../lib/v2/data/formatText'
import { loadStigmaData, loadStigmataCatalog, loadStigmataSetData } from '../../../lib/v2/server/loadData'
import { RootStigma, StigmataSetCatalogItem } from '../../../lib/v2/data/types'
import { Fragment } from 'react'
import { getStigmaTypeLabel } from '../../../lib/v2/data/text'
import StigmaTypeIcon from '../../../components/v2/StigmaTypeIcon'
import StigmaIcon from '../../../components/v2/StigmaIcon'
import StigmaFigureImage from '../../../components/v2/StigmaFigureImage'
import { getI18NProps } from '../../../server/i18n'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import Head from '../../../components/atoms/Head'
import { useTranslation } from 'next-i18next'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import PageLink from '../../../components/atoms/PageLink'

interface StigmaShowPageProps {
  rootStigma: RootStigma
  stigmataSetCatalogItem: StigmataSetCatalogItem | null
}

const StigmaShowPage = ({ rootStigma, stigmataSetCatalogItem }: StigmaShowPageProps) => {
  const { t } = useTranslation()

  const stigma = rootStigma.stigmata[rootStigma.stigmata.length - 1]

  const atk = Math.floor(stigma.attackBase + stigma.attackAdd * (stigma.maxLv - 1))
  const hp = Math.floor(stigma.hpBase + stigma.hpAdd * (stigma.maxLv - 1))
  const def = Math.floor(stigma.defenceBase + stigma.defenceAdd * (stigma.maxLv - 1))
  const crt = Math.floor(stigma.criticalBase + stigma.criticalAdd * (stigma.maxLv - 1))

  return (
    <Honkai3rdLayout>
      <Head
        title={`${stigma.name} - ${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        description={`${t('common.honkai-3rd')} ${t('stigmata-show.stigmata')} /
        ${'⭐'.repeat(stigma.rarity)} / ${t(
          `stigmata-show.${stigma.type}`
        )} / HP : ${hp} / ATK : ${atk} / DEF : ${def} / CRT : ${crt}`}
        canonicalHref={`/honkai3rd/stigmata/${stigma.id}`}
      />
      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            { href: '/honkai3rd/stigmata', label: t('common.stigmata') },
            {
              href: `/honkai3rd/stigmata/${stigma.id}`,
              label: stigma.name
            }
          ]}
        />

        <Heading as="h1">{stigma.name}</Heading>

        <Box sx={{ display: ['none', 'none', 'block'] }}>
          <StigmaFigureImage stigma={stigma} size={720} />
        </Box>
        <Box sx={{ display: ['block', 'block', 'none'] }}>
          <StigmaFigureImage stigma={stigma} size={480} />
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
            HP : {hp} / ATK : {atk} / DEF : {def} / CRT : {crt} (at Max Lv {stigma.maxLv})
          </Box>
        </Card>

        <Heading as="h2">Skills</Heading>
        <Card mb={3}>
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

        {stigmataSetCatalogItem != null && (
          <>
            <Heading as="h2">Set</Heading>
            <Flex key={stigmataSetCatalogItem.id}>
              <PageLink href={`/honkai3rd/stigmata-sets/${stigmataSetCatalogItem.id}`}>
                <Card p={1}>
                  <Flex sx={{ justifyContent: 'center' }}>
                    {stigmataSetCatalogItem.stigmataList.map(stigma => {
                      return <StigmaIcon key={stigma.id} icon={stigma.icon} rarity={stigma.maxRarity} />
                    })}
                  </Flex>
                  <Box
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      px: 1,
                      textAlign: 'center'
                    }}
                  >
                    {stigmataSetCatalogItem.name}
                  </Box>
                  {/* {stigma.id} */}
                </Card>
              </PageLink>
            </Flex>
          </>
        )}
        {/* <pre>{JSON.stringify(weapon, null, 2)}</pre> */}
      </Box>
    </Honkai3rdLayout>
  )
}

export default StigmaShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { stigmaId: string } }) {
  const rootStigma = loadStigmaData(params.stigmaId)
  const setId = rootStigma.stigmata[0].setId

  let stigmataSetCatalogItem: StigmataSetCatalogItem | null = null
  if (setId !== '0') {
    const stigmataSet = loadStigmataSetData(setId)
    const setStigmataList = stigmataSet.stigmaIdList.map(id => {
      const targetRootStigma = params.stigmaId === id ? rootStigma : loadStigmaData(id)
      const maxedStigma = targetRootStigma.stigmata[targetRootStigma.stigmata.length - 1]
      return {
        id: targetRootStigma.id,
        icon: maxedStigma.icon,
        maxRarity: maxedStigma.maxRarity
      }
    })
    stigmataSetCatalogItem = {
      id: setId,
      name: stigmataSet.name,
      stigmataList: setStigmataList
    }
  }

  return {
    props: { rootStigma, stigmataSetCatalogItem, ...(await getI18NProps(locale)) }
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
