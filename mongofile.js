const path = require('path');

module.exports = {
  development: {
    connection: process.env.COIN_DB_DEV,
    seeds: {
      directory: path.join(__dirname, '/src/db/seeds')
    }
  },
  test: {
    connection: process.env.COIN_DB_TEST,
    seeds: {
      directory: path.join(__dirname, '/src/db/seeds')
    }
  }
};
