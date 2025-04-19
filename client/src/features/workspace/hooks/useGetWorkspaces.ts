import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserWorkspaces } from '../api/getUserWorkspaces';
import { Workspace } from '@/validator/workspaceSchema';

export const useGetWorkspaces = () => {
  return useQuery<Workspace[]>({
    queryKey: ['workspaces'] as const,
    queryFn: getUserWorkspaces,
  });
};
