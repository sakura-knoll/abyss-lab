import { NextPageContext } from 'next'
import { Box, Card, Flex, Heading } from 'theme-ui'
import { loadErSignets } from '../../../../lib/v2-pre/server/loadData'
import { ErSignet, ErSignetGroup } from '../../../../lib/v2-pre/data/types'
import { Fragment, useMemo } from 'react'
import { assetsBucketBaseUrl } from '../../../../lib/consts'
import { signetGroups } from '../../../../lib/v2-pre/data/er'
import SquareImage from '../../../../components/v2-pre/SquareImage'
import { getErSignetTypeLabel } from '../../../../lib/v2-pre/data/text'

interface BattlesuitShowPageProps {
  group: ErSignetGroup
  signets: ErSignet[]
}

const BattlesuitShowPage = ({ signets, group }: BattlesuitShowPageProps) => {
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
    <Box>
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
                    <Box sx={{ ml: 12, color: 'textMuted' }}>{getErSignetTypeLabel(signet.quality)}</Box>
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
  )
}

export default BattlesuitShowPage

export async function getStaticProps({ locale, params }: NextPageContext & { params: { groupId: string } }) {
  const signets = loadErSignets(params.groupId)
  const group = signetGroups.find(group => group.id === params.groupId)

  return {
    props: { signets, group }
  }
}

export async function getStaticPaths() {
  return {
    paths: signetGroups.map(group => {
      return {
        params: { groupId: group.id }
      }
    }),
    fallback: false
  }
}
