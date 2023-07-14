export function repeat<N>(count: number, rendererFn: (index: number) => N) {
  const result: Array<N> = []
  for (let i = 0; i < count; i++) {
    result.push(rendererFn(i))
  }
  return result
}

export class ListMap<K, V> {
  map: Map<K, V[]>
  constructor(mapOrEntries?: Map<K, V[]> | [K, V[]][]) {
    if (mapOrEntries == null) {
      this.map = new Map()
    } else {
      this.map = new Map(mapOrEntries)
    }
  }

  get(key: K) {
    return this.map.get(key)
  }

  set(key: K, value: V) {
    let list = this.map.get(key)
    if (list == null) {
      list = []
      this.map.set(key, list)
    }
    list.push(value)
  }

  entries() {
    return this.map.entries()
  }

  values() {
    return this.map.values()
  }
}
