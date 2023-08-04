import { z } from 'zod';

export const registerUserProps = z.object({
  firstName: z.string().min(1).max(25).nonempty(),
  lastName: z.string().min(1).max(25).nonempty(),
  email: z.string().email().max(50).nonempty(),
  password: z.string().min(1).max(20).nonempty(),
  role: z.enum(['admin', 'user']).optional(),
});

export const loginUserProps = z.object({
  email: z.string().email().max(50).nonempty(),
  password: z.string().min(1).max(20).nonempty(),
});
