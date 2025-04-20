import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '../apis/getProjects';

export const useGetProjects = (workspaceId: string) => {
  console.log('Fetching projects for workspaceId:', workspaceId);  // Verificando workspaceId
  return useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: () => getAllProjects(workspaceId),
    enabled: !!workspaceId,
  });
};
