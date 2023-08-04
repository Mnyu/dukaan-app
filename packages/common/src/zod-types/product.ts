import { z } from 'zod';

export const createProductProps = z.object({
  name: z.string().min(3).max(50).nonempty(),
  description: z.string().min(1).max(2000).nonempty(),
  category: z.enum(['electronics', 'clothing', 'footwear', 'others']),
  image: z.string().max(200).default(''),
  price: z.number().positive(),
  inStock: z.boolean().default(true),
  rating: z.number().positive().default(1.0),
});

export const updateProductProps = z.object({
  name: z.string().min(3).max(50).optional(),
  description: z.string().min(1).max(2000).optional(),
  category: z
    .enum(['electronics', 'clothing', 'footwear', 'others'])
    .optional(),
  image: z.string().max(200).default('').optional(),
  price: z.number().positive().optional(),
  inStock: z.boolean().default(true).optional(),
  rating: z.number().positive().default(1.0).optional(),
});
