const Currency = require('./Currency');
const axios = require('axios');
const currencyCodeToNameMap = require('../helpers/currencyCodes');

const BITTREX_BASE_URL = 'https://bittrex.com/api/v1.1/public';

module.exports = class BittrexExchange {
  constructor() {
    this.source = 'Bittrex';
  }

  getRate(currencyCode) {
    return new Promise((resolve, reject) => {
      const promise = axios.get(`${BITTREX_BASE_URL}/getticker?market=USDT-${currencyCode}`);

      promise
      .then((result) => {
        const data = result.data;
        const name = currencyCodeToNameMap.get(currencyCode);
        const USDValueInPennies = Math.ceil(Number.parseInt(data.result.Last) * 100);
        const currency = new Currency(name, currencyCode, USDValueInPennies, this.source);
        resolve(currency);
      })
      .catch(reject);

    });
  }
};
