import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteProject } from '../apis/deleteProject';
import { toast } from 'sonner';

export const useDeleteProject = (workspaceId: string) => {
  const queryCliet = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId, workspaceId),
    onSuccess: async ({ message }) => {
      toast.success(message);

      await queryCliet.invalidateQueries({ queryKey: ['projects', workspaceId] });

      router.push(`/workspace/${workspaceId}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete project.');
    },
  });
};
