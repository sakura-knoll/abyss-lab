export function repeat<N>(count: number, rendererFn: (index: number) => N) {
  const result: Array<N> = []
  for (let i = 0; i < count; i++) {
    result.push(rendererFn(i))
  }
  return result
}
