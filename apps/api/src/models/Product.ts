import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minLength: 3,
    maxLength: 50,
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    minLength: 1,
    maxLength: 2000,
  },
  category: {
    type: String,
    enum: {
      values: ['Electronics', 'Clothing', 'Footwear', 'Others'],
      message: '{VALUE} is not supported',
    },
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
  },
  featured: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 1.0,
  },
});
