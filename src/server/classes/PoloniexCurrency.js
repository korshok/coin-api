const Currency = require('./Currency');
const axios = require('axios');
const currencyCodeToNameMap = require('../helpers/currencyCodes');

module.exports = class PoloniexCurrency extends Currency {
  constructor(data) {
    super(null, null, null, 'Poloniex');
  }

  getRate(currencyCode) {
    return new Promise((resolve, reject) => {
      const POLONIEX_BASE_URL = 'https://poloniex.com/public';
      const promise = axios.get(`${POLONIEX_BASE_URL}?command=returnTicker`);

      promise
      .then((result) => {
        const data = result.data[`USDT_${currencyCode}`];
        this.abbreviation = currencyCode;
        this.name = currencyCodeToNameMap.get(currencyCode);
        this.USDValueInPennies = Math.ceil(Number.parseInt(data.last) * 100);
        resolve();
      })
      .catch(reject);

    });
  }
};
