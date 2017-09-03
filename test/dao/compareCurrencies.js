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

    it('should reject if nothing is pass', () => {
      const result = currency.compareCurrencies();
      return result.should.be.rejected;
    });

    it('should reject if no currencies are pass', () => {
      const result = currency.compareCurrencies([]);
      return result.should.be.rejected;
    });

    it('should reject if currencies passed are not of the Currency Class', () => {
      const result = currency.compareCurrencies([
        fixtures.nonCurrency,
        fixtures.validEtheriumLow
      ]);
      return result.should.be.rejected;
    });

    it('should reject if currencies are not the same type', () => {
      const result = currency.compareCurrencies([
        fixtures.validDash,
        fixtures.validEtheriumLow
      ]);
      return result.should.be.rejected;
    });

    it('should return the currency if only one currency is passed', (done) => {
      const result = currency.compareCurrencies([
        fixtures.validEtheriumHigh
      ]);
      result
      .then((currencies) => {
        currencies.length.should.equal(1);
        currencies[0].should.deep.equal(fixtures.validEtheriumHigh);
        done();
      })
      .catch(done);
    });

    it('should return the lowest price currency', (done) => {
      const result = currency.compareCurrencies([
        fixtures.validEtheriumLow,
        fixtures.validEtheriumHigh
      ]);
      result
      .then((currencies) => {
        currencies.length.should.equal(1);
        currencies[0].should.deep.equal(fixtures.validEtheriumLow);
        done();
      })
      .catch(done);
    });

    it('should return the lowest price currency', (done) => {
      const result = currency.compareCurrencies([
        fixtures.validEtheriumLow,
        fixtures.validEtheriumMed,
        fixtures.validEtheriumHigh
      ]);
      result
      .then((currencies) => {
        currencies.length.should.equal(1);
        currencies[0].should.deep.equal(fixtures.validEtheriumLow);
        done();
      })
      .catch(done);
    });

    // TODO - test depends on the results coming back in order ==> brittle...fix
    it('should return multiple currencies if there are 2 or more at lowest prices', (done) => {
      const result = currency.compareCurrencies([
        fixtures.validEtheriumLow,
        fixtures.validEtheriumHigh,
        fixtures.validEtheriumLowDuplicate
      ]);
      result.then((currencies) => {
        currencies[0].should.deep.equal(fixtures.validEtheriumLow);
        currencies[1].should.deep.equal(fixtures.validEtheriumLowDuplicate);
        done();
      })
      .catch(done);
    });

  });

};

if (process.env.NODE_ENV === 'test') {
  module.exports = tests;
}
