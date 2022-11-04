/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.abyss-lab.app',
  generateRobotsTxt: true,
  exclude: ['*/temp/*'],
}
