import { useQuery } from '@tanstack/react-query';
import { getMembersDetails } from '../apis/getMembersInWorkspace';

export const useWorkspaceMembers = (workspaceId: string) => {
  return useQuery({
    queryKey: ['workspace-members', workspaceId],
    queryFn: () => getMembersDetails(workspaceId),
    enabled: !!workspaceId,
  });
};
