import React from 'react'
import { Box, Flex, Image, Paragraph } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../../lib/consts'
import { signetGroupMap } from '../../../lib/honkai3rd/elysianRealm'
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

        const signetRadius = 45
        return (
          <React.Fragment key={index}>
            <Flex
              sx={{
                position: 'absolute',
                zIndex: 1,
                top: `${top - signetRadius}px`,
                left: `${left - signetRadius}px`,
                backgroundColor: '#10131C',
                height: signetRadius * 2,
                width: signetRadius * 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: signetRadius,
                border: '1px solid gray',
                boxShadow: '5px 5px 10px rgba(0,0,0,0.5)',
                flexDirection: 'column',
              }}
            >
              <Image
                alt=''
                src={`${assetsBucketBaseUrl}/honkai3rd/elysian-realm/signets/${signet.group}.png`}
                width={45}
                height={45}
              />
              <Box
                className='signetGroupLabel'
                sx={{
                  transform: 'translateX(-5px)',
                  fontSize: 18,
                }}
              >
                {getSignetAltName(signet.group)}
              </Box>
              <Box
                sx={{
                  backgroundColor: 'black',
                  border: '1px solid gray',
                  width: 20,
                  height: 20,
                  textAlign: 'center',
                  borderRadius: 4,
                  position: 'absolute',
                  bottom: '12px',
                  fontSize: 16,
                  lineHeight: '20px',
                  right: `${5}px`,
                }}
              >
                {signet.nexus === 1 ? 'I' : 'II'}
              </Box>
            </Flex>
            <Box
              sx={{
                position: 'absolute',
                borderBottom: '2px dashed gray',
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
                border: 'solid 1px gray',
                boxSizing: 'border-box',
                backgroundColor: 'rgba(0,0,0,0.5)',
                boxShadow: '5px 5px 10px rgba(0,0,0,0.5)',
                width: 330,
                position: 'absolute',
                right: 10,
                alignItems: 'center',
              }}
            >
              <Flex
                sx={{
                  width: 80,
                  height: 60,
                  borderRight: 'solid 1px gray',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: '5px',
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    fontSize: 4,
                    lineHeight: 1.3,
                    fontWeight: 'bold',
                    color:
                      signet.type === 'core'
                        ? '#E39070'
                        : signet.type === 'start'
                        ? '#FEDEC2'
                        : '#A59A9B',
                  }}
                  className='signetTypeLabel'
                >
                  <Box>
                    <Box>
                      {signet.type === 'core'
                        ? '핵심'
                        : signet.type === 'start'
                        ? '과도'
                        : '보조'}
                    </Box>
                    <Box>각인</Box>
                  </Box>
                </Box>
              </Flex>
              <Paragraph
                className='signetDescription'
                sx={{ padding: '5px', whiteSpace: 'pre-wrap' }}
              >
                {signet.description}
              </Paragraph>
            </Flex>
          </React.Fragment>
        )
      })}
    </>
  )
}

export default SignetBox

function getSignetAltName(id: string) {
  return signetGroupMap.get(id)?.krAltName
}
