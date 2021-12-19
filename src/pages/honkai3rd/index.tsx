import { Box, Heading, Link, Image } from '@theme-ui/components'
import NextLink from 'next/link'
import React from 'react'
import Breadcrumb from '../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../components/organisms/Honkai3rdNavigator'

const updateNotes = [
  ['v5.3', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/17399'],
  ['v5.2', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/16632'],
  ['v5.1', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/15882'],
  ['v5.0', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/14917'],
  ['v4.9', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/13943'],
  ['v4.8', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/13044'],
  ['v4.7', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/11980'],
  ['v4.6', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/9101'],
  ['v4.5', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/7996'],
  ['v4.4', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/7312'],
  ['v4.3', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/6105'],
  ['v4.2', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/5489'],
  ['v4.1', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/4965'],
  ['v4.0', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/4421'],
  ['v3.9', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/3296'],
  ['v3.8', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/2855'],
  ['v3.7', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/2337'],
  ['v3.6', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/1936'],
  ['v3.5', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/1505'],
  ['v3.4', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/1092'],
  ['v3.3', 'https://honkaiimpact3.mihoyo.com/asia/en-us/news/851'],
]

const Honkai3rdIndexPage = () => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb items={[{ href: 'honkai3rd', label: 'Honkai 3rd' }]} />
        <Heading as='h1'>Honkai 3rd</Heading>
        <Box mb={3}>
          <Image
            alt='Honkai 3rd Wallpaper'
            src='/assets/honkai3rd/wallpaper.png'
            width='100%'
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

export default Honkai3rdIndexPage
