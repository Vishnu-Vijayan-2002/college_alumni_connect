const Faculty = require('../models/Faculty');
const bcrypt = require('bcrypt');

// Add new faculty (admin only)
exports.addFaculty = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { name, email, password, department, inCharge, role } = req.body;

    if (!name || !email || !password || !department || !role) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const existing = await Faculty.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Faculty already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const faculty = new Faculty({
      name,
      email,
      password: hashedPassword,
      department,
      inCharge: inCharge || '',
      role,
    });

    await faculty.save();
    res.status(201).json({ message: 'Faculty added successfully', faculty });
  } catch (err) {
    console.error('Add Faculty Error:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};

// Get all faculties (admin only)
exports.getAllFaculties = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const faculties = await Faculty.find().select('-password'); // exclude password
    res.status(200).json({ faculties });
  } catch (err) {
    console.error('Get All Faculties Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single faculty by ID (admin and faculty themselves)
exports.getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id).select('-password');
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    // Only admin or the faculty themselves can view
    if (req.user.role !== 'admin' && req.user.id !== faculty._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.status(200).json({ faculty });
  } catch (err) {
    console.error('Get Faculty By ID Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update faculty details (admin only)
exports.updateFaculty = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { id } = req.params;
    const updateData = { ...req.body };

    // Prevent password update here (or handle separately)
    if (updateData.password) delete updateData.password;

    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    if (!updatedFaculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    res.status(200).json({ message: 'Faculty updated', faculty: updatedFaculty });
  } catch (err) {
    console.error('Update Faculty Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete faculty (admin only)
exports.deleteFaculty = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { id } = req.params;

    const deletedFaculty = await Faculty.findByIdAndDelete(id);
    if (!deletedFaculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    res.status(200).json({ message: 'Faculty deleted successfully' });
  } catch (err) {
    console.error('Delete Faculty Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
