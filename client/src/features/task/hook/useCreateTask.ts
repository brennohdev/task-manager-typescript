import { z } from 'zod';
import { createTaskSchema } from '@/validator/taskSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createTask } from '../api/createTask';
import { toast } from 'sonner';

type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const useCreateTask = (projectId: string, workspaceId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateTaskInput) => createTask(projectId, workspaceId, data),
    onSuccess: (task) => {
      ['tasks', 'projects', 'project'].forEach((key) => {
        queryClient.invalidateQueries({
          queryKey: [key, workspaceId, projectId],
        });
      });
      toast.success('Task successfully created!');
      router.push(`/workspace/${task.workspace}/project/${task.project}`);
      router.refresh();
    },
    onError: (error) => {
      toast.error('Error creating task.');
      console.error(error);
    },
  });
};
