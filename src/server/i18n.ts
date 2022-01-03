import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export function getI18NProps(
  locale: string = 'en-US',
  nameSpaces: string[] = []
) {
  return serverSideTranslations(locale, ['common', ...nameSpaces])
}

export function generateI18NPaths(paths: { params: any; locale?: string }[]) {
  return paths.reduce<{ params: any; locale?: string }[]>((newPaths, path) => {
    newPaths.push(path)
    newPaths.push({ ...path, locale: 'ko-KR' })

    return newPaths
  }, [])
}
