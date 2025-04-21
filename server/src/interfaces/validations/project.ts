import { z } from 'zod';

export const emojiSchema = z.string().trim().optional();
export const nameSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();

export const projectIdSchema = z.string().trim().min(1);

export const createProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema,
});

export const updateProjectSchema = z
  .object({
    name: nameSchema.optional(),
    emoji: emojiSchema,
    description: descriptionSchema,
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });
