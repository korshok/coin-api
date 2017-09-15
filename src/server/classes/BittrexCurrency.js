const Currency = require('./Currency');
const axios = require('axios');
const currencyCodeToNameMap = require('../helpers/currencyCodes');

module.exports = class BittrexCurrency extends Currency {
  constructor(data) {
    super(null, null, null, 'Bittrex');
  }

  getRate(currencyCode) {
    return new Promise((resolve, reject) => {
      const BITTREX_BASE_URL = 'https://bittrex.com/api/v1.1/public';
      const promise = axios.get(`${BITTREX_BASE_URL}/getticker?market=USDT-${currencyCode}`);

      promise
      .then((result) => {
        const data = result.data;
        this.abbreviation = currencyCode;
        this.name = currencyCodeToNameMap.get(currencyCode);
        this.USDValueInPennies = Math.ceil(Number.parseInt(data.result.Last) * 100);
        resolve();
      })
      .catch(reject);

    });
  }
};
