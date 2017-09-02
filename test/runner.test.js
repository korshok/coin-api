const authRoutes = require('./routes/auth/auth');
const authDao = require('./dao/auth');
const currencyClass = require('./unit/currencyClass');

////////////////////////////////
// ROUTE (INTEGRATION) TESTS //
//////////////////////////////

authRoutes();

////////////////
// DAO TESTS //
//////////////

authDao();

/////////////////
// UNIT TESTS //
///////////////

currencyClass();
