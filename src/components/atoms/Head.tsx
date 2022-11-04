import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { baseUrl } from '../../lib/consts'

interface HeadProps {
  title: string
  description?: string
  canonicalHref?: string
}

const Head = ({ title, description, canonicalHref }: HeadProps) => {
  const { locale } = useRouter()
  return (
    <NextHead>
      <title>{title}</title>
      <meta
        name='description'
        content={
          description != null
            ? description
            : 'Unofficial Honkai3rd/Genshin Wiki'
        }
      />
      <meta property='og:title' content={title} key='title' />
      <meta property='og:description' content={description} key='description' />
      {canonicalHref && (
        <link
          rel='canonical'
          href={`${baseUrl}${
            locale === 'en-US' ? '' : '/ko-KR'
          }${canonicalHref}`}
        />
      )}
    </NextHead>
  )
}

export default Head
