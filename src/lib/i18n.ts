import { useTranslation } from 'next-i18next'

export function translate(
  targetLocale: string = 'en_US',
  localeMap: { [key: string]: string | undefined },
  fallback: string
): string {
  return localeMap[targetLocale] != null ? localeMap[targetLocale]! : fallback
}

export { useTranslation }
