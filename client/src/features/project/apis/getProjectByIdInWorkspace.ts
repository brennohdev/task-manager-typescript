import { api } from '@/lib/axios';
import { getProjectByIdResponseSchema } from '@/validator/projectSchema';

export const getProjectById = async (projectId: string, workspaceId: string) => {
  const response = await api.get(`project/${projectId}/workspace/${workspaceId}`);
  const parsed = getProjectByIdResponseSchema.parse(response.data);

  return parsed.project.project;
};
