import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinWorkspace } from '../repositories/joinWorkspace';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: joinWorkspace,
    onSuccess: (data) => {
      toast.success("You successfully joined the workspace!");
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      router.push(`/workspace/${data.workspaceId}`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Error joining the workspace");
    }
  });
};
