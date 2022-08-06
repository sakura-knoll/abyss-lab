export interface VersionData {
  version: string
  previousVersion: string
  nextVersion: string
  name: string
  duration: [string, string]
  newBattlesuits: string[]
  newWeapons: string[]
  newStigmataSets: string[]
  description: string
  supplyEvents: SupplyEventData[]
  superstring: [
    { label: string; boss: string },
    { label: string; boss: string }
  ][]
  ma: [
    { label: string; boss: string },
    { label: string; boss: string },
    { label: string; boss: string }
  ][]
}

export interface SupplyEventData {
  name: string
  duration: [string, string]
  track: number
  verified: boolean
  featured: {
    type: string
    id: string
  }[]
  others: {
    type: string
    id: string
  }[]
}

export const superstringCnKeyword = '超弦空间'
export const maCnKeyword = '战场'

export const bosses = [
  {
    id: 'ksm',
    cnKeyword: '八重霞',
  },
  {
    id: 'qksm',
    cnKeyword: '科斯魔',
  },
  {
    id: 'bke',
    cnKeyword: '辉骑士 月魄',
  },
  {
    id: 'tank',
    cnKeyword: 'MHT-3B 天堂使者',
  },
  {
    id: 'husk',
    cnKeyword: '虚树神骸 虚无主义',
  },
  {
    id: 'husk2',
    cnKeyword: '虚树神骸 虚无主义',
  },
  {
    id: 'husk-sss',
    cnKeyword: '虚树神骸 虚无主义',
  },
  {
    id: 'qt',
    cnKeyword: '托纳提乌',
  },
  {
    id: 'jz',
    cnKeyword: '地藏御魂',
  },
  {
    id: 'ofg',
    cnKeyword: '伪神 奥托',
  },
  {
    id: 'pvt',
    cnKeyword: '帕凡提',
  },
  {
    id: 'hod',
    cnKeyword: '支配之律者 乌合之众',
  },
  {
    id: 'wolf',
    cnKeyword: '奔狼的领主',
  },
]
