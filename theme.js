const increaseList = require('./files/increase_list.json')
const shopList = require('./files/shop_list.json')
const axios = require('axios');
const { exec } = require('child_process');
const { promisify } = require('util');

const REGEX = /Shopify.theme = (.*?)/;

async function getTheme(domain) {
  const url = `https://${domain}`;
  const {stdout: html} = await promisify(exec)(`curl ${url}`)
  const {input,...rest,} = REGEX.exec(html)
  // console.log(b)
  console.log(rest)

  // axios.get(`https://${url}`, { responseType: 'document' }).then(res => {
  //   console.log(res.data)
  // }).catch(er => {
  //   console.error(er)
  // })
}

getTheme(increaseList[0].shop_domain)
