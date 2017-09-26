const path = require('path');

module.exports = {
  production: {
    connection: process.env.MONGODB_URI
  },
  development: {
    connection: process.env.COIN_DB_DEV
  },
  test: {
    connection: process.env.COIN_DB_TEST
  }
};
