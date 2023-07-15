import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading } from 'theme-ui'
import { useMemo } from 'react'
import { Elf, ElfSkill } from '../../../lib/v2/data/types'
import { loadElfCatalog, loadElfData } from '../../../lib/v2/server/loadData'
import SquareImage from '../../../components/v2/SquareImage'
import TagIcon from '../../../components/v2/TagIcon'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { ListMap } from '../../../lib/utils'
import FormattedText from '../../../components/v2/FormattedText'
import { formatSubSkillInfo } from '../../../lib/v2/data/formatText'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'
import Head from '../../../components/atoms/Head'
import { useTranslation } from 'next-i18next'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { generateI18NPaths, getI18NProps } from '../../../server/i18n'

interface ElfShowPageProps {
  elf: Elf
}

const ElfShowPage = ({ elf }: ElfShowPageProps) => {
  const { t } = useTranslation()

  const skillRows = useMemo(() => {
    const rowSkillListMap = elf.skills.reduce<ListMap<string, ElfSkill>>((map, skill) => {
      map.set(skill.row.toString(), skill)
      return map
    }, new ListMap())

    return [...rowSkillListMap.values()]
  }, [elf.skills])

  return (
    <Honkai3rdLayout>
      <Head
        title={`${elf.fullName} - ${t('common.elfs')} - ${t('common.honkai-3rd')} - ${t('common.abyss-lab')}`}
        description={t('weapons-list.description')}
        canonicalHref={`/honkai3rd/elfs/${elf.id}`}
      />
      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: {
                pathname: `/honkai3rd/elfs`
              },
              label: t('common.elfs')
            },
            {
              href: `/honkai3rd/elfs/${elf.id}`,
              label: elf.fullName
            }
          ]}
        />

        <Heading as="h1">{elf.fullName}</Heading>

        <SquareImage
          src={`${assetsBucketBaseUrl}/raw/elfcardfigures/${elf.figureImage}.png`}
          originalSize={720}
          size={480}
        />

        <Card mb={3}>
          <Box sx={{ p: 1, borderBottom: 'default' }}>
            <Flex>
              {elf.tags.map(tag => {
                return (
                  <Box key={tag.type} mr={1}>
                    <TagIcon type={tag.type} />
                  </Box>
                )
              })}
            </Flex>
          </Box>
          <Box p={1}>
            Ult CD: {elf.ultSkillCd} / Ult SP Cost: {elf.ultSkillCost}
          </Box>
        </Card>

        <Heading as="h2">Skills</Heading>

        {skillRows.map((row, index) => {
          return (
            <Card key={index} mb={2}>
              {row.map(skill => {
                return (
                  <Box
                    key={skill.id}
                    sx={{
                      borderBottom: 'default',
                      '&:last-child': {
                        borderBottom: 'none'
                      }
                    }}
                  >
                    <Box sx={{ borderBottom: 'default', p: 1 }}>
                      <Flex sx={{ alignItems: 'center' }}>
                        <Box sx={{ flexShrink: 0 }}>
                          <SquareImage
                            src={`${assetsBucketBaseUrl}/raw/elf_skill_icon/${skill.icon}.png`}
                            originalSize={40}
                          />
                        </Box>
                        <Heading as={'h3'} sx={{ my: 0, ml: 1 }}>
                          <FormattedText>{skill.name}</FormattedText>
                        </Heading>
                        {/* {skill.id} */}
                        <Box sx={{ color: 'textMuted', ml: 1 }}>({skill.skillType})</Box>
                      </Flex>
                    </Box>
                    <Box sx={{ p: 1 }}>
                      <FormattedText>{formatSubSkillInfo(skill)}</FormattedText>
                    </Box>
                  </Box>
                )
              })}
            </Card>
          )
        })}
      </Box>
    </Honkai3rdLayout>
  )
}

export default ElfShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { elfId: string } }) {
  const elf = loadElfData(params.elfId, locale)

  return {
    props: { elf, ...(await getI18NProps(locale)) }
  }
}

export async function getStaticPaths() {
  const elfCatalog = loadElfCatalog()

  return {
    paths: generateI18NPaths(
      elfCatalog.map(catalogItem => {
        return {
          params: { elfId: catalogItem.id }
        }
      })
    ),
    fallback: false
  }
}
