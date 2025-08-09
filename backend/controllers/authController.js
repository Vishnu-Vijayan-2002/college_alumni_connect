const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const Alumni = require('../models/Alumni');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      department,
      passoutYear,
      role,
      region,
      interestedIn,
      rollNo,
      admissionNo
    } = req.body;

    // Validate passwords
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if email already exists
    const existingUser = await Student.findOne({ email }) || await Alumni.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle student registration
 if (role === 'student') {
  if (!rollNo || !admissionNo) {
    return res.status(400).json({ error: 'Roll number and Admission number are required for students' });
  }

  // Validate rollNo format
  const rollPattern = /^(\d{2})([A-Z]{3})(\d{1,3})$/i;
  const match = rollNo.match(rollPattern);

  if (!match) {
    return res.status(400).json({ error: 'Invalid roll number format. Expected format: YYDEPTXXX (e.g., 24MCA58)' });
  }

  const [_, yearPrefix, deptCode, rollNumber] = match;
  const joinedYear = parseInt(`20${yearPrefix}`);
  const currentYear = new Date().getFullYear();

  // Validate year range
  if (joinedYear < currentYear - 4 || joinedYear > currentYear + 1) {
    return res.status(400).json({
      error: `Invalid joined year (${joinedYear}) from roll number. Allowed range: ${currentYear - 4} to ${currentYear + 1}`
    });
  }

  // Validate department match
  if (deptCode.toLowerCase() !== department.toLowerCase()) {
    return res.status(400).json({
      error: `Department in roll number (${deptCode}) does not match selected department (${department})`
    });
  }

  const student = new Student({
    name,
    email,
    password: hashedPassword,
    department,
    passoutYear,
    rollNo,
    admissionNo
  });

  await student.save();
  return res.status(201).json({ message: 'Student registered successfully', user: student });
}

    // Handle alumni registration
    if (role === 'alumni') {
      // Region is still required
      if (!region) {
        return res.status(400).json({ error: 'Region is required for alumni' });
      }

      // ✅ Make profile image optional
      const profileImage = req.file ? req.file.filename : null;

      const alumni = new Alumni({
        name,
        email,
        password: hashedPassword,
        department,
        passoutYear,
        region,
        interestedIn,
        rollNo,
        admissionNo,
        profileImage
      });

      await alumni.save();
      return res.status(201).json({ message: 'Alumni registered successfully', user: alumni });
    }

    return res.status(400).json({ error: 'Unsupported role type' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// LOGIN Function

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    // Check based on role
    if (role === 'student') {
      user = await Student.findOne({ email });
    } else if (role === 'alumni') {
      user = await Alumni.findOne({ email });
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
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
