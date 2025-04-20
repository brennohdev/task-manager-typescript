import { api } from '@/lib/axios';
import { z } from 'zod';

export const emojiSchema = z.string().trim().optional();
export const nameSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();

export const projectIdSchema = z.string().trim().min(1);

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  emoji: z.string().nullable(),
  workspace: z.string(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const projectSchemaForGetProject = z.object({
  _id: z.string(), // <- pega como vem do backend
  name: z.string(),
  description: z.string().nullable().or(z.string()), // previne erro se vier como string vazia
  emoji: z.string().nullable().or(z.string()),
  workspace: z.string(),
  createdBy: z.object({
    _id: z.string(),
    name: z.string(),
    profilePicture: z.string().nullable(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});


export const createProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema,
});

export const createProjectResponseSchema = z.object({
  message: z.string(),
  project: projectSchema,
});

export const getProjectsResponseSchema = z.object({
  message: z.string(),
  projects: z.array(projectSchema),
  pagination: z.object({
    totalCount: z.number(),
    pageSize: z.number(),
    pageNumber: z.number(),
    totalPages: z.number(),
    skip: z.number(),
    limit: z.number(),
  }),
});

export const getProjectByIdResponseSchema = z.object({
  message: z.string(),
  project: z.object({
    project: projectSchemaForGetProject,
  }),
});
