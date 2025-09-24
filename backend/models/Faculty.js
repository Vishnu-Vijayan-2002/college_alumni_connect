const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  inCharge: { type: String, default: '' }, // department name or empty string
  role: { type: String, required: true }
});
facultySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Faculty', facultySchema);
