const authRoutes = require('./routes/auth/auth');
const authHelpers = require('./dao/auth');
const currencyClass = require('./unit/currencyClass');

authRoutes();
authHelpers();
currencyClass();
