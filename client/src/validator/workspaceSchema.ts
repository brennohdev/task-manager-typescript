import { z } from 'zod';

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: 'Name is required. Please type a name.' })
  .max(255);
export const descriptionSchema = z.string().trim().optional();

export const createWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export const updateWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export const workspaceResponseSchema = z.object({
  message: z.string(),
  workspace: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    owner: z.string(),
    inviteCode: z.string(),
    updatedAt: z.string(),
  }),
});

export const workspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  owner: z.string(),
  inviteCode: z.string(),
  updatedAt: z.string(),
});

export const workspaceListResponseSchema = z.object({
  message: z.string(),
  workspaces: z.array(workspaceSchema),
});

export type Workspace = z.infer<typeof workspaceSchema>;
export type CreateWorkspacePayload = z.infer<typeof createWorkspaceSchema>;
export type CreateWorkspaceResponse = z.infer<typeof workspaceResponseSchema>;
