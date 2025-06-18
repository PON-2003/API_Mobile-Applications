const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String }, // เก็บ URL หรือ path ของรูปภาพ
  gender: { type: String, required: true } // เพิ่มเพศ
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('User', UserSchema);
