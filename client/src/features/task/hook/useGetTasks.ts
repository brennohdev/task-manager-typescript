import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/getAllProjects';

export const useGetTasks = (
  workspaceId: string,
  projectId: string,
  filters = {},
  pagination = { pageSize: 10, pageNumber: 1 },
) => {
  return useQuery({
    queryKey: ['tasks', workspaceId, projectId, filters, pagination],
    queryFn: () => getTasks(workspaceId, projectId, filters, pagination),
    enabled: !!workspaceId && !!projectId,
  });
};
