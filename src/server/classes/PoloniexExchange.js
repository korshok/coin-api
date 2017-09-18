const Currency = require('./Currency');
const axios = require('axios');
const currencyCodeToNameMap = require('../helpers/currencyCodes');

const POLONIEX_BASE_URL = 'https://poloniex.com/public';

module.exports = class PoloniexExchange {
  constructor(data) {
    this.source = 'Poloniex';
  }

  getRate(currencyCode) {
    return new Promise((resolve, reject) => {
      const promise = axios.get(`${POLONIEX_BASE_URL}?command=returnTicker`);

      promise
      .then((result) => {
        const data = result.data[`USDT_${currencyCode}`];
        const name = currencyCodeToNameMap.get(currencyCode);
        const USDValueInPennies = Math.ceil(Number.parseInt(data.last) * 100);
        const currency = new Currency(name, currencyCode, USDValueInPennies, this.source);
        resolve(currency);
      })
      .catch(reject);

    });
  }
};
