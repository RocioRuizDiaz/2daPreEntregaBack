const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  role: {type: String, required: true, default: 'user'}

})

const users = mongoose.model('users', usersSchema);

module.exports = users;