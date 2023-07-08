import { Box } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'

interface AvatarSubSkillIconProps {
  icon: string
}

const AvatarSubSkillIcon = ({ icon: fileName }: AvatarSubSkillIconProps) => {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        background: `no-repeat 50%/80% url(${assetsBucketBaseUrl}/raw/subskillicons/${fileName}.png)`
      }}
    />
  )
}

export default AvatarSubSkillIcon
