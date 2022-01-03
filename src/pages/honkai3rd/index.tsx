/** @jsxImportSource theme-ui */
import { Box, Heading, Link } from '@theme-ui/components'
import Image from 'next/image'
import NextLink from 'next/link'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../components/organisms/Honkai3rdNavigator'
import { NextPageContext } from 'next'
import { getI18NProps } from '../../lib/i18n'

const updateNotes = [
  ['v5.3', 'https://honkaiimpact3.mihoyo.com/global/en-us/news/17390'],
  ['v5.2', 'https://honkaiimpact3.mihoyo.com/global/en-us/news/16625'],
]

const Honkai3rdIndexPage = () => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb items={[{ href: 'honkai3rd', label: 'Honkai 3rd' }]} />
        <Heading as='h1'>Honkai 3rd</Heading>
        <Box mb={3} sx={{ position: 'relative', minHeight: 300 }}>
          <Image
            alt='Honkai 3rd Wallpaper'
            src='/assets/honkai3rd/wallpaper.png'
            width={640}
            height={360}
            layout='responsive'
          />
        </Box>
        <Box mb={3}>
          <Box>
            <NextLink href={`/honkai3rd/battlesuits`} passHref>
              <Link>Battlesuits</Link>
            </NextLink>
          </Box>
          <Box>
            <NextLink href={`/honkai3rd/stigmata`} passHref>
              <Link>Stigmata</Link>
            </NextLink>
          </Box>
          <Box>
            <NextLink href={`/honkai3rd/weapons`} passHref>
              <Link>Weapons</Link>
            </NextLink>
          </Box>
        </Box>
        <Box>
          <Heading>Updates</Heading>
          <Box>
            {updateNotes.map(([version, href]) => {
              return (
                <Box key={version}>
                  <Link href={href} target='_blank'>
                    {version} Update Notes
                  </Link>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export async function getStaticProps({ locale }: NextPageContext) {
  return {
    props: {
      ...(await getI18NProps(locale)),
    },
  }
}

export default Honkai3rdIndexPage
