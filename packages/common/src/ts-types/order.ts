import { ProductInterface } from './product';

export interface OrderItemInterface {
  product: ProductInterface;
  quantity: number;
}

export type OrderPayload = {
  orderItems: OrderItemInterface[];
  amount: number;
};
