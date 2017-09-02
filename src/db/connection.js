const environment = process.env.NODE_ENV;
const mongoose = require('mongoose');
const config = require('../../mongofile')[environment];

// const usersModel = require('./models/users').users;

const schema = new mongoose.Schema({
  username: String,
  password: String
});

const user = mongoose.model('users', schema);

mongoose.connect(config.connection,
  {
    useMongoClient: true,
    promiseLibrary: global.Promise
  }
).then(
  () => {console.log(`Success! MongoDB connected.`)},
  (err) => {console.err(`Error connecting to MongoDB: ${err}`)}
);

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
  user: user,
  users: user
};
