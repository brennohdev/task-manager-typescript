import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWorkspace } from '../api/deleteWorkspace';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getUserWorkspaces } from '../api/getUserWorkspaces';

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (workspaceId: string) => deleteWorkspace(workspaceId),
    onSuccess: async ({ message }) => {
      toast.success(message);

      await queryClient.invalidateQueries({ queryKey: ['workspaces'] });

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
