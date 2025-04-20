import { createProjectSchema } from '@/validator/projectSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { createProject } from '../apis/createProject';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useCreateProject = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (projectData: z.infer<typeof createProjectSchema>) =>
      createProject(workspaceId, projectData),
    onSuccess: (data) => {
      console.log('Project created successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully.');

      router.push(`/workspace/${workspaceId}/project/${data.id}`)
      router.refresh();
    },
    onError: (error) => {
      console.error("Erro ao criar projeto:", error);
      toast.error('Failed to create project. Please, try again.');
    },
  });
};
