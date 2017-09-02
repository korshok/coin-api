const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiAsPromised);
const Currency = require('../../src/server/classes/Currency');

const currencyFixture = {
  name: 'Etherium',
  abbreviation: 'ETH',
  USDValueInPennies: 1266
}


const tests = function() {
  describe.only('Currency Class', () => {

    it('should create a new class', (done) => {
      const currency = new Currency();
      currency.should.be.an.instanceof(Currency);
      done()
    });

    it('should set properties correctly', (done) => {
      const c = currencyFixture;
      const currency = new Currency(c.name, c.abbreviation, c.USDValueInPennies);

      currency.should.have.property('name').equals(c.name);
      currency.should.have.property('abbreviation').equals(c.abbreviation);
      currency.should.have.property('USDValueInPennies').equals(c.USDValueInPennies);

      done()
    });


    it('should validate one key if argument to validate is passed', (done) => {
      // this is not a valid currency, but the USDValueInPennies is valid
      // so we are testing that not all the validators are called
      const c = currencyFixture;
      const currency = new Currency(c.name, 100, c.USDValueInPennies);

      currency.validate('USDValueInPennies').isValid.should.be.true;

      done()
    })

    it('should validate if values are correct', (done) => {
      const c = currencyFixture;
      const currency = new Currency(c.name, c.abbreviation, c.USDValueInPennies);

      currency.validate().isValid.should.be.true;

      done()
    })

    it('should not validate if USD value is not a number', (done) => {
      const c = currencyFixture;
      const currency = new Currency(c.name, c.abbreviation, 'STRING');
      const validationResult = currency.validate()

      validationResult.isValid.should.be.false;
      validationResult.errors.length.should.equal(2)

      done()
    })

    it('should not validate if USDValueInPennies is not a WHOLE number', (done) => {
      const c = currencyFixture;
      const currency = new Currency(c.name, c.abbreviation, 1.25);
      const validationResult = currency.validate()

      validationResult.isValid.should.be.false;
      validationResult.errors.length.should.equal(1)

      done()

    })

    it('should convert USDValueInPennies to dollars and output as a string', (done) => {
      const c = currencyFixture;
      const currency = new Currency(c.name, c.abbreviation, 1266);
      const dollars = currency.getUSDValueInDollars()

      dollars.should.equal("12.66");

      done()
    })


    it('should not fail if Currency.USDValueInPennies is invalid', (done) => {
      const c = currencyFixture;
      const currency = new Currency(c.name, c.abbreviation, "1266");
      const dollars = currency.getUSDValueInDollars()

      dollars.should.equal.NaN;

      done()
    })

  })
}

if (process.env.NODE_ENV === 'test') {
  module.exports = tests;
}
