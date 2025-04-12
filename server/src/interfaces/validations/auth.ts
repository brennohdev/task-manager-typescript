import { z } from 'zod'; //zod é usado para validação de dados, ok?

export const emailSchema = z.string().trim().email('Invalid email address').min(1).max(100);

export const passwordSchema = z.string().trim().min(1).max(100);

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
