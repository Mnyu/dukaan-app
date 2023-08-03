interface ProductInterface {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  inStock: boolean;
  rating: number;
  seller: string;
}

interface OrderItemInterface {
  product: ProductInterface;
  quantity: number;
}

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
