const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
