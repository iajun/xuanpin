const increaseList = require('./files/increase_list.json')
const shopList = require('./files/shop_list.json')
const { exec } = require('child_process');
const { promisify } = require('util');
const Utils = require("./utils")

const REGEX = /Shopify\.theme = (.*);/;

async function main() {
  const set = new Set()
  const themeList = []

  async function getTheme(domain) {
    if (set.has(domain)) return;
    const url = `https://${domain}`;
    try {
      const { stdout: html } = await promisify(exec)(`curl ${url}`, {
        maxBuffer: 1024 * 1024 * 1024
      })
      set.add(domain)
      const [, themeStr] = REGEX.exec(html)
      const theme = JSON.parse(themeStr)
      themeList.push({
        name: theme.name,
        domain,
        id: theme.id
      })
      console.log(themeList.length, theme.name)
    } catch (error) {
      console.error(error)
    }
  }

  const promises = increaseList.concat(shopList).map(t => getTheme(t.shop_domain))

  await Promise.all(promises)

  Utils.toCsv('theme', themeList)
}

main()
