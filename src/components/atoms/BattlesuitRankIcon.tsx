import SquareImageBox from './SquareImageBox'

interface BattlesuitRankIconProps {
  size: number
  rank: string
  m?: number | string
  mx?: number | string
  my?: number | string
  ml?: number | string
  mr?: number | string
  mt?: number | string
  mb?: number | string
}

const BattlesuitRankIcon = ({
  size,
  rank,
  m,
  mx,
  my,
  ml,
  mr,
  mt,
  mb,
}: BattlesuitRankIconProps) => {
  return (
    <SquareImageBox
      size={size}
      src={`/assets/honkai3rd/rank-icons/${rank}-rank.png`}
      alt={`${rank} rank`}
      m={m}
      mx={mx}
      my={my}
      ml={ml}
      mr={mr}
      mt={mt}
      mb={mb}
    />
  )
}

export default BattlesuitRankIcon
