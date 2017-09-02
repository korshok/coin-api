/*jshint -W117*/
/*jshint -W079*/
/*jshint -W030*/

const db = require('../../src/db/connection');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiAsPromised);

const currency = require('../../src/server/dao/currency');

const tests = () => {

  describe('BITTREX API: https://bittrex.com/api/v1.1/public/getticker',() => {

    let result;
    const currencyPair = "USDT-ETH";

    before((done) => {
      result = currency.getCurrencyFromBittrex(currencyPair);
      done()
    });

    it('should create and return instance of the currency class', () => {
      result.should.eventually.be.a.instanceof(Currency);
    });

    it('should return a Currency class with the \'name\' property', () => {
      result.should.eventually.have.property('name').should.be.defined
    });

    it('should return a Currency class with the \'abbreviation\' property', () => {
      result.should.eventually.have.property('abbreviation').should.be.defined
    });

    it('should return a Currency class with the \'USDValueInPennies\' property', () => {
      result.should.eventually.have.property('USDValueInPennies').should.be.defined
    });

    it('should create a valid currency class', () => {
      result.should.eventually.be.a.instanceof(Currency);
    });

  });
}
