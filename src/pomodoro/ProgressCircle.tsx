interface ProgressCircleProps {
  size: number
  progress: number
}

const ProgressCircle = ({ size, progress }: ProgressCircleProps) => {
  return (
    <svg viewBox={`0 0 ${size} ${size}`} xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        fill='rgba(0,0,0,0.3)'
        d={progressPath(1, size, 10)}
      />
      <path
        fillRule='evenodd'
        fill='white'
        d={progressPath(progress, size, 10)}
      />
    </svg>
  )
}

function progressPath(progress: number, width: number, strokeWidth: number) {
  const cx = width / 2
  const cy = width / 2
  const radius = width / 2
  const innerRadius = width / 2 - strokeWidth
  if (progress >= 1) {
    return `M ${cx} 0 A ${radius} ${radius} 0 0 1 ${cx} ${width} A ${radius} ${radius} 0 0 1 ${cx} 0 z M ${cx} ${strokeWidth} A ${innerRadius} ${innerRadius} 0 0 1 ${cx} ${
      cy + innerRadius
    } A ${innerRadius} ${innerRadius} 0 0 1 ${cx} ${strokeWidth} Z`
  }

  const offsetRadians = -Math.PI / 2
  const endRadians = offsetRadians + progress * Math.PI * 2
  const outerEndX = cx + (width / 2) * Math.cos(endRadians)
  const outerEndY = cy + (width / 2) * Math.sin(endRadians)
  const innerEndX = cx + (width / 2 - strokeWidth) * Math.cos(endRadians)
  const innerEndY = cy + (width / 2 - strokeWidth) * Math.sin(endRadians)
  const flip = progress > 0.5 ? 1 : 0

  return `M ${cx} 0 A ${cx} ${cy} 0 ${flip} 1 ${outerEndX} ${outerEndY} L ${innerEndX} ${innerEndY} A ${innerRadius} ${innerRadius} 0 ${flip} 0 ${cx} ${strokeWidth}`
}

export default ProgressCircle
