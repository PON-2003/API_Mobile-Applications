const mongoose = require('mongoose');
require('dotenv').config();

const db_url = process.env.DB_URL;

exports.connectDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log('Connected to database successfully');
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};
