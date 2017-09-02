const Currency = require('./Currency');

module.exports = class BittrexCurrency extends Currency {
  constructor(data) {
    const USDValueInPennies = Number.parseInt(data.result.Last) * 100
    super(data.name, data.abbreviation, USDValueInPennies);
  }
}
