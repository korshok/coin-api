const mongoose = require('mongoose');
const db = require('../connection');

const schema = new mongoose.Schema({
  username: String,
  password: String
});

const model = new mongoose.model('Users', schema)

exports.users = model;
