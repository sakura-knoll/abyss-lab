import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export function getI18NProps(
  locale: string = 'en-US',
  nameSpaces: string[] = []
) {
  return serverSideTranslations(locale, ['common', ...nameSpaces])
}
