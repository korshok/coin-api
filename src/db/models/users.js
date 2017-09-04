const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true}
});
const model = mongoose.model('users', schema);

exports.users = model;
