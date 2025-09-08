const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const Alumni = require('../models/Alumni');
const jwt = require('jsonwebtoken');

// Register User (student or alumni)
exports.registerUser = async (req, res) => {
  try {
    // Ensure body is present
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is missing' });
    }

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
      if (!rollNo || !admissionNo) {
        return res.status(400).json({ error: 'Roll number and Admission number are required for students' });
      }

      // RollNo uniqueness
      if (await Student.findOne({ rollNo })) {
        return res.status(400).json({ error: 'Roll number already exists' });
      }

      // AdmissionNo uniqueness
      if (await Student.findOne({ admissionNo })) {
        return res.status(400).json({ error: 'Admission number already exists' });
      }

      // ✅ Roll format validation: YYDEPTXXX (e.g. 24MCA58)
      const rollPattern = /^(\d{2})([A-Z]{3})(\d{1,3})$/i;
      const match = rollNo.match(rollPattern);
      if (!match) {
        return res.status(400).json({ error: 'Invalid roll number format. Expected format: YYDEPTXXX (e.g., 24MCA58)' });
      }

      const [_, yearPrefix, deptCode] = match;
      const joinedYear = parseInt(`20${yearPrefix}`);
      const currentYear = new Date().getFullYear();

      if (joinedYear < currentYear - 4 || joinedYear > currentYear + 1) {
        return res.status(400).json({
          error: `Invalid joined year (${joinedYear}) from roll number. Allowed range: ${currentYear - 4} to ${currentYear + 1}`
        });
      }

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
        admissionNo,
        interestedIn,
        region
      });

      await student.save();
      return res.status(201).json({ message: 'Student registered successfully', user: student });
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
