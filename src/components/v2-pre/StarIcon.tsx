import { Box } from 'theme-ui'
import { assetsBucketBaseUrl } from '../../lib/consts'
import { StarRank } from '../../lib/v2-pre/data/types'

interface StarIconProps {
  star: StarRank
}

const StarIcon = ({ star }: StarIconProps) => {
  return (
    <Box
      sx={{
        width: 30,
        height: 30,
        background: `no-repeat 50% / 30px url(${getStarIconPath(star)})`
      }}
    />
  )
}

export default StarIcon

function getStarIconPath(star: StarRank) {
  switch (star) {
    case 'b':
      return `${assetsBucketBaseUrl}/raw/avatarstar/Star_Avatar_1.png`
    case 'a':
      return `${assetsBucketBaseUrl}/raw/avatarstar/Star_Avatar_2.png`
    case 's':
      return `${assetsBucketBaseUrl}/raw/avatarstar/Star_Avatar_3.png`
    case 'ss':
      return `${assetsBucketBaseUrl}/raw/avatarstar/Star_Avatar_4.png`
    case 'sss':
      return `${assetsBucketBaseUrl}/raw/avatarstar/Star_Avatar_5.png`
    case 's1':
      return `${assetsBucketBaseUrl}/raw/avatarstarskill/S1.png`
    case 's2':
      return `${assetsBucketBaseUrl}/raw/avatarstarskill/S2.png`
    case 's3':
      return `${assetsBucketBaseUrl}/raw/avatarstarskill/S3.png`
    case 'ss1':
      return `${assetsBucketBaseUrl}/raw/avatarstarskill/SS1.png`
    case 'ss2':
      return `${assetsBucketBaseUrl}/raw/avatarstarskill/SS2.png`
    case 'ss3':
      return `${assetsBucketBaseUrl}/raw/avatarstarskill/SS3.png`
  }
}
