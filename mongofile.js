const path = require('path');

module.exports = {
  development: {
    connection: process.env.COIN_DB_DEV
  },
  test: {
    connection: process.env.COIN_DB_TEST
  }
};
