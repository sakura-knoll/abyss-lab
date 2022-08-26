export function getExSignetLabel(name: string) {
  return name
    .replace('의 축복', '')
    .replace(' ', '\n')
    .replace(/[\[\]]/g, '')
}
