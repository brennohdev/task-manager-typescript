import { api } from '@/lib/axios';

export const deleteProject = async (projectId: string, workspaceId: string): Promise <{message: string}> => {
  const response = await api.delete(`project/${projectId}/workspace/${workspaceId}/delete`);

  return response.data;
};
