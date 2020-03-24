const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  city: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
