import { useQuery } from '@tanstack/react-query';
import { getUserWorkspaces } from '../repositories/getUserWorkspaces';
import { Workspace } from '@/validator/workspaceSchema';

export const useGetWorkspaces = () => {
  return useQuery<Workspace[]>({
    queryKey: ['workspaces'] as const,
    queryFn: getUserWorkspaces,
  });
};
