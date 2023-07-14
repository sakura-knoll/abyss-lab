import { Box } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'

interface AvatarSkillIconProps {
  icon: string
}

const AvatarSkillIcon = ({ icon: fileName }: AvatarSkillIconProps) => {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        background: `no-repeat 50%/80% url(${assetsBucketBaseUrl}/raw/skillicons/${fileName}.png)`
      }}
    />
  )
}

export default AvatarSkillIcon
