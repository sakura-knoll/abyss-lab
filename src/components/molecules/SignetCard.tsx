/** @jsxImportSource theme-ui */
import { Card, Box, Paragraph, Heading, Flex, Text } from '@theme-ui/components'
import { useTranslation } from 'next-i18next'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { SignetData } from '../../lib/honkai3rd/elysianRealm'
import SquareImageBox from '../atoms/SquareImageBox'

interface SignetCardProps {
  signet: SignetData
  headingLevel?: 1 | 2 | 3 | 4 | 5
  m?: number
}

const SignetCard = ({ signet, headingLevel = 3, m = 2 }: SignetCardProps) => {
  const [signetGroupId] = signet.id.split('-')
  const { t } = useTranslation()
  return (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ p: 2 }}>
        <Heading as={`h${headingLevel}`}>
          <Flex sx={{ alignItems: 'center' }}>
            <SquareImageBox
              mr={2}
              size={30}
              alt={signet.name}
              src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/signets/${signetGroupId}.png`}
            />
            <Text>{signet.name}</Text>
          </Flex>
        </Heading>
        <Paragraph>{signet.description}</Paragraph>
      </Box>
      <Box>
        {signet.upgrades.map((upgrade, index) => {
          return (
            <Box
              key={`${signet.id}-${index + 1}`}
              sx={{ borderTop: 'default', p: 2 }}
            >
              <Heading as={`h${headingLevel + 1}` as 'h1'}>
                {upgrade.name}
              </Heading>
              <Paragraph>{upgrade.description}</Paragraph>
            </Box>
          )
        })}
        {signet.upgrades.length === 0 && (
          <Box sx={{ borderTop: 'default', p: 2 }}>
            <Text sx={{ color: 'secondary' }}>
              {t('elysian-realm.no-upgrades')}
            </Text>
          </Box>
        )}
      </Box>
    </Card>
  )
}

export default SignetCard
