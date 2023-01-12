const axios = require('axios')
const data = require('./seed.json')

function importProduct(data) {
  axios({
    headers: {
      'cookie': 'connect.sid=s%3AFD1lSw8b6BDB50lYxOkbPqkfihW8b2N_.fIznQd2iSRSHLWNoBMp9%2FbyxaeovP36jsTN21%2BGmhgs',
    },
    url: 'https://popnew-server-production.up.railway.app/admin/products',
    method: 'POST',
    data 
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}

function main() {
  data.products.map(item => ({...item, options: item.options.map(o => ({title: o.title}))})).forEach(importProduct)
  // importProduct()
}

main()
