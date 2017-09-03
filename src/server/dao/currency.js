/*jshint -W030*/

const Currency = require('../classes/Currency');
const BittrexCurrency = require('../classes/BittrexCurrency');
const PoloniexCurrency = require('../classes/PoloniexCurrency');
const axios = require('axios');

// TODO - make module that pulls from https://bittrex.com/api/v1.1/public/getcurrencies
const currencyAbbrToNameMap = new Map();
currencyAbbrToNameMap.set('ETH', 'Etherium');
currencyAbbrToNameMap.set('LTC', 'Litecoin');
currencyAbbrToNameMap.set('DASH', 'Dash');
currencyAbbrToNameMap.set('BTC', 'Bitcoin');

const BITTREX_BASE_URL = 'https://bittrex.com/api/v1.1/public';
const POLONIEX_BASE_URL = 'https://poloniex.com/public';

module.exports = {
  getCurrencyFromBittrex: (currencyCode) => {
    return new Promise((resolve, reject) => {

      const promise = axios.get(`${BITTREX_BASE_URL}/getticker?market=USDT-${currencyCode}`);

      promise
      .then((result) => {
        const data = result.data;
        data.abbreviation = currencyCode;
        data.name = currencyAbbrToNameMap.get(currencyCode);
        // console.log(data);
        resolve(new BittrexCurrency(data));
      })
      .catch((err) => {
        // TODO handle Error
        reject(err);
      });

    });
  },

  getCurrencyFromPoloniex: (currencyCode) => {
    return new Promise((resolve, reject) => {

      const promise = axios.get(`${POLONIEX_BASE_URL}?command=returnTicker`);

      promise
      .then((result) => {
        const data = result.data[`USDT_${currencyCode}`];
        data.abbreviation = currencyCode;
        data.name = currencyAbbrToNameMap.get(currencyCode);
        resolve(new PoloniexCurrency(data));
      })
      .catch((err) => {
        // TODO handle Error
        reject(err);
      });

    });
  },

  compareCurrencies: (currencies = []) => {
    return new Promise((resolve, reject) => {

      if (currencies.length === 0) {
        reject('Must pass at least one Currency');
        return;
      }

      const abbr = currencies[0].abbreviation;
      const isCurrencyAndSameType = currencies.every((c) => {
        return (c instanceof Currency) && (c.abbreviation === abbr);
      });

      if (!isCurrencyAndSameType) {
        reject('Only Currency Classes of the same type may be compared');
      }

      if (currencies.length === 1) {
        resolve(currencies);
      }

      // COMPARE
      let lowest = Infinity;
      const buckets = currencies.reduce((buckets, c) => {
        const USDValue = c.USDValueInPennies;
        buckets[USDValue] ? buckets[USDValue].push(c) : buckets[USDValue] = [c];
        lowest = USDValue < lowest ? USDValue : lowest;
        return buckets;
      }, {});

      resolve(buckets[lowest]);

    });

  }

};
