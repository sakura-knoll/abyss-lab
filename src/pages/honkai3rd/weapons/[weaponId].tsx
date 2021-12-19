import { Box, Heading, Image, Paragraph } from '@theme-ui/components'
import { NextPageContext } from 'next'
import React from 'react'
import Breadcrumb from '../../../components/organisms/Breadcrumb'
import Honkai3rdNavigator from '../../../components/organisms/Honkai3rdNavigator'
import {
  getWeaponById,
  listWeapons,
  WeaponData,
} from '../../../data/honkai3rd/weapons'

interface WeaponShowPageProps {
  weapon: WeaponData
}

const WeaponShowPage = ({ weapon }: WeaponShowPageProps) => {
  return (
    <Box>
      <Honkai3rdNavigator />

      <Box p={3}>
        <Breadcrumb
          items={[
            { href: '/honkai3rd', label: 'Honkai 3rd' },
            { href: '/honkai3rd/weapons', label: 'Weapons' },
            {
              href: `/honkai3rd/weapons/${weapon.id}`,
              label: weapon.name,
            },
          ]}
        />

        <Heading as='h1'>{weapon.name}</Heading>

        <Box mb={3}>
          <Image src={`/assets/honkai3rd/weapons/${weapon.id}.png`} />
        </Box>
        <Heading as='h2'>Weapon Skills</Heading>
        <Box>
          {weapon.skills.map((skill) => {
            return (
              <Box key={skill.name} mb={2}>
                <Heading as='h3'>{skill.name}</Heading>
                <Paragraph>{skill.description}</Paragraph>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default WeaponShowPage

export function getStaticProps(
  context: NextPageContext & { params: { weaponId: string } }
) {
  const weapon = getWeaponById(context.params.weaponId)
  return {
    props: { weapon },
  }
}

export async function getStaticPaths() {
  return {
    paths: listWeapons().map((weapon) => {
      return {
        params: { weaponId: weapon.id },
      }
    }),
    fallback: true,
  }
}
