import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjectById } from '../apis/getProjectByIdInWorkspace';

export const useGetProjectById = (projectId: string, workspaceId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId, workspaceId),
    enabled: !!projectId && !!workspaceId,
    refetchOnWindowFocus: true,
  });
};
