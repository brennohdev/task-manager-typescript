import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteTask } from '../api/deleteTask';
import { toast } from 'sonner';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ taskId, workspaceId }: { taskId: string; workspaceId: string }) =>
      deleteTask(taskId, workspaceId),

    onSuccess: (data) => {
      toast.success(data.message);

      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task'] });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete task');
    },
  });

  return mutation;
};
