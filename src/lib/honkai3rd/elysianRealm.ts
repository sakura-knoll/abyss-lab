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
  {
    version: '5.6',
    battlesuits: ['rc', 'fr'],
  },
  {
    version: '5.7',
    battlesuits: ['aponia', 'eden'],
  },
  {
    version: '5.8',
    battlesuits: ['griseo', 'ft'],
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
  'hb',
  'ma',
  'rc',
  'sa',
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
  'veil-of-tears',
  'pseudo-miracle',
  'fragile-friend',
  'rainbow-of-absence',
  'feast-of-emptiness',
  'it-will-be-written',
  'dreamful-gold',
  'an-old-pal-s-legacy',
  'empty-like-shala',
  'tsukimi-himiko',
  'boundless-logos',
  'hometown',
  'proof-of-good-and-evil',
  'faraway-ship',
  'ravenous-gully',
  'grey-scale-rainbow',
  'nine-lives',
  'because-of-you',
  'boundless-feeling',
  'falling-in-past-light',
  'out-of-reach',
  'the-lonely-moon',
  'awakening',
  'key-to-the-deep',
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
    krName: '????????????',
    altName: '??????',
    krAltName: '??????',
    setIds: erBattlesuits.map((battlesuitId) => {
      return `elysia-${battlesuitId}`
    }),
  },
  {
    id: 'eden',
    name: 'Eden',
    krName: '??????',
    altName: 'Gold',
    krAltName: '??????',
    setIds: ['eden-normal', 'eden-nexus-1', 'eden-nexus-2'],
  },
  {
    id: 'hua',
    name: 'Hua',
    krName: '???',
    altName: 'Vicissitude',
    krAltName: '??????',
    setIds: ['hua-normal', 'hua-nexus-1', 'hua-nexus-2'],
  },
  {
    id: 'kalpas',
    name: 'Kalpas',
    krName: '?????????',
    altName: 'Decimation',
    krAltName: '??????',
    setIds: ['kalpas-normal', 'kalpas-nexus-1', 'kalpas-nexus-2'],
  },
  {
    id: 'kevin',
    name: 'Kevin',
    krName: '??????',
    altName: 'Deliverance',
    krAltName: '??????',
    setIds: ['kevin-normal', 'kevin-nexus-1', 'kevin-nexus-2'],
  },
  {
    id: 'mobius',
    name: 'Mobius',
    krName: '????????????',
    altName: 'Infinity',
    krAltName: '??????',
    setIds: ['mobius-normal', 'mobius-nexus-1', 'mobius-nexus-2'],
  },
  {
    id: 'sakura',
    name: 'Sakura',
    krName: '?????????',
    altName: 'Setsuna',
    krAltName: '??????',
    setIds: ['sakura-normal', 'sakura-nexus-1', 'sakura-nexus-2'],
  },
  {
    id: 'su',
    name: 'Su',
    krName: '???',
    altName: 'Bodhi',
    krAltName: '??????',
    setIds: ['su-normal', 'su-nexus-1', 'su-nexus-2'],
  },
  {
    id: 'pardofelis',
    name: 'Pardofelis',
    krName: '????????? ?????????',
    altName: 'Reverie',
    krAltName: '??????',
    setIds: ['pardofelis-normal', 'pardofelis-nexus-1'],
  },
  {
    id: 'vill-v',
    name: 'Vill-V',
    krName: '???-??????',
    altName: 'Helix',
    krAltName: '??????',
    setIds: ['vill-v-normal', 'vill-v-nexus-1'],
  },
  {
    id: 'aponia',
    name: 'Aponia',
    krName: '????????????',
    altName: 'Discipline',
    krAltName: '??????',
    setIds: ['aponia-normal', 'aponia-nexus-1'],
  },
  {
    id: 'kosma',
    name: 'Kosma',
    krName: '?????????',
    altName: 'Daybreak',
    krAltName: '??????',
    setIds: ['kosma-normal', 'kosma-nexus-1'],
  },
  {
    id: 'griseo',
    name: 'Griseo',
    krName: '????????????',
    altName: 'Stars',
    krAltName: '??????',
    setIds: ['griseo-normal', 'griseo-nexus-1'],
  },
]

export function parseSignetId(id: string) {
  if (id.startsWith('vill-v')) {
    return ['vill-v', ...id.split('-').slice(2)]
  }

  return id.split('-')
}

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
  altName: string
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
