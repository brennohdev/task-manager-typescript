import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinWorkspace } from '../api/joinWorkspace';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: joinWorkspace,
    onSuccess: (data, workspaceId) => {
      toast.success('You successfully joined the workspace!');
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace-members', workspaceId] });
      router.push(`/workspace/${data.workspaceId}`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error joining the workspace');
    },
  });
};
