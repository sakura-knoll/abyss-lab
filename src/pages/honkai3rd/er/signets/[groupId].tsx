import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading } from 'theme-ui'
import { loadErSignets } from '../../../../lib/v2/server/loadData'
import { ErSignet, ErSignetGroup } from '../../../../lib/v2/data/types'
import { Fragment, useMemo } from 'react'
import { assetsBucketBaseUrl } from '../../../../lib/consts'
import { signetGroups } from '../../../../lib/v2/data/er'
import SquareImage from '../../../../components/v2/SquareImage'
import { getErSignetTypeLabel, getSignetGroupLabel } from '../../../../lib/v2/data/text'
import Honkai3rdLayout from '../../../../components/layouts/Honkai3rdLayout'
import Head from '../../../../components/atoms/Head'
import { useTranslation } from 'next-i18next'
import Breadcrumb from '../../../../components/organisms/Breadcrumb'
import { generateI18NPaths, getI18NProps } from '../../../../server/i18n'
import { useLocale } from '../../../../lib/i18n'

interface BattlesuitShowPageProps {
  group: ErSignetGroup
  signets: ErSignet[]
}

const BattlesuitShowPage = ({ signets, group }: BattlesuitShowPageProps) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const signetSets = useMemo(() => {
    const signetSetMap = signets.reduce<Map<string, ErSignet[]>>((map, signet) => {
      const [id1, _id2] = signet.id.split('-')
      let set = map.get(id1)
      if (set == null) {
        set = []
        map.set(id1, set)
      }
      set.push(signet)
      return map
    }, new Map())

    return [...signetSetMap.values()]
  }, [signets])

  return (
    <Honkai3rdLayout>
      <Head
        title={`${group.name} ${t('elysian-realm.signets')} (${t('common.elysian-realm')}) - ${t(
          'common.honkai-3rd'
        )} - ${t('common.abyss-lab')}`}
        description={`${t('common.honkai-3rd')} ${group.name} ${t('elysian-realm.signets')}`}
        canonicalHref={`/honkai3rd/elysian-realm/signets/${group.id}`}
      />

      <Box p={2}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: '/honkai3rd/er',
              label: t('common.elysian-realm')
            },
            {
              href: `/honkai3rd/er/signets/${group.id}`,
              label: getSignetGroupLabel(group.id, locale)
            }
          ]}
        />
        <Heading as="h1">{group.name}</Heading>

        {signetSets.map((set, index) => {
          return (
            <Card key={index} mb={2}>
              {set.map(signet => {
                return (
                  <Fragment key={signet.id}>
                    <Flex sx={{ p: 1, borderBottom: 'default', alignItems: 'center' }}>
                      <SquareImage
                        src={`${assetsBucketBaseUrl}/raw/supportbufficon/${group.icon}.png`}
                        size={30}
                        originalSize={120}
                      />
                      <Heading as="h3" my={0} ml={1}>
                        {signet.name}
                      </Heading>
                      <Box sx={{ ml: 1, color: 'textMuted' }}>{getErSignetTypeLabel(signet.quality, locale)}</Box>
                    </Flex>
                    <Box sx={{ p: 1, borderBottom: 'default', '&:last-child': { borderBottom: 'none' } }}>
                      {signet.desc}
                    </Box>
                  </Fragment>
                )
              })}
            </Card>
          )
        })}
        {/*
      <pre>
        <code>{JSON.stringify(signets, null, 2)}</code>
      </pre> */}
      </Box>
    </Honkai3rdLayout>
  )
}

export default BattlesuitShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { groupId: string } }) {
  const signets = loadErSignets(params.groupId, locale)
  const group = signetGroups.find(group => group.id === params.groupId)

  return {
    props: { signets, group, ...(await getI18NProps(locale)) }
  }
}

export async function getStaticPaths() {
  return {
    paths: generateI18NPaths(
      signetGroups.map(group => {
        return {
          params: { groupId: group.id }
        }
      })
    ),
    fallback: false
  }
}
