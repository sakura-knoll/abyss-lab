import React from 'react'
import { Box, Flex, Image, Paragraph } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { ERGGSignet } from './types'

interface SignetBoxProps {
  signets: ERGGSignet[]
}

const SignetBox = ({ signets }: SignetBoxProps) => {
  return (
    <>
      {signets.map((signet, index) => {
        const dia = 460
        const radius = dia / 2
        const margin = 30
        const descriptionTop = 40 + margin + ((dia - margin * 2) / 4) * index
        const top =
          40 + radius + radius * Math.sin((30 / 180) * Math.PI * (index - 2))
        const angle = Math.asin((radius - (top - 40)) / radius)
        const left = Math.cos(angle) * radius + 100 + radius

        const signetRadius = 40
        return (
          <React.Fragment key={index}>
            <Flex
              sx={{
                position: 'absolute',
                zIndex: 1,
                top: `${top - signetRadius}px`,
                left: `${left - signetRadius}px`,
                backgroundColor: '#091B2D',
                height: signetRadius * 2,
                width: signetRadius * 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: signetRadius,
                border: '2px solid #FBECE5',
              }}
            >
              <Image
                alt=''
                src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/signets/${signet.group}.png`}
                width={45}
                height={45}
              />
              <Box
                sx={{
                  backgroundColor: 'black',

                  border: '2px solid #FBECE5',
                  width: 30,
                  height: 30,
                  textAlign: 'center',
                  borderRadius: 5,
                  position: 'absolute',
                  bottom: 0 - 20,
                  right: `${0 - 10}px`,
                }}
              >
                {signet.nexus === 1 ? 'I' : 'II'}
              </Box>
            </Flex>
            <Box
              sx={{
                position: 'absolute',
                borderBottom: '2px dashed #FBECE5',
                height: 0,
                top: `${top}px`,
                left: `${left}px`,
                right: 340,
              }}
            />
            <Flex
              sx={{
                top: `${descriptionTop - 40}px`,
                height: 80,
                border: '2px solid #FBECE5',
                padding: '5px',
                width: 330,
                position: 'absolute',
                right: 10,
                alignItems: 'center',
              }}
            >
              <Flex
                sx={{
                  width: 60,
                  height: 60,
                  borderRight: '2px solid #FBECE5',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: '5px',
                }}
              >
                <Box sx={{ fontSize: 4, lineHeight: 1.3, fontWeight: 'bold' }}>
                  <Box>
                    {signet.type === 'core'
                      ? '핵심'
                      : signet.type === 'start'
                      ? '과도'
                      : '보조'}
                  </Box>
                </Box>
              </Flex>
              <Paragraph>{signet.description}</Paragraph>
            </Flex>
          </React.Fragment>
        )
      })}
    </>
  )
}

export default SignetBox
