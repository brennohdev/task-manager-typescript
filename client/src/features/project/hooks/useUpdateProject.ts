import { createProjectSchema } from '@/validator/projectSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { updateProject } from '../apis/updateProject';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useUpdateProject = (projectId: string, workspaceId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: z.infer<typeof createProjectSchema>) =>
      updateProject({ projectId, workspaceId, data }),
    onSuccess: () => {
      toast.success(`The project was successfully updated! `);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId, workspaceId] });
      router.push(`/workspace/${workspaceId}/project/${projectId}`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update project.');
    },
  });
};
