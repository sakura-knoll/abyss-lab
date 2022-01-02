/** @jsxImportSource theme-ui */
import { Text } from '@theme-ui/components'
import React from 'react'

interface SeconadryLabelProps {
  children: React.ReactNode
}

const SecondaryLabel = ({ children }: SeconadryLabelProps) => {
  return (
    <Text
      as='small'
      sx={{
        fontSize: 2,
        color: 'secondary',
        fontWeight: 'heading',
        fontFamily: 'monospace',
      }}
    >
      {children}
    </Text>
  )
}

export default SecondaryLabel
