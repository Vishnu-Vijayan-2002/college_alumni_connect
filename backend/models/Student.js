const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passoutYear: { type: Number, required: true },
  department: { type: String, required: true },
  branch: { type: String, required: true }, // ✅ Added branch
  rollNo: { type: String, required: true, unique: true }, // University Roll No
  classRollNo: { type: String, required: true, unique: true }, // ✅ Added Class Roll No
  admissionNo: { type: String, required: true, unique: true },
  role: { type: String, default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
