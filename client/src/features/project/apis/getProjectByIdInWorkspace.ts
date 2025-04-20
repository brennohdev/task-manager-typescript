import { api } from '@/lib/axios';
import { getProjectByIdResponseSchema } from '@/validator/projectSchema';

export const getProjectById = async (projectId: string, workspaceId: string) => {
  console.log('🚀 Calling API for Project:', { projectId, workspaceId });
  console.log('projectId', projectId);
  console.log('workspaceId', workspaceId);


  const response = await api.get(`project/${projectId}/workspace/${workspaceId}`);
  console.log('API Response:', response);
  const parsed = getProjectByIdResponseSchema.parse(response.data);

  return parsed.project.project;
};
