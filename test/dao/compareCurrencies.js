/*jshint -W117*/
/*jshint -W079*/
/*jshint -W030*/

const db = require('../../src/db/connection');
const Currency = require('../../src/server/classes/Currency');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiAsPromised);

const currency = require('../../src/server/dao/currency');

const fixtures = {
  nonCurrency: {
    name: 'Etherium',
    abbrviation: 'ETH',
    USDValueInPennies: 1000,
    source: 'Yonkers'
  },
  validEtheriumLow: new Currency('Etherium', 'ETH', 1000, 'Bittrex'),
  validEtheriumMed: new Currency('Etherium', 'ETH', 1100, 'Poloniex'),
  validEtheriumHigh: new Currency('Etherium', 'ETH', 1200, 'BTC-E'),
  validEtheriumLowDuplicate: new Currency('Etherium', 'ETH', 1000, 'CRYPT'),
  validDash: new Currency('Dash', 'DASH', 1000, 'Bittrex')
};

const tests = () => {

  describe('compareCurrencies', () => {

    before((done) => {
      done();
    });

    xit('should throw if no currencies are pass', () => {
      const result = currency.compareCurrencies([]);
      return result.should.be.rejected;
    });

    xit('should throw if currencies passed are not of the Currency Class', () => {
      const result = currency.compareCurrencies([
        nonCurrency,
        validEtheriumLow
      ]);
      return result.should.be.rejected;
    });

    xit('should throw if currencies are not the same type', () => {
      const result = currency.compareCurrencies([
        fixtures.validDash,
        fixtures.validEtheriumLow
      ]);
      return result.should.be.rejected;
    });

    xit('should return the currenciy if only one currency is passed', () => {
      const result = currency.compareCurrencies([
        fixtures.validEtheriumHigh
      ]);
      return result[0].should.eventualy.deep.equal(fixtures.validEtheriumHigh);
    });

    xit('should return the lowest price currency', () => {
      const result = currency.compareCurrencies([
        fixtures.validEtheriumLow,
        fixtures.validEtheriumHigh
      ]);
      return result[0].should.eventualy.deep.equal(fixtures.validEtheriumLow);
    });

    xit('should return the lowest price currency', () => {
      const result = currency.compareCurrencies([
        fixtures.validEtheriumLow,
        fixtures.validEtheriumMed,
        fixtures.validEtheriumHigh
      ]);
      return result[0].should.eventualy.deep.equal(fixtures.validEtheriumLow);
    });

    xit('should return multiple currencies if there are 2 or more at lowest prices', () => {
      const result = currency.compareCurrencies([
        fixtures.validEtheriumLow,
        fixtures.validEtheriumHigh,
        fixtures.validEtheriumLowDuplicate
      ]);
      return Promise.all([
        result[0].should.eventualy.deep.equal(fixtures.validEtheriumLow),
        result[1].should.eventualy.deep.equal(fixtures.validEtheriumLowDuplicate)
      ]);
    });

  });

};
