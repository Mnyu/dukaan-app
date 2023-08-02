import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createJWT: (jwtSecret: string, jwtLifeTime: string) => string;
  comparePassword: (candidatePassword: string) => boolean;
}

const UserSchema = new mongoose.Schema<UserInterface>({
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
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'Role not supported',
    },
    default: 'user',
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

export const User = mongoose.model<UserInterface>('User', UserSchema);
