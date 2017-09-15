/*jshint -W030*/
/*jshint -W117*/

const Currency = require('../classes/Currency');
const BittrexCurrency = require('../classes/BittrexCurrency');
const PoloniexCurrency = require('../classes/PoloniexCurrency');
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

    if (!currencyCodeToNameMap.get(currencyCode)) {
      res.status(200).json({
        message: `Sorry, we do not have data for ${currencyCode}.`
      });
      return;
    }

    const bittrexCurrency = new BittrexCurrency();
    const poloniexCurrency = new PoloniexCurrency();

    Promise.all([
      bittrexCurrency.getRate(currencyCode),
      poloniexCurrency.getRate(currencyCode)
    ])
    .then(() => {
      return _this.compareCurrencies([bittrexCurrency, poloniexCurrency]);
    })
    .then((lowestArr) => {
      res.status(200).json({
        data: lowestArr,
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
