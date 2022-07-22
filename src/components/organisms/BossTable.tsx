import { addDays } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { Box, Flex, Image, Text } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { VersionData } from '../../lib/honkai3rd/versions'

interface BossTableProps {
  versionData: VersionData
  today: Date | null
}

const BossTable = ({ versionData, today }: BossTableProps) => {
  const { t } = useTranslation()
  const versionStartDate = new Date(versionData.duration[0])
  return (
    <Flex>
      <Box
        sx={{
          borderLeft: 'default',
          borderTop: 'default',
        }}
      >
        <Box
          sx={{
            fontWeight: 700,
            borderRight: 'default',
            px: 2,
            borderBottom: 'default',
          }}
        >
          {t('versions.super-string')}
        </Box>
        {versionData.superstring.map(([first, second], index) => {
          const firstDuration = [
            addDays(versionStartDate, index * 7 + 0),
            addDays(versionStartDate, index * 7 + 3),
          ]
          const secondDuration = [
            addDays(versionStartDate, index * 7 + 4),
            addDays(versionStartDate, index * 7 + 6),
          ]

          return (
            <Flex key={`superstring-${index}`} sx={{ borderBottom: 'default' }}>
              <Box sx={{ borderRight: 'default' }}>
                <BossCard
                  boss={first.boss}
                  label={first.label}
                  active={
                    today != null &&
                    today >= firstDuration[0] &&
                    today <= firstDuration[1]
                  }
                />
              </Box>
              <Box sx={{ borderRight: 'default' }}>
                <BossCard
                  boss={second.boss}
                  label={second.label}
                  active={
                    today != null &&
                    today >= secondDuration[0] &&
                    today <= secondDuration[1]
                  }
                />
              </Box>
            </Flex>
          )
        })}
      </Box>
      <Box sx={{ borderTop: 'default' }}>
        <Box
          sx={{
            fontWeight: 700,
            px: 2,
            borderRight: 'default',
            borderBottom: 'default',
          }}
        >
          {t('versions.memorial-arena')}
        </Box>
        {versionData.ma.map(([first, second, third], index) => {
          const durations = [
            addDays(versionStartDate, index * 7 + 4),
            addDays(versionStartDate, (index + 1) * 7 + 3),
          ]
          const active =
            today != null && today >= durations[0] && today <= durations[1]
          return (
            <Flex key={`superstring-${index}`} sx={{ borderBottom: 'default' }}>
              <Box sx={{ borderRight: 'default' }}>
                <BossCard
                  boss={first.boss}
                  label={first.label}
                  active={active}
                />
              </Box>
              <Box sx={{ borderRight: 'default' }}>
                <BossCard
                  boss={second.boss}
                  label={second.label}
                  active={active}
                />
              </Box>
              <Box sx={{ borderRight: 'default' }}>
                <BossCard
                  boss={third.boss}
                  label={third.label}
                  active={active}
                />
              </Box>
            </Flex>
          )
        })}
      </Box>
    </Flex>
  )
}

const BossCard = ({
  label,
  boss,
  active,
}: {
  label?: string
  boss: string
  active?: boolean
}) => {
  return (
    <Box
      sx={{ position: 'relative', '&.active': { bg: 'transparentPrimary' } }}
      className={active ? 'active' : ''}
    >
      {label != null && (
        <Flex
          sx={{
            background: 'rgba(0,0,0,0.7)',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        >
          <Text
            sx={{
              lineHeight: '14px',
              fontWeight: 700,
              py: 0,
              px: 1,
              fontSize: '14px',
              color: 'white',
            }}
          >
            {label?.toUpperCase()}
          </Text>
        </Flex>
      )}
      <Image
        width={140}
        alt={boss}
        src={`${assetsBucketBaseUrl}/honkai3rd/bosses/${boss}.png`}
      />
    </Box>
  )
}

export default BossTable
