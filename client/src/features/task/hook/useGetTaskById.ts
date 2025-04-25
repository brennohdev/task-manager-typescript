import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '../api/getTaskById';

export const useGetTask = (taskId: string, projectId: string, workspaceId: string) => {
  return useQuery({
    queryKey: ['task', taskId, projectId, workspaceId],
    queryFn: () => getTaskById(taskId, projectId, workspaceId),
    enabled: !!taskId && !!workspaceId,
  });
};
