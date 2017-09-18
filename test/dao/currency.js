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

const BittrexExchange = require('../../src/server/classes/BittrexExchange');
const PoloniexExchange = require('../../src/server/classes/PoloniexExchange');

const tests = () => {

  const currencyCode = 'ETH';
  const name = 'Etherium';

  describe('BITTREX API: https://bittrex.com/api/v1.1/public/getticker',() => {

    let bittrexCurrency;

    before((done) => {
      bittrexExchange = new BittrexExchange();
      bittrexExchange.getRate(currencyCode)
        .then((result) => {
          bittrexCurrency = result;
          done();
        })
        .catch(done);
    });

    it('should create and return instance of the currency class', () => {
      return bittrexCurrency.should.be.an.instanceof(Currency);
    });

    it('should return a Currency class with the \'name\' property', () => {
      return bittrexCurrency.should.have.property('name').that.equals(name);
    });

    it('should return a Currency class with the \'abbreviation\' property', () => {
      return bittrexCurrency.should.have.property('abbreviation').that.equals(currencyCode);
    });

    it('should return a Currency class with the \'USDValueInPennies\' property', () => {
      return bittrexCurrency.should.have.property('USDValueInPennies');
    });

    // HEADUP - usig done call back here b/c i needed access to the return value
    it('should create a valid currency class', () => {
      return bittrexCurrency.validate().isValid.should.be.true;
    });

  });

  describe('POLONIEX API: https://poloniex.com/public?command=returnTicker', () => {

    let poloniexCurrency;
    const currencyCode = 'ETH';

    before((done) => {
      poloniexExchange = new PoloniexExchange();
      poloniexExchange.getRate(currencyCode)
      .then((result) => {
        poloniexCurrency = result;
        done();
      })
      .catch(done);
    });

    it('should create and return instance of the currency class', () => {
      return poloniexCurrency.should.be.an.instanceof(Currency);
    });

    it('should return a Currency class with the \'name\' property', () => {
      return poloniexCurrency.should.have.property('name').that.equals(name);
    });

    it('should return a Currency class with the \'abbreviation\' property', () => {
      return poloniexCurrency.should.have.property('abbreviation').that.equals(currencyCode);
    });

    it('should return a Currency class with the \'USDValueInPennies\' property', () => {
      return poloniexCurrency.should.have.property('USDValueInPennies');
    });

    // HEADUP - usig done call back here b/c i needed access to the return value
    it('should create a valid currency class', () => {
      return poloniexCurrency.validate().isValid.should.be.true;
    });

  });
};

if (process.env.NODE_ENV === 'test') {
  module.exports = tests;
}
