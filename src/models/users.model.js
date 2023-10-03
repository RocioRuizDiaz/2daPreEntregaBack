const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  age: { type: Number },
  password: { type: String }
})

const User = mongoose.model('users', usersSchema);

module.exports = User;