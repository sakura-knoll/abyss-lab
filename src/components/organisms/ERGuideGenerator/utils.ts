export function getExSignetLabel(name: string) {
  return name
    .replace('의 축복', '')
    .replace(/\s/g, '\n')
    .replace(/[\[\]]/g, '')
}
