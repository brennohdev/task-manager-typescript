import { z } from 'zod';

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: 'Name is required. Please type a name.' })
  .max(255);
export const descriptionSchema = z.string().trim().optional();

export const workspaceIdSchema = z.string().trim().min(1, {message: "Worskáde ID is required."})


export const createWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export const updateWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});
