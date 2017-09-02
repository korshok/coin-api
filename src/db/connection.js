const environment = process.env.NODE_ENV;
const mongoose = require('mongoose');
const config = require('../../mongofile')[environment];

///////////////////////
// MONGO CONNECTION //
/////////////////////

mongoose.Promise = global.Promise;
mongoose.connect(config.connection,
  {
    useMongoClient: true,
    promiseLibrary: global.Promise
  }
).then(
  () => { console.log(`Success! MongoDB connected.`); },
  (err) => { console.error(`Error connecting to MongoDB: ${err}`); }
);

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

/////////////
// MODELS //
///////////

const users = require('./models/users').users;

module.exports = {
  user: users,
  users: users
};
