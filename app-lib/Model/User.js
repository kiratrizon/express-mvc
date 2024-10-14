const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true},
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// Export the model to use it in other files
module.exports = User;