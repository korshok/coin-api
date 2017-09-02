const authRoutes = require('./routes/auth/auth');

const authDao = require('./dao/auth');
const currencyDao = require('./dao/currency');

const currencyClass = require('./unit/currencyClass');

////////////////////////////////
// ROUTE (INTEGRATION) TESTS //
//////////////////////////////

authRoutes();

////////////////
// DAO TESTS //
//////////////

authDao();
currencyDao();

/////////////////
// UNIT TESTS //
///////////////

currencyClass();
