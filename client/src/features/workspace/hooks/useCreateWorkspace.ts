import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { createWorkspace } from '../repositories/createWorkspace';
import { CreateWorkspacePayload } from '@/validator/workspaceSchema';
import { toast } from 'sonner';
import { redirect, useRouter } from 'next/navigation';

export const useCreateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkspacePayload) => createWorkspace(data),
    onSuccess: (data) => {
      toast.success(`Workspace "${data.workspace.name}" created successfully!`);
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      router.push(`/workspace/${data.workspace.id}`)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create workspace');
    },
  });
};
