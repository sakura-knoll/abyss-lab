/** @jsxImportSource theme-ui */
import { Box, Heading, Image } from '@theme-ui/components'
import { NextPageContext } from 'next'
import Breadcrumb from '../../../../components/organisms/Breadcrumb'
import { BattlesuitData } from '../../../../lib/honkai3rd/battlesuits'
import { generateI18NPaths, getI18NProps } from '../../../../server/i18n'
import { getBattlesuitById } from '../../../../server/data/honkai3rd/battlesuits'
import { useTranslation } from '../../../../lib/i18n'
import Head from '../../../../components/atoms/Head'
import { assetsBucketBaseUrl } from '../../../../lib/consts'
import Honkai3rdLayout from '../../../../components/layouts/Honkai3rdLayout'
import { WeaponData } from '../../../../lib/honkai3rd/weapons'
import { getWeaponMapByIds } from '../../../../server/data/honkai3rd/weapons'
import { StigmataData } from '../../../../lib/honkai3rd/stigmata'
import { getStigmataMapByIds } from '../../../../server/data/honkai3rd/stigmata'
import { getSignetGroupById } from '../../../../server/data/honkai3rd/elysianRealm'
import { erBattlesuits, SignetSet } from '../../../../lib/honkai3rd/elysianRealm'
import SignetCard from '../../../../components/molecules/SignetCard'

type WeaponObjectMap = { [key: string]: WeaponData }
type StigmataObjectMap = { [key: string]: StigmataData }

interface BattlesuitShowPageProps {
  battlesuit: BattlesuitData
  weaponMap: WeaponObjectMap
  stigmataMap: StigmataObjectMap
  signetSet: SignetSet
}

const BattlesuitShowPage = ({ battlesuit, weaponMap, stigmataMap, signetSet }: BattlesuitShowPageProps) => {
  const { t } = useTranslation()
  return (
    <Honkai3rdLayout>
      <Head
        title={`${battlesuit.name} (${t('common.elysian-realm')}) - ${t('common.honkai-3rd')} - ${t(
          'common.abyss-lab'
        )}`}
        description={`${t('common.honkai-3rd')} ${t('common.elysian-realm')} ${t('battlesuit-show.battlesuit')}`}
        canonicalHref={`/honkai3rd/elysian-realm/battlesuits/${battlesuit.id}`}
      />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('common.honkai-3rd') },
            {
              href: '/honkai3rd/elysian-realm',
              label: t('common.elysian-realm')
            },
            {
              href: `/honkai3rd/elysian-realm/battlesuits/${battlesuit.id}`,
              label: battlesuit.name
            }
          ]}
        />

        <Heading as="h1">{battlesuit.name}</Heading>

        <Box mb={3}>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              maxWidth: [300, 400]
            }}
          >
            <Image
              alt={battlesuit.name}
              src={`${assetsBucketBaseUrl}/honkai3rd/battlesuits/${battlesuit.id}.png`}
              width={400}
              height={400}
            />
          </Box>
        </Box>

        <Heading as="h2">{t('elysian-realm.exclusive-signets')}</Heading>

        <Box>
          {signetSet.signets.map(signet => {
            return <SignetCard key={signet.id} signet={signet} />
          })}
        </Box>
      </Box>
    </Honkai3rdLayout>
  )
}

export default BattlesuitShowPage

export async function getStaticProps({ params, locale }: NextPageContext & { params: { battlesuitId: string } }) {
  try {
    const battlesuit = getBattlesuitById(params.battlesuitId, locale)!
    const { weaponIds, stigmataIds } = (battlesuit.equipment || []).reduce<{
      weaponIds: string[]
      stigmataIds: string[]
    }>(
      (acc, equipmentItem) => {
        acc.weaponIds.push(equipmentItem.weapon)
        acc.stigmataIds.push(equipmentItem.stigmataTop, equipmentItem.stigmataMid, equipmentItem.stigmataBot)
        return acc
      },
      { weaponIds: [], stigmataIds: [] }
    )
    const weaponMap = getWeaponMapByIds(weaponIds)

    const stigmataMap = getStigmataMapByIds(stigmataIds)

    const signetGroup = getSignetGroupById('elysia', locale)
    const signetSet = signetGroup.sets.find(set => {
      return set.id === `elysia-${params.battlesuitId}`
    })

    return {
      props: {
        battlesuit,
        weaponMap,
        stigmataMap,
        signetSet,
        ...(await getI18NProps(locale))
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getStaticPaths() {
  return {
    paths: generateI18NPaths(
      erBattlesuits.map(battlesuitId => {
        return {
          params: { battlesuitId: battlesuitId }
        }
      })
    ),
    fallback: false
  }
}
