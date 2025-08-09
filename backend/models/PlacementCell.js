const mongoose = require('mongoose');

const placementCellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'placement-cell',
    enum: ['placement-cell']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PlacementCell = mongoose.model('PlacementCell', placementCellSchema);

module.exports = PlacementCell;
