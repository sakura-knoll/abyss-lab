export const erVersions = [
  {
    version: '5.0',
    battlesuits: ['hfs', 'hot', 'hor', 'sn', 'aka', 'ri', 'vg', 'pv'],
  },
  {
    version: '5.1',
    battlesuits: ['mpe', 'bke', 'lk', 'stfu'],
  },
  {
    version: '5.2',
    battlesuits: ['io', 'ma', 'nyx'],
  },
  {
    version: '5.3',
    battlesuits: ['sns', 'tp', 'hos'],
  },
  {
    version: '5.4',
    battlesuits: ['sw', 'da'],
  },
  {
    version: '5.5',
    battlesuits: ['pe', 'spa'],
  },
].reverse()

export const erBattlesuits = erVersions.reduce<string[]>((list, version) => {
  list.push(...version.battlesuits)
  return list
}, [])

export const supportBattlesuitIds = [
  'vc',
  'dp',
  'ss',
  'le',
  'vke',
  'bke',
  'ae',
  'br',
]

export const remembranceSigilIds = [
  'the-moth-insignia',
  'home-lost',
  'false-hope',
  'tin-flask',
  'ruined-legacy',
  'burden',
  'gold-goblet',
  'mad-king-s-mask',
  'light-as-a-bodhi-leaf',
  'forget-me-not',
  'forbidden-seed',
  'memory',
  'crystal-rose',
  'abandoned',
  'good-old-days',
  'shattered-shackles',
  'heavy-as-a-million-lives',
  'stained-sakura',
  'the-first-scale',
  'resolve',
]

export interface SignetData {
  id: string
  name: string
  description: string
  upgrades: {
    name: string
    description: string
  }[]
}

export interface SignetGroup {
  id: string
  name: string
  krName: string
  setIds: string[]
}

export const signetGroups = [
  {
    id: 'elysia',
    name: 'Elysia',
    krName: '엘리시아',
    setIds: erBattlesuits.map((battlesuitId) => {
      return `elysia-${battlesuitId}`
    }),
  },
  {
    id: 'eden',
    name: 'Eden',
    krName: '에덴',
    setIds: ['eden-normal', 'eden-nexus-1', 'eden-nexus-2'],
  },
  {
    id: 'hua',
    name: 'Hua',
    krName: '화',
    setIds: ['hua-normal', 'hua-nexus-1', 'hua-nexus-2'],
  },
  {
    id: 'kalpas',
    name: 'Kalpas',
    krName: '칼파스',
    setIds: ['kalpas-normal', 'kalpas-nexus-1', 'kalpas-nexus-2'],
  },
  {
    id: 'kevin',
    name: 'Kevin',
    krName: '케빈',
    setIds: ['kevin-normal', 'kevin-nexus-1', 'kevin-nexus-2'],
  },
  {
    id: 'mobius',
    name: 'Mobius',
    krName: '뫼비우스',
    setIds: ['mobius-normal', 'mobius-nexus-1', 'mobius-nexus-2'],
  },
  {
    id: 'sakura',
    name: 'Sakura',
    krName: '사쿠라',
    setIds: ['sakura-normal', 'sakura-nexus-1', 'sakura-nexus-2'],
  },
  {
    id: 'su',
    name: 'Su',
    krName: '수',
    setIds: ['su-normal', 'su-nexus-1', 'su-nexus-2'],
  },
]

export const signetGroupMap = signetGroups.reduce((map, group) => {
  map.set(group.id, group)
  return map
}, new Map<string, SignetGroup>())

export interface SignetSet {
  id: string
  name: string
  signets: SignetData[]
}

export interface PopulatedSignetGroup {
  id: string
  name: string
  sets: SignetSet[]
}

export interface SupportBattlesuit {
  id: string
  name: string
  skillName: string
  description: string
  cooldown: number
}

export interface RemembranceSigil {
  id: string
  name: string
  description: string
}
