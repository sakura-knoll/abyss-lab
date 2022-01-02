/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph } from '@theme-ui/components'
import { NextPageContext } from 'next'
import Image from 'next/image'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import { ElfData } from '../../../lib/honkai3rd/elfs'
import { getElfById, listElfs } from '../../../server/data/honkai3rd/elfs'

interface ElfShowPageProps {
  elf: ElfData
}

const ElfShowPage = ({ elf }: ElfShowPageProps) => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/elfs', label: 'ELFs' },
            {
              href: `/honkai3rd/elfs/${elf.id}`,
              label: elf.name,
            },
          ]}
        />

        <Heading as='h1'>{elf.name}</Heading>

        <Box className='mb-4'>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: '600px',
              height: '600px',
              borderRadius: 4,
            }}
          >
            <Image
              alt={elf.name}
              layout='fill'
              objectFit='cover'
              src={`/assets/honkai3rd/elfs/${elf.id}.png`}
            />
          </Box>
        </Box>
        <Box mb={4}>{'⭐'.repeat(elf.baseRank)}</Box>
        <Box>
          {elf.skillRows.map((row, rowIndex) => {
            return (
              <Box key={rowIndex}>
                {row.map((item, columnIndex) => {
                  return (
                    <Box key={columnIndex}>
                      <Heading as='h4'>{item.name}</Heading>
                      <Paragraph>{item.description}</Paragraph>
                    </Box>
                  )
                })}
                <hr />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default ElfShowPage

export function getStaticProps(
  context: NextPageContext & { params: { elfId: string } }
) {
  const elf = getElfById(context.params.elfId)
  return {
    props: { elf },
  }
}

export async function getStaticPaths() {
  return {
    paths: listElfs().map((elf) => {
      return {
        params: { elfId: elf.id },
      }
    }),
    fallback: false,
  }
}
