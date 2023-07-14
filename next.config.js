const { i18n } = require('./next-i18next.config')
const legacyRedirects = require('./legacy-redirects.js')

module.exports = {
  async redirects() {
    return [
      ...legacyRedirects.map(([source, dest]) => {
        console.log(source, dest)
        return {
          source: `/honkai3rd/battlesuits/${source}`,
          destination: `/honkai3rd/battlesuits/${dest}`,
          permanent: false
        }
      }),
      {
        source: '/honkai3rd/stigmata/elysia-flawless',
        destination: '/honkai3rd/stigmata/elysia-pristine',
        permanent: true
      },
      {
        source: '/honkai3rd/stigmata/elysia-flawless-top',
        destination: '/honkai3rd/stigmata/elysia-pristine-top',
        permanent: true
      },
      {
        source: '/honkai3rd/stigmata/elysia-flawless-mid',
        destination: '/honkai3rd/stigmata/elysia-pristine-mid',
        permanent: true
      },
      {
        source: '/honkai3rd/stigmata/elysia-flawless-bot',
        destination: '/honkai3rd/stigmata/elysia-pristine-bot',
        permanent: true
      },
      {
        source: '/honkai3rd/stigmata/bianka-stage-top',
        destination: '/honkai3rd/stigmata/bianka-theatre-top',
        permanent: true
      },
      {
        source: '/honkai3rd/stigmata/bianka-stage-mid',
        destination: '/honkai3rd/stigmata/bianka-theatre-mid',
        permanent: true
      },
      {
        source: '/honkai3rd/stigmata/bianka-stage-bot',
        destination: '/honkai3rd/stigmata/bianka-theatre-bot',
        permanent: true
      },
      {
        source: '/honkai3rd/elfs/hsd',
        destination: '/honkai3rd/elfs/bd',
        permanent: true
      },
      {
        source: '/honkai3rd/weapons/dream-of-the-past',
        destination: '/honkai3rd/weapons/purana-phantasma',
        permanent: true
      },
      {
        source: '/honkai3rd/weapons/dream-of-the-past-eyes-of-the-night',
        destination: '/honkai3rd/weapons/purana-phantasma-nighteye',
        permanent: true
      },
      {
        source: '/honkai3rd/weapons/dark-meteorite-golden-scale',
        destination: '/honkai3rd/weapons/gilded-librae',
        permanent: true
      },
      {
        source: '/honkai3rd/weapons/azure-flare',
        destination: '/honkai3rd/weapons/cerulean-flare',
        permanent: true
      },
      {
        source: '/honkai3rd/battlesuits/pardofelis',
        destination: '/honkai3rd/battlesuits/rc',
        permanent: true
      },
      {
        source: '/honkai3rd/weapons/prisoner-of-the-past',
        destination: '/honkai3rd/weapons/lost-conviction',
        permanent: true
      },
      {
        source: '/honkai3rd/weapons/prisoner-of-the-past-deed-of-fate',
        destination: '/honkai3rd/weapons/lost-conviction-damnation',
        permanent: true
      },
      {
        source: '/honkai3rd/weapons/beautiful-poem-of-the-past',
        destination: '/honkai3rd/weapons/echo-of-paradise',
        permanent: true
      },
      {
        source: '/novels/ae/index.html',
        destination: '/honkai3rd/novels/ae',
        permanent: false
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/ko-KR/honkai3rd/novels/ae',
        destination: '/novels/ae/ko-KR/index.html',
        locale: false
      },
      {
        source: '/en-US/honkai3rd/novels/ae',
        destination: '/novels/ae/en-US/index.html',
        locale: false
      },
      {
        source: '/honkai3rd/novels/ae',
        destination: '/novels/ae/en-US/index.html'
      },
      {
        source: '/ko-KR/honkai3rd/novels/duriduri',
        destination: '/novels/duriduri/ko-KR/index.html',
        locale: false
      },
      {
        source: '/en-US/honkai3rd/novels/duriduri',
        destination: '/novels/duriduri/en-US/index.html',
        locale: false
      },
      {
        source: '/honkai3rd/novels/duriduri',
        destination: '/novels/duriduri/en-US/index.html'
      },
      {
        source: '/ko-KR/honkai3rd/novels/7s',
        destination: '/novels/7s/ko-KR/index.html',
        locale: false
      },
      {
        source: '/en-US/honkai3rd/novels/7s',
        destination: '/novels/7s/en-US/index.html',
        locale: false
      },
      {
        source: '/honkai3rd/novels/7s',
        destination: '/novels/7s/en-US/index.html'
      }
    ]
  },
  i18n
}
