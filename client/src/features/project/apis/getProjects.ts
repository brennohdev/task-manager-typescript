import { api } from '@/lib/axios';
import { getProjectsResponseSchema } from '@/validator/projectSchema';

export const getAllProjects = async (workspaceId: string) => {
  const response = await api.get(`project/workspace/${workspaceId}/all`);
  const { projects } = response.data;

  return projects;
};
