/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'

const FontHead = () => {
  return (
    <Head>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='true'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Jua&display=swap'
        rel='stylesheet'
      />
    </Head>
  )
}

export default FontHead
