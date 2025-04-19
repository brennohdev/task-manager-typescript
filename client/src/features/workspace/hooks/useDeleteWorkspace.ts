import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWorkspace } from '../repositories/deleteWorkspace';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getUserWorkspaces } from '../repositories/getUserWorkspaces';

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (workspaceId: string) => deleteWorkspace(workspaceId),
    onSuccess: async ({ message }) => {
      toast.success(message);

      // Atualiza cache local
      await queryClient.invalidateQueries({ queryKey: ['workspaces'] });

      // Recupera nova lista de workspaces diretamente do server
      const updatedWorkspaces = await getUserWorkspaces();

      if (!updatedWorkspaces || updatedWorkspaces.length === 0) {
        router.replace('/workspace/create');
      } else {
        router.replace(`/workspace/${updatedWorkspaces[0].id}`);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete workspace.');
    },
  });
};
