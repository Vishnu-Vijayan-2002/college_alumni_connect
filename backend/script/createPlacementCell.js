require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const PlacementCell = require('../models/PlacementCell'); // Adjust path/model name if needed

async function createPlacementCellUser() {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI missing in .env");
      process.exit(1);
    }

    if (!process.env.PLACEMENT_CELL_EMAIL || !process.env.PLACEMENT_CELL_PASSWORD) {
      console.error("❌ PLACEMENT_CELL_EMAIL or PLACEMENT_CELL_PASSWORD missing in .env");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingUser = await PlacementCell.findOne({ email: process.env.PLACEMENT_CELL_EMAIL });
    if (existingUser) {
      console.log('Placement Cell user already exists.');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(process.env.PLACEMENT_CELL_PASSWORD, 10);

    const user = new PlacementCell({
      name: 'Placement Cell',
      email: process.env.PLACEMENT_CELL_EMAIL,
      password: hashedPassword,
      role: 'placement-cell',
    });

    await user.save();

    console.log('✅ Placement Cell user created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error creating Placement Cell user:', err);
    process.exit(1);
  }
}

createPlacementCellUser();
