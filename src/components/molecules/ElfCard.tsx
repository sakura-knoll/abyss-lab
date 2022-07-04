/** @jsxImportSource theme-ui */
import { Box, Card, Text } from '@theme-ui/components'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { ElfData } from '../../lib/honkai3rd/elfs'
import PageLink from '../atoms/PageLink'
import SquareImageBox from '../atoms/SquareImageBox'

interface ElfCardProps {
  elf: Pick<ElfData, 'id' | 'name'>
  hidden?: boolean
}

const ElfCard = ({ elf }: ElfCardProps) => {
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
          alt={elf.name}
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
          <Text>{elf.name}</Text>
        </Box>
      </PageLink>
    </Card>
  )
}

export default ElfCard
