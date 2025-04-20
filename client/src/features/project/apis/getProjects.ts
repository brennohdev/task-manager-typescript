import { api } from '@/lib/axios';
import { getProjectsResponseSchema } from '@/validator/projectSchema';

export const getAllProjects = async (workspaceId: string) => {
  const response = await api.get(`project/workspace/${workspaceId}/all`);

  console.log('API Response:', response);  

  const { projects } = response.data;  
  console.log("Projects received:", projects)

  return projects; 
};


