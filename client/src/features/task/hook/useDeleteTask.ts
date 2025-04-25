import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteTask } from '../api/deleteTask';
import { toast } from 'sonner';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({
      taskId,
      workspaceId,
    }: {
      taskId: string;
      workspaceId: string;
      projectId: string;
    }) => deleteTask(taskId, workspaceId),

    onSuccess: (data, variables) => {
      const { workspaceId, projectId } = variables;

      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task'] });
      queryClient.invalidateQueries({ queryKey: ['project-analytics', workspaceId, projectId] });
      queryClient.invalidateQueries({ queryKey: ['workspace-analytics', workspaceId] });
      router.push(`/workspace/${workspaceId}/project/${projectId}`);
      router.refresh();
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete task');
    },
  });

  return mutation;
};
