/** @jsxImportSource theme-ui */

import { Box, Card, Text } from '@theme-ui/components'
import { useRouter } from 'next/router'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { ElfData } from '../../lib/honkai3rd/elfs'
import { translate } from '../../lib/i18n'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface ElfCardProps {
  elf: Pick<ElfData, 'id' | 'name' | 'krName'>
  hidden?: boolean
}

const ElfCard = ({ elf }: ElfCardProps) => {
  const { locale } = useRouter()
  const elfName = translate(locale, { 'ko-KR': elf.krName }, elf.name)

  return (
    <Card
      sx={{
        m: 2,
        p: 2,
        width: [120],
        '&.hiden': {
          display: 'none',
        },
      }}
    >
      <PageLink href={`/honkai3rd/elfs/${elf.id}`}>
        <SquareImageBox
          alt={elfName}
          src={`${assetsBucketBaseUrl}/honkai3rd/elfs/icon-${elf.id}.png`}
          size={[100]}
        />
        <Box
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          <Text>{elfName}</Text>
        </Box>
      </PageLink>
    </Card>
  )
}

export default ElfCard
