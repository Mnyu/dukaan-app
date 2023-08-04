import { z } from 'zod';

const orderItemProps = z.object({
  product: z.string().max(24).nonempty(),
  quantity: z.number().positive().lte(500),
});

export const createOrderProps = z.object({
  orderItems: z.array(orderItemProps).nonempty(),
  amount: z.number().positive().lte(1000000),
});
