import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading, Image, Link } from 'theme-ui'
import AvatarFigureImage from '../../../../components/v2/AvatarFigureImage'
import { loadBattlesuitData, loadErBattlesuit, loadErBattlesuitCatalog } from '../../../../lib/v2/server/loadData'
import { Battlesuit, ErBattlesuit, ErSignet } from '../../../../lib/v2/data/types'
import { Fragment, useMemo } from 'react'
import { assetsBucketBaseUrl } from '../../../../lib/consts'
import BattlesuitCatalogItemCard from '../../../../components/v2/BattlesuitCatalogItemCard'
import Honkai3rdLayout from '../../../../components/layouts/Honkai3rdLayout'
import Head from '../../../../components/atoms/Head'
import { useTranslation } from 'next-i18next'
import Breadcrumb from '../../../../components/organisms/Breadcrumb'
import { generateI18NPaths, getI18NProps } from '../../../../server/i18n'
import FormattedText from '../../../../components/v2/FormattedText'

interface BattlesuitShowPageProps {
  battlesuit: Battlesuit
  erBattlesuit: ErBattlesuit
}

const BattlesuitShowPage = ({ battlesuit, erBattlesuit }: BattlesuitShowPageProps) => {
  const { t } = useTranslation()

  const signetSets = useMemo(() => {
    const signetSetMap = erBattlesuit.signets
      .slice()
      .sort((a, b) => {
        return a.id.localeCompare(b.id)
      })
      .reduce<Map<string, ErSignet[]>>((map, signet) => {
        const result = signet.id.match(/([12])([0-9]+)([1-5])-[0-9]/)
        if (result != null) {
          const [, _lv, _battlesuit, signetOrder] = result
          let set = map.get(signetOrder)
          if (set == null) {
            set = []
            map.set(signetOrder, set)
          }
          set.push(signet)
        }
        return map
      }, new Map())

    return [...signetSetMap.values()]
  }, [erBattlesuit.signets])

  return (
    <Honkai3rdLayout>
      <Head
        title={`${battlesuit.fullName} (${t('common.elysian-realm')}) - ${t('common.honkai-3rd')} - ${t(
          'common.abyss-lab'
        )}`}
        description={`${t('common.honkai-3rd')} ${t('common.elysian-realm')} ${t('battlesuit-show.battlesuit')}`}
        canonicalHref={`/honkai3rd/er/battlesuits/${battlesuit.id}`}
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
              href: `/honkai3rd/er/battlesuits/${battlesuit.id}`,
              label: battlesuit.fullName
            }
          ]}
        />

        <Heading as="h1">{battlesuit.fullName}</Heading>

        <AvatarFigureImage battlesuitId={battlesuit.id} sx={{ height: 400 }} />

        <Box>
          <Link href={`/battlesuits/${battlesuit.id}`}>
            <BattlesuitCatalogItemCard battlesuit={battlesuit} />
          </Link>
        </Box>

        <Heading as="h2">ER Adjustments</Heading>

        <Card mb={3}>
          {erBattlesuit.abilities.map(ability => {
            return (
              <Fragment key={ability.id}>
                <Box sx={{ p: 1, borderBottom: 'default' }}>
                  <Heading as="h3" m={0}>
                    {ability.name}
                  </Heading>
                </Box>
                <Box sx={{ p: 1, borderBottom: 'default', '&:last-child': { borderBottom: 'none' } }}>
                  <FormattedText>{ability.desc}</FormattedText>
                </Box>
              </Fragment>
            )
          })}
        </Card>

        <Heading as="h2">Exclusive Signets</Heading>

        {signetSets.map((set, index) => {
          return (
            <Card key={index} mb={2}>
              {set.map(signet => {
                return (
                  <Fragment key={signet.id}>
                    <Flex sx={{ p: 1, borderBottom: 'default', alignItems: 'center' }}>
                      <Image
                        src={`${assetsBucketBaseUrl}/raw/supportbufficon/Elysia.png`}
                        width={30}
                        sx={{ flexShrink: 0 }}
                        alt={'Elysia'}
                      />
                      <Heading as="h3" m={0}>
                        {signet.name}
                      </Heading>
                    </Flex>
                    <Box sx={{ p: 1, borderBottom: 'default', '&:last-child': { borderBottom: 'none' } }}>
                      <FormattedText>{signet.desc}</FormattedText>
                    </Box>
                  </Fragment>
                )
              })}
            </Card>
          )
        })}
      </Box>
    </Honkai3rdLayout>
  )
}

export default BattlesuitShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { battlesuitId: string } }) {
  const battlesuit = loadBattlesuitData(params.battlesuitId)
  const erBattlesuit = loadErBattlesuit(params.battlesuitId)

  return {
    props: { battlesuit, erBattlesuit, ...(await getI18NProps(locale)) }
  }
}

export async function getStaticPaths() {
  const battlesuitCatalog = loadErBattlesuitCatalog()

  return {
    paths: generateI18NPaths(
      battlesuitCatalog.map(catalogItem => {
        return {
          params: { battlesuitId: catalogItem.battlesuit }
        }
      })
    ),
    fallback: false
  }
}
