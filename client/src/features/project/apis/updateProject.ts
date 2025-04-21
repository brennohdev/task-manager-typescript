import { api } from '@/lib/axios';
import { createProjectSchema, updateProjectResponseSchema } from '@/validator/projectSchema';
import { z } from 'zod';

export const updateProject = async ({
  projectId,
  workspaceId,
  data,
}: {
  projectId: string;
  workspaceId: string;
  data: z.infer<typeof createProjectSchema>;
}) => {
  const response = await api.put(`/project/${projectId}/workspace/${workspaceId}/update`, data);
  const parsed = updateProjectResponseSchema.parse(response.data);

  return parsed.updatedProject.project;
};
