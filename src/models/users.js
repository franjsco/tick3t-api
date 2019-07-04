const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Define a schema
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

// hash
// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  const user = this;
  user.password = bcrypt.hashSync(user.password, saltRounds);
  next();
});

module.exports = mongoose.model('User', UserSchema);
