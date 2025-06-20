const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: { type: String, default: null },
  lastname: { type: String, default: null },
  email: { type: String, default: null },
  phone: { type: String, default: null },
  image: { type: String, default: null },
  gender: { type: String, default: null }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('User', UserSchema);
