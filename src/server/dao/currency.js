const Currency = require('../classes/Currency');
const BittrexCurrency = require('../classes/BittrexCurrency');
const axios = require('axios')

// TODO - make module that pulls from https://bittrex.com/api/v1.1/public/getcurrencies
const currencyAbbrToNameMap = new Map();
currencyAbbrToNameMap.set('ETH', 'Etherium')
currencyAbbrToNameMap.set('LTC', 'Litecoin')

const BITTREX_BASE_URL = 'https://bittrex.com/api/v1.1/public'

module.exports = {
  getCurrencyFromBittrex: (currencyCode) => {
    return new Promise((resolve, reject) => {
      const promise = axios.get(`${BITTREX_BASE_URL}/getticker?market=USDT-${currencyCode}`)
      promise
      .then((result) => {
        const data = result.data;
        data.abbreviation = currencyCode;
        console.log(currencyAbbrToNameMap.get(currencyCode));
        data.name = currencyAbbrToNameMap.get(currencyCode);
        // console.log(data);
        resolve(new BittrexCurrency(data));
      })
      .catch((err) => {
        // TODO handle Error
        reject(err)
      })

    })
  }

}
