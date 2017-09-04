/*jshint -W117*/
/*jshint -W079*/
/*jshint -W030*/

process.env.NODE_ENV = 'test';

const db = require('../../../src/db/connection');
const chai = require('chai');
const sinon = require('sinon');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../../src/server/app');

const BASE_ROUTE = '/currency/getLowestRate';
const CURRENCY_CODE = 'ETH';
const CURRENCY_NAME = 'Etherium';

const tests = () => {
  describe('currency/getLowestRate', () => {

    describe('errors', () => {

      it('should return error if no parameter is passed', (done) => {
        chai.request(server)
        .get(`${BASE_ROUTE}`)
        .set('authorization', 'Bearer fake.Token.fakeToken')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should return error if the currency code could not be found', (done) => {
        chai.request(server)
        .get(`${BASE_ROUTE}/OMT`)
        .set('authorization', 'Bearer fake.Token.fakeToken')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal(`Sorry, we do not have data for OMT.`);
          done();
        });
      });

    });

    describe('success', () => {

      let response;
      let error;

      before((done) => {
        chai.request(server)
        .get(`${BASE_ROUTE}/${CURRENCY_CODE}`)
        .set('authorization', 'Bearer fake.Token.fakeToken')
        .end((err, res) => {
          error = err;
          response = res;
          done();
        });
      });

      it('should not return an err', (done) => {
        expect(error).to.not.be.undefined;
        done();
      });

      it('should return JSON', (done) => {
        response.type.should.equal('application/json');
        done();
      });

      it('should return value with data property that is an array', (done) => {
        response.body.data.should.be.a('array');
        done();
      });

      it('should have at least one object in the data value array', (done) => {
        response.body.data.should.not.be.empty;
        done();
      });

      it('should have data value objects with correct keys and values', (done) => {
        response.body.data[0].should.have.property('abbreviation').that.equals(CURRENCY_CODE);
        response.body.data[0].should.have.property('name').that.equals(CURRENCY_NAME);
        response.body.data[0].should.have.property('USDValueInPennies').that.is.a('number');
        response.body.data[0].should.have.property('source').that.is.oneOf(['Bittrex', 'Poloniex']);
        done();
      });

    });

  });

};

if (process.env.NODE_ENV === 'test') {
  module.exports = tests;
}
