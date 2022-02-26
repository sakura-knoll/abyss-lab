const { i18n } = require('./next-i18next.config')

module.exports = {
  async redirects() {
    return [
      {
        source: '/honkai3rd/stigmata/bianka-stage',
        destination: '/honkai3rd/stigmata/bianka-theatre',
        permanent: true,
      },
      {
        source: '/honkai3rd/stigmata/bianka-stage-top',
        destination: '/honkai3rd/stigmata/bianka-theatre-top',
        permanent: true,
      },
      {
        source: '/honkai3rd/stigmata/bianka-stage-mid',
        destination: '/honkai3rd/stigmata/bianka-theatre-mid',
        permanent: true,
      },
      {
        source: '/honkai3rd/stigmata/bianka-stage-bot',
        destination: '/honkai3rd/stigmata/bianka-theatre-bot',
        permanent: true,
      },
      {
        source: '/honkai3rd/elfs/hsd',
        destination: '/honkai3rd/elfs/bd',
        permanent: true,
      },
      {
        source: '/honkai3rd/weapons/pardofelis-5-star',
        destination: '/honkai3rd/weapons/dream-of-the-past',
        permanent: true,
      },
      {
        source: '/honkai3rd/weapons/pardofelis-6-star',
        destination: '/honkai3rd/weapons/dream-of-the-past-eyes-of-the-night',
        permanent: true,
      },
      {
        source: '/honkai3rd/weapons/chakram-foundry',
        destination: '/honkai3rd/weapons/dark-meteorite-golden-scale',
        permanent: true,
      },
    ]
  },
  i18n,
}
