import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading } from 'theme-ui'
import AttributeIcon from '../../../components/v2-pre/AttributeIcon'
import AvatarFigureImage from '../../../components/v2-pre/AvatarFigureImage'
import AvatarSkillIcon from '../../../components/v2-pre/AvatarSkillIcon'
import AvatarSubSkillIcon from '../../../components/v2-pre/AvatarSubSkillIcon'
import BattlesuitAvatarIcon from '../../../components/v2-pre/BattlesuitAvatarIcon'
import FormattedText from '../../../components/v2-pre/FormattedText'
import { formatSkillInfo, formatSubSkillInfo } from '../../../lib/v2-pre/data/formatText'
import { loadBattlesuitCatalog, loadBattlesuitData } from '../../../lib/v2-pre/server/loadData'
import { Battlesuit, SkillTagItem } from '../../../lib/v2-pre/data/types'
import { Fragment } from 'react'
import TagIcon from '../../../components/v2-pre/TagIcon'
import {
  getAttributeLabel,
  getCharacterTypeLabel,
  getSkillTypeLabel,
  getTagTypeLabel,
  getWeaponTypeLabel
} from '../../../lib/v2-pre/data/text'
import StarIcon from '../../../components/v2-pre/StarIcon'
import ChibiIcon from '../../../components/v2-pre/ChibiIcon'
import WeaponTypeIcon from '../../../components/v2-pre/WeaponTypeIcon'
import { sortBattlesuitSkill } from '../../../lib/v2-pre/data/utils'

interface BattlesuitShowPageProps {
  battlesuit: Battlesuit
}

const BattlesuitShowPage = ({ battlesuit }: BattlesuitShowPageProps) => {
  return (
    <Box>
      <Heading as="h1">{battlesuit.fullName}</Heading>

      <AvatarFigureImage battlesuitId={battlesuit.id} sx={{ height: 400 }} />

      <Box mb={3}>
        <BattlesuitAvatarIcon battlesuit={battlesuit} />
      </Box>

      <Card mb={3}>
        <Flex sx={{ borderBottom: 'default', p: 1 }}>
          <Flex sx={{ alignItems: 'center' }}>
            <Box mr={2}>
              <StarIcon star={battlesuit.initialStar} />
            </Box>

            <ChibiIcon id={battlesuit.character} />

            <Box ml={1} mr={2}>
              {getCharacterTypeLabel(battlesuit.character)}
            </Box>

            <AttributeIcon attributeType={battlesuit.attributeType} size={30} />
            <Box ml={1} mr={2}>
              {getAttributeLabel(battlesuit.attributeType)}
            </Box>

            <WeaponTypeIcon type={battlesuit.weapon} />
            <Box ml={1}>{getWeaponTypeLabel(battlesuit.weapon)}</Box>
          </Flex>
        </Flex>
        <Flex sx={{ p: 1 }}>
          {battlesuit.tags.map(tag => {
            return (
              <Flex key={tag} sx={{ mr: 2, alignItems: 'center' }}>
                <TagIcon type={tag} />
                <Box ml={1}>{getTagTypeLabel(tag)}</Box>
              </Flex>
            )
          })}
        </Flex>
      </Card>

      <Heading as="h2">Skills</Heading>
      {battlesuit.skills.sort(sortBattlesuitSkill).map(skill => {
        return (
          <Card key={skill.id} mb={3}>
            <Box sx={{ borderBottom: 'default', p: 1 }}>
              <Flex sx={{ alignItems: 'center' }}>
                <AvatarSkillIcon icon={skill.icon} />
                <Heading as="h3" sx={{ ml: 1, mb: 0 }}>
                  <FormattedText>{skill.name}</FormattedText>
                </Heading>
                {skill.tags.length > 0 && (
                  <Flex sx={{ ml: 1 }}>
                    {skill.tags.map((tag, index) => {
                      return <SkillTagItem key={index} tag={tag} />
                    })}
                  </Flex>
                )}
              </Flex>

              <Box>{getSkillTypeLabel(skill.skillType)}</Box>
            </Box>
            <Box sx={{ whiteSpace: 'pre-wrap', borderBottom: 'default', p: 1 }}>
              <FormattedText>{formatSkillInfo(skill)}</FormattedText>
            </Box>

            {skill.subSkills.map(subSkill => {
              return (
                <Fragment key={subSkill.id}>
                  <Box sx={{ borderBottom: 'default', p: 1 }}>
                    <Flex sx={{ alignItems: 'center' }}>
                      <AvatarSubSkillIcon icon={subSkill.icon} />
                      <Heading as="h4" sx={{ ml: 1, mb: 0 }}>
                        <FormattedText>{subSkill.name}</FormattedText>
                      </Heading>

                      {subSkill.unlockStar.localeCompare(battlesuit.initialStar) > 0 && (
                        <Box ml={2}>
                          <StarIcon star={subSkill.unlockStar} />
                        </Box>
                      )}

                      {subSkill.tags.length > 0 && (
                        <Flex sx={{ ml: 2 }}>
                          {subSkill.tags.map((tag, index) => {
                            return <SkillTagItem key={index} tag={tag} />
                          })}
                        </Flex>
                      )}
                    </Flex>
                  </Box>

                  <Box
                    sx={{
                      whiteSpace: 'pre-wrap',
                      borderBottom: 'default',
                      '&:last-child': { borderBottom: 'none' },
                      p: 1
                    }}
                  >
                    <FormattedText>{formatSubSkillInfo(subSkill)}</FormattedText>
                  </Box>
                </Fragment>
              )
            })}
          </Card>
        )
      })}
      <pre>{JSON.stringify(battlesuit, null, 2)}</pre>
    </Box>
  )
}

export default BattlesuitShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { battlesuitId: string } }) {
  const battlesuit = loadBattlesuitData(params.battlesuitId)

  return {
    props: { battlesuit }
  }
}

export async function getStaticPaths() {
  const battlesuitCatalog = loadBattlesuitCatalog()

  return {
    paths: battlesuitCatalog.map(catalogItem => {
      return {
        params: { battlesuitId: catalogItem.id }
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