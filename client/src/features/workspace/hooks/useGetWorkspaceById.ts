import { useQuery } from '@tanstack/react-query';
import { getWorkspaceById } from '../api/getWorkspaceById';

export const useGetWorkspaceById = (id: string) => {
  return useQuery({
    queryKey: ['workspace', id],
    queryFn: () => getWorkspaceById(id),
    enabled: !!id, // só executa se tiver id
  });
};
