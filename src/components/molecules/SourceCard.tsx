/** @jsxImportSource theme-ui */
import { Card, Paragraph, Heading } from '@theme-ui/components'
import { SourceData } from '../../lib/honkai3rd/sources'

import { useTranslation } from '../../lib/i18n'

interface SourceCardProps {
  source: SourceData
}

const SourceCard = ({ source }: SourceCardProps) => {
  const { t } = useTranslation()
  switch (source.type) {
    case 'spirit-weapon-foundry':
      return (
        <SourceCardConatiner>
          <SourceCardHeading>
            {t('sources.sprit-weapon-foundry.label')}
          </SourceCardHeading>
          <SourceCardDescription>
            {t('sources.sprit-weapon-foundry.description')}
          </SourceCardDescription>
        </SourceCardConatiner>
      )
    case 'dorm-equipment-supply':
      return (
        <SourceCardConatiner>
          <SourceCardHeading>
            {t('sources.dorm-equipment-supply.label')}
          </SourceCardHeading>
          <SourceCardDescription>
            {t('sources.dorm-equipment-supply.description')}
          </SourceCardDescription>
        </SourceCardConatiner>
      )
    case 'focused-supply':
      return (
        <SourceCardConatiner>
          <SourceCardHeading>
            {t('sources.focused-supply.label')}
          </SourceCardHeading>
          <SourceCardDescription>
            {t('sources.focused-supply.description')}
          </SourceCardDescription>
        </SourceCardConatiner>
      )
    case 'pri-weapon-foundry':
      return (
        <SourceCardConatiner>
          <SourceCardHeading>
            {t('sources.pri-weapon-foundry.label')}
          </SourceCardHeading>
          <SourceCardDescription>
            {t('sources.pri-weapon-foundry.description')}
          </SourceCardDescription>
        </SourceCardConatiner>
      )
    case 'weapon-exchange':
      return (
        <SourceCardConatiner>
          <SourceCardHeading>
            {t('sources.weapon-exchange.label')}
          </SourceCardHeading>
          <SourceCardDescription>
            {t('sources.weapon-exchange.description')}
          </SourceCardDescription>
        </SourceCardConatiner>
      )
    case 'stigmata-exchange':
      return (
        <SourceCardConatiner>
          <SourceCardHeading>
            {t('sources.stigmata-exchange.label')}
          </SourceCardHeading>
          <SourceCardDescription>
            {t('sources.stigmata-exchange.description')}
          </SourceCardDescription>
        </SourceCardConatiner>
      )
    case 'special-divine-key-supply':
      return (
        <SourceCardConatiner>
          <SourceCardHeading>
            {t('sources.special-divine-key-supply.label')}
          </SourceCardHeading>
          <SourceCardDescription>
            {t('sources.special-divine-key-supply.description')}
          </SourceCardDescription>
        </SourceCardConatiner>
      )
    default:
      return (
        <SourceCardConatiner>
          <SourceCardDescription>Unknown: {source.type}</SourceCardDescription>
        </SourceCardConatiner>
      )
  }
}

export default SourceCard

const SourceCardConatiner: React.FC = ({ children }) => {
  return (
    <Card
      sx={{
        m: 1,
      }}
    >
      {children}
    </Card>
  )
}

const SourceCardHeading: React.FC = ({ children }) => {
  return (
    <Heading as='h4' sx={{ borderBottom: 'default', p: 1, m: 0 }}>
      {children}
    </Heading>
  )
}

const SourceCardDescription: React.FC = ({ children }) => {
  return <Paragraph sx={{ p: 1 }}>{children}</Paragraph>
}
