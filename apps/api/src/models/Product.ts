import mongoose from 'mongoose';
import { UserInterface } from './User';

export interface ProductInterface {
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  featured: boolean;
  rating: number;
  seller: UserInterface;
}

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
      values: ['electronics', 'clothing', 'footwear', 'others'],
      message: '{VALUE} is not supported',
    },
  },
  image: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 1.0,
  },
  seller: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide seller'],
  },
});

export const Product = mongoose.model<ProductInterface>(
  'Product',
  ProductSchema
);
