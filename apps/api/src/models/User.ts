import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    minLength: 1,
    maxLength: 25,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    minLength: 1,
    maxLength: 25,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
    unique: true, // creates a unique index
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: 6,
  },
});

// Mongoose middleware
UserSchema.pre('save', async function () {
  //hashing
  const salt = await bcrypt.genSalt(10);
  if (this.password) {
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Mongoose schema instance methods
UserSchema.methods.createJWT = function (
  jwtSecret: string,
  jwtLifeTime: string
) {
  // process.env.JWT_SECRET
  // process.env.JWT_LIFETIME;
  return jwt.sign({ userId: this._id }, jwtSecret, { expiresIn: jwtLifeTime });
};

// Mongoose schema instance methods
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export const User = mongoose.model('User', UserSchema);
