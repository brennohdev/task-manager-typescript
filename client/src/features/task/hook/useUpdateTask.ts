import { updateTaskSchema } from '@/validator/taskSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { updateTask } from '../api/updateTask';
import { toast } from 'sonner';

export const useUpdateTask = (taskId: string, workspaceId: string, projectId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: z.infer<typeof updateTaskSchema>) =>
      updateTask({ taskId, workspaceId, projectId, data }),
    onSuccess: () => {
      toast.success('The task was successfully updated!');
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId, workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['task', projectId, workspaceId] });
      router.push(`/workspace/${projectId}/project/${workspaceId}`);

      // Forçar refetch da query de tarefas após a invalidação
      queryClient.refetchQueries({ queryKey: ['tasks', workspaceId, projectId] });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update task.');
    },
  });
};
