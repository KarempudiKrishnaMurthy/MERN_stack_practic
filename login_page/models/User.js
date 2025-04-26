// const mongoose = require('mongoose')

// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     loginTimestamps: [{ type: Date }],
//     logoutTimestamps: [{ type: Date }]
// });

// module.exports = mongoose.model('User', UserSchema);
// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  blockName: { type: String, required: true },
  flatNumber: { type: String, required: true },
  password: { type: String, required: true },
  alternatePhone: { type: String },
  socialLinks: {
    linkedin: { type: String },
    instagram: { type: String },
  },
  profilePhoto: { type: String },
  dateOfBirth: { type: Date },
  occupation: { type: String },
  vehicleDetails: { type: String },
  emergencyContact: {
    name: { type: String },
    phone: { type: String },
  },
  hasPet: { type: Boolean, default: false },
  petDetails: { type: String },
  aboutMe: { type: String },
  hobbies: { type: [String] },
  preferredLanguage: { type: String },
  
  // Important fields for login tracking
  loginTimestamps: {
    type: [Date],
    default: []
  },
  logoutTimestamps: {
    type: [Date],
    default: []
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
