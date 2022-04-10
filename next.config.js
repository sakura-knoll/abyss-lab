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
        source: '/honkai3rd/weapons/dream-of-the-past',
        destination: '/honkai3rd/weapons/purana-phantasma',
        permanent: true,
      },
      {
        source: '/honkai3rd/weapons/dream-of-the-past-eyes-of-the-night',
        destination: '/honkai3rd/weapons/purana-phantasma-nighteye',
        permanent: true,
      },
      {
        source: '/honkai3rd/weapons/dark-meteorite-golden-scale',
        destination: '/honkai3rd/weapons/gilded-librae',
        permanent: true,
      },
      {
        source: '/honkai3rd/weapons/azure-flare',
        destination: '/honkai3rd/weapons/cerulean-flare',
        permanent: true,
      },
      {
        source: '/honkai3rd/battlesuits/pardofelis',
        destination: '/honkai3rd/battlesuits/rc',
        permanent: true,
      },
    ]
  },
  i18n,
}
