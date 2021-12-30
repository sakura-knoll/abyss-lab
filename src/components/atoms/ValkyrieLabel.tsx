import { Text } from '@theme-ui/components'

interface ValkyrieLabelProps {
  valkyrie: string
}

const ValkyrieLabel = ({ valkyrie }: ValkyrieLabelProps) => {
  const { label } = getLabelData(valkyrie)
  return <Text>{label}</Text>
}

export default ValkyrieLabel

function getLabelData(valkyrie: string): { label: string; icon?: string } {
  switch (valkyrie) {
    case 'kiana':
      return { icon: 'kiana', label: 'Kiana Kaslana' }
    case 'mei':
      return { icon: 'mei', label: 'Raiden Mei' }
    case 'bronya':
      return { icon: 'bronya', label: 'Bronya Zaychik' }
    case 'himeko':
      return { icon: 'himeko', label: 'Murata Himeko' }
    case 'theresa':
      return { icon: 'theresa', label: 'Theresa Apocalypse' }
    case 'fuhua':
      return { icon: 'fuhua', label: 'Fu Hua' }
    case 'rita':
      return { icon: 'rita', label: 'Rita Rossweisse' }
    case 'sakura':
      return { icon: 'sakura', label: 'Yae Sakura' }
    case 'kallen':
      return { icon: 'kallen', label: 'Kallen Kaslana' }
    case 'olenyevas':
      return { icon: 'olenyevas', label: 'Olenyevas Sisters' }
    case 'seele':
      return { icon: 'seele', label: 'Seele Vollerei' }
    case 'durandal':
      return { icon: 'durandal', label: 'Durandal' }
    case 'fischl':
      return { icon: 'fischl', label: 'Fischl' }
    case 'elysia':
      return { icon: 'elysia', label: 'Elysia' }
    case 'mobius':
      return { icon: 'mobius', label: 'Mobius' }
    case 'raven':
      return { icon: 'raven', label: 'Raven' }
    case 'carole':
      return { icon: 'carole', label: 'Carole Pepper' }
  }
  return {
    label: valkyrie,
  }
}
