/** @jsxImportSource theme-ui */
import { Box, Heading, Flex } from '@theme-ui/components'
import { NextPageContext } from 'next'
import { pick } from 'ramda'
import ElfCard from '../../../components/molecules/ElfCard'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import { ElfData } from '../../../lib/honkai3rd/elfs'
import { getI18NProps } from '../../../server/i18n'
import { listElfs } from '../../../server/data/honkai3rd/elfs'
import { useTranslation } from '../../../lib/i18n'
import Head from '../../../components/atoms/Head'
import Honkai3rdLayout from '../../../components/layouts/Honkai3rdLayout'

interface ElfListPageProps {
  elfs: Pick<ElfData, 'id' | 'name' | 'krName'>[]
}

const ElfListPage = ({ elfs }: ElfListPageProps) => {
  const { t } = useTranslation()

  return (
    <Honkai3rdLayout>
      <Head
        title={`${t('breadcrumb.honkai-3rd')}: ${t('breadcrumb.elfs')} - ${t(
          'nav.abyss-lab'
        )}`}
        description={t('elfs-list.description')}
      />
      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: t('breadcrumb.honkai-3rd') },
            { href: '/honkai3rd/elfs', label: t('breadcrumb.elfs') },
          ]}
        />

        <Heading as='h1'>{t('elfs-list.elfs')}</Heading>

        <Flex
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {elfs.map((elf) => {
            return <ElfCard key={elf.id} elf={elf} />
          })}
        </Flex>
      </Box>
    </Honkai3rdLayout>
  )
}

export default ElfListPage

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      elfs: listElfs().map((elf) => pick(['id', 'name', 'krName'], elf)),
      ...(await getI18NProps(locale)),
    },
  }
}
