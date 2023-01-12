const { convert } = require('html-to-text');
const scrape = require("aliexpress-product-scraper");
const axios = require("axios");
const { chain, parseInt, sortBy } = require("lodash");
const fs = require("fs");

function transform(res) {
  const {
    title,
    description,
    images,
    variants: { options, prices },
    specs,
  } = res;

  const optionsAll = chain(options)
    .map((item) => item.values.map(c => ({ ...c, parentId: item.id })))
    .flatten()
    .value();
  const optMap = chain(optionsAll)
    .keyBy("id")
    .value();
  const toImportOptions = options.map((opt) => {
    const { name } = opt;
    return {
      title: name,
    };
  });

  const variants = prices
    .map((price) => ({
      ...price,
      optionValueIds: (price.optionValueIds.split(",").map(v => +v)),
    }))
    .filter(
      ({ optionValueIds }) =>
        optionValueIds.length === toImportOptions.length &&
        optionValueIds.every((id) => optMap[id])
    )
    .map((price) => {
      const {
        skuId,
        salePrice,
        availableQuantity,
        optionValueIds,
      } = price;
      const toImportIds = sortBy(optionValueIds, v => options.findIndex(opt => opt.id === optMap[v].parentId))

      return {
        title,
        // sku: skuId.toString(),
        prices: [
          {
            currency_code: "usd",
            amount: parseInt(salePrice * 100),
          },
        ],
        options: toImportIds.map((v) => ({
          value: optMap[v].name,
        })),
        inventory_quantity: availableQuantity,
        manage_inventory: true,
      };
    });

  const toImport = {
    title,
    description: convert(description),
    images,
    thumbnail: images[0],
    status: "draft",
    variants,
    options: toImportOptions,
    metadata: chain(specs)
      .keyBy("attrName")
      .mapValues((v) => v.attrValue).value(),
  };

  fs.writeFileSync(
    "product-to-import.json",
    JSON.stringify(toImport, null, 4),
    "utf8"
  );

  return toImport;
}

async function getProductionImportData(itemId) {
  const product = scrape(itemId);
  return product.then(transform);
}

async function execImport(data) {
  axios({
    url: "http://localhost:9000/admin/products",
    method: "POST",
    headers: {
      Cookie:
        "ajs_user_id=usr_01GPGS2MP1VEZEB2VPGTDNZSAX; ajs_anonymous_id=8ab33cd2-4deb-43ed-87c1-16d49c821da1; connect.sid=s%3AEn-dppKN1Q3L3pA5TPBeCVAcW3EUhwlL.DF8Ah1lPzoms5ghlGanyqIm1rbo0xtEOEh7hChi07vU",
    },
    data,
  })
    .then(({ product }) => {
      console.log("success:", product.id);
    })
    .catch((err) => {
      console.error(err.response);
    });
}

async function main(itemId) {
  console.log(`fetching aliexpress product: ${itemId}`);
  const data = await getProductionImportData(itemId);
  // const data = transform(require('./product.json'))
  console.log(data);

  console.log(`fetching aliexpress product: ${itemId} success!`);
  console.log("importing");
  await execImport(data)
}

// const d = transform(require('./product.json'))
// console.log(d)

main(process.argv[2])
