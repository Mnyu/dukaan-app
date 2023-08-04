import { OrderItemInterface } from '../ts-types/order';

export const getTotals = (cart: Map<string, OrderItemInterface>) => {
  let totalItems = 0;
  let totalCost = 0;
  for (let { quantity, product } of cart.values()) {
    const { price } = product;
    totalItems += quantity;
    totalCost += quantity * price;
  }
  return { totalItems, totalCost };
};
