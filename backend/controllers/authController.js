const User = require('../models/user');


exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      passoutYear,
      department,
      role,
      interestedIn,
      profileImage,
      verificationStatus // optional
    } = req.body;

    // Check for existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      passoutYear,
      department,
      role,
      interestedIn,
      profileImage,
      verificationStatus: verificationStatus || 'pending'
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        verificationStatus: newUser.verificationStatus
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
