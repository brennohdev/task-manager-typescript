import { useQuery } from '@tanstack/react-query';
import { getWorkspaceAnalytics } from '../api/getWorkspaceAnalytics';

export const useGetWorkspaceAnalytics = (workspaceId: string) => {
  return useQuery({
    queryKey: ['workspace-analytics', workspaceId],
    queryFn: () => getWorkspaceAnalytics(workspaceId),
    enabled: !!workspaceId,
  });
};
