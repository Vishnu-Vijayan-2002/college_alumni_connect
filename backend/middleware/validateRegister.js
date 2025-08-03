module.exports = (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    passoutYear,
    department,
    role,
    verificationStatus // optional
  } = req.body;

  if (!name || !email || !password || !confirmPassword || !passoutYear || !department || !role) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Validate verification status if provided
  const allowedStatuses = ['pending', 'verified', 'rejected'];
  if (verificationStatus && !allowedStatuses.includes(verificationStatus)) {
    return res.status(400).json({ error: 'Invalid verification status value' });
  }

  next();
};
