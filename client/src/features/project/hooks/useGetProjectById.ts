import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjectById } from '../apis/getProjectByIdInWorkspace';

export const useGetProjectById = (projectId: string, workspaceId: string) => {
  console.log('🧠 useGetProjectById Hook Called:', { projectId, workspaceId });
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId, workspaceId),
    enabled: !!projectId && !!workspaceId,
  });
};
