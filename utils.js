const json2csv = require('json2csv')
const fs = require('fs')
const path = require('path');
const { promisify } = require('util');

const { Parser } = json2csv

module.exports = {
  toCsv(name, list) {
    const parser = new Parser();
    const csv = parser.parse(list);
    promisify(fs.writeFile)(path.resolve(__dirname, './files', `${name}.csv`), csv)
  }
}
