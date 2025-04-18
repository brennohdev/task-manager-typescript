import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { createWorkspace } from '../repositories/createWorkspace';
import { CreateWorkspacePayload } from '@/validator/workspaceSchema';
import { toast } from 'sonner';

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkspacePayload) => createWorkspace(data),
    onSuccess: (data) => {
      toast.success(`Workspace "${data.workspace.name}" created successfully!`);
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create workspace');
    },
  });
};
