import { api } from '@/lib/axios';
import { createProjectResponseSchema, createProjectSchema } from '@/validator/projectSchema';
import { z } from 'zod';

export const createProject = async (
  workspaceId: string,
  projectData: z.infer<typeof createProjectSchema>,
) => {
  const response = await api.post(`/project/workspace/${workspaceId}/create`, projectData);
  const parsed = createProjectResponseSchema.parse(response.data);

  return parsed.project;
};
