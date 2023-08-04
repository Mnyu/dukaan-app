import { ProductInterface } from './product';

export interface OrderItemInterface {
  product: ProductInterface;
  quantity: number;
}

export type OrderPayload = {
  orderItems: OrderItemInterface[];
  amount: number;
};

export type OrderItem = {
  product: string;
  quantity: number;
  _id: string;
};

export type Order = {
  _id: string;
  orderItems: OrderItem[];
  amount: number;
  user: string;
};
