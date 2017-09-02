const Currency = require('./Currency');

module.exports = class PoloniexCurrency extends Currency {
  constructor(data) {
    const USDValueInPennies = Math.ceil(Number.parseInt(data.last) * 100)
    super(data.name, data.abbreviation, USDValueInPennies);
  }
}
