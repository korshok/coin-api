/*jshint -W030*/
/*jshint -W117*/

const Currency = require('../classes/Currency');
const exchangeClasses = require('../classes/exchanges');
const currencyCodeToNameMap = require('../helpers/currencyCodes');

module.exports = _this = {

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

  },

  getLowestRate: (req, res, next) => {

    const currencyCode = req.params.currencyCode;
    // const exchanges = req.params.exchanges;
    const exchanges = ['Bittrex', 'Poloniex'];

    if (!currencyCodeToNameMap.get(currencyCode)) {
      res.status(200).json({
        message: `Sorry, we do not have data for ${currencyCode}.`
      });
      return;
    }

    // make error message more specific
    if (!exchanges.every((e) => exchangeClasses[e])) {
      res.status(200).json({
        message: `Sorry, we do support one or more of these excahnges.`
      });
      return;
    }

    const ratePromises = exchanges.map((e) => new exchangeClasses[e]().getRate(currencyCode));

    Promise.all(ratePromises)
    .then((rates) => {
      return _this.compareCurrencies(rates);
    })
    .then((lowestRates) => {
      res.status(200).json({
        data: lowestRates,
        message: 'Success!'
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Sorry, we goofed up.',
        err: err
      });
    });
  }

};
