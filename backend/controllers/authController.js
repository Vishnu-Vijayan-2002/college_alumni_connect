const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const Alumni = require('../models/Alumni');
const jwt = require('jsonwebtoken');

// Register User (student or alumni)
exports.registerUser = async (req, res) => {
  try {
    // Ensure body is present
    console.log("Incoming body:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is missing' });
    }

    const {
      name,
      email,
      password,
      confirmPassword,
      department,
      branch,
      passoutYear,
      role,
      region,
      interestedIn,
      rollNo,
      classRollNo,
      admissionNo
    } = req.body;

    // ✅ Password check
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // ✅ Email uniqueness across Student + Alumni
    const existingUser = await Student.findOne({ email }) || await Alumni.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ============================
    // Student branch
    // ============================
if (role === 'student') {
  // ---------------- Required fields check ----------------
  if (!rollNo || !admissionNo || !department || !branch || !passoutYear || !classRollNo) {
    return res.status(400).json({
      error: 'Roll number, Admission number, Department, Branch, Class Roll Number, and Passout Year are required for students'
    });
  }

  // ---------------- Uniqueness checks ----------------
  if (await Student.findOne({ rollNo })) {
    return res.status(400).json({ error: 'Roll number already exists' });
  }

  if (await Student.findOne({ admissionNo })) {
    return res.status(400).json({ error: 'Admission number already exists' });
  }

  if (await Student.findOne({ classRollNo })) {
    return res.status(400).json({ error: 'Class Roll Number already exists' });
  }

  // ---------------- Save student ----------------
  const student = new Student({
    name,
    email,
    password: hashedPassword,
    department,
    branch,
    passoutYear,
    rollNo,
    classRollNo,
    admissionNo,
    interestedIn,
    region
  });

  await student.save();
  return res.status(201).json({
    message: 'Student registered successfully',
    user: student
  });
}



    // ============================
    // Alumni branch
    // ============================
    if (role === 'alumni') {
      if (!passoutYear || !department) {
        return res.status(400).json({ error: 'Department and Passout Year are required for alumni' });
      }

       const alumni = new Alumni({
    name,
    email,
    password: hashedPassword,
    department,
    passoutYear,
    region,
    interestedIn,
    company: req.body.company || null,
    position: req.body.position || null,
    experience: req.body.experience || 0
  });
      await alumni.save();
      return res.status(201).json({ message: 'Alumni registered successfully', user: alumni });
    }

    return res.status(400).json({ error: 'Invalid role. Must be student or alumni' });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};


// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Login User (student or alumni with alumni verification check)
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === 'student') {
      user = await Student.findOne({ email });
    } else if (role === 'alumni') {
      user = await Alumni.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      // Alumni verificationStatus check
      if (user.verificationStatus === 'pending') {
        return res.status(403).json({ error: 'Your registration is pending approval' });
      }
      if (user.verificationStatus === 'rejected') {
        return res.status(403).json({ error: 'Your registration has been rejected' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid role. Use student or alumni.' });
    }

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = generateToken(user);

  res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    rollNo: user.rollNo,
    classRollNo: user.classRollNo,
    admissionNo: user.admissionNo,
    department: user.department,
    branch: user.branch,
    passoutYear: user.passoutYear,
    verificationStatus:user.verificationStatus,
    region:user.region
  },
});


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
