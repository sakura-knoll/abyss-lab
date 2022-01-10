import NextHead from 'next/head'

interface HeadProps {
  title: string
  description?: string
}

const Head = ({ title, description }: HeadProps) => {
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
    </NextHead>
  )
}

export default Head
