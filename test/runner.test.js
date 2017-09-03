const authRoutes = require('./routes/auth/auth');
const currencyRoutes = require('./routes/currency/currency');

const authDao = require('./dao/auth');
const currencyDao = require('./dao/currency');
const compareCurrenciesDao = require('./dao/compareCurrencies');

const currencyClass = require('./unit/currencyClass');

////////////////////////////////
// ROUTE (INTEGRATION) TESTS //
//////////////////////////////

authRoutes();
currencyRoutes();

////////////////
// DAO TESTS //
//////////////

authDao();
currencyDao();
compareCurrenciesDao();

/////////////////
// UNIT TESTS //
///////////////

currencyClass();
