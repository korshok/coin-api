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

const tests = () => {

  describe.only('BITTREX API: https://bittrex.com/api/v1.1/public/getticker',() => {

    let result;
    const currencyCode = "ETH";

    before((done) => {
      result = currency.getCurrencyFromBittrex(currencyCode);
      done()
    });

    it('should create and return instance of the currency class', () => {
      return result.should.eventually.be.an.instanceof(Currency);
    });

    it('should return a Currency class with the \'name\' property', () => {
      return result.should.eventually.have.property('name').that.is.exists;
    });

    it('should return a Currency class with the \'abbreviation\' property', () => {
      return result.should.eventually.have.property('abbreviation').that.is.exists;
    });

    it('should return a Currency class with the \'USDValueInPennies\' property', () => {
      return result.should.eventually.have.property('USDValueInPennies').that.is.exists
    });

    // HEADUP - usig done call back here b/c i needed access to the return value
    it('should create a valid currency class', (done) => {
      result.then((currency) => {
        currency.validate().isValid.should.be.true
        done()
      })
      .catch(done)
    });

  });
}

if (process.env.NODE_ENV === 'test') {
  module.exports = tests;
}
