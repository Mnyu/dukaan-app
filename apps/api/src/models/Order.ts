import mongoose from 'mongoose';
import { ProductInterface } from './Product';
import { UserInterface } from './User';

export interface OrderItemInterface {
  product: ProductInterface;
  quantity: number;
}

export interface OrderInterface {
  orderItems: OrderItemInterface[];
  amount: number;
  user: UserInterface;
}

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide product'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
  },
});

const OrderSchema = new mongoose.Schema({
  orderItems: {
    type: [OrderItemSchema],
    required: [true, 'Please provide order items'],
  },
  amount: {
    type: Number,
    required: [true, 'Please provide amount'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
});

export const Order = mongoose.model<OrderInterface>('Order', OrderSchema);
