import { z } from 'zod';

export const emailSchema = z.string().trim().min(1).max(100);

export const passwordSchema = z.string().trim().min(8).max(100);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: emailSchema,
  password: passwordSchema,
});

export const loginResponseSchema = z.object({
  message: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    profilePicture: z.string().nullable(),
    isActive: z.boolean(),
    lastLogin: z.string().nullable(),
    currentWorkspace: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});


export const registerResponseSchema = z.object({
  message: z.string(),
});

export type LoginPayload = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
