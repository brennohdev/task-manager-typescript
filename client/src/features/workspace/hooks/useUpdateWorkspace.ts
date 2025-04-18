import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { UpdateWorkspacePayload, UpdateWorkspaceResponse } from '@/validator/workspaceSchema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateWorkspace } from '../repositories/updateWorkspace';

type UpdateWorkspaceParams = {
  id: string;
} & UpdateWorkspacePayload;

export const useUpdateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<UpdateWorkspaceResponse, any, UpdateWorkspaceParams>({
    mutationFn: ({ id, ...data }) => updateWorkspace(id, data),
    onSuccess: (data) => {
      toast.success(`Workspace "${data.workspace.name}" updated successfully!`);
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      router.refresh();
      router.push(`/workspace/${data.workspace.id}`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update workspace.');
    },
  });
};
