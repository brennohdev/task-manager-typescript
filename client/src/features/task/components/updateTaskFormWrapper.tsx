'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useWorkspaceMembers } from '@/features/member/hooks/useGetMembersInWorkspace';
import { useGetProjects } from '@/features/project/hooks/useGetProjects';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { getProjectsResponseSchema } from '@/validator/projectSchema';
import { Loader } from 'lucide-react';
import { z } from 'zod';
import { CreateTaskForm } from './createTaskForm';
import { usePathname } from 'next/navigation';
import { useGetTask } from '../hook/useGetTaskById';
import { UpdateTaskForm } from './updateTaskForm';

interface UpdateTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
}
type Project = z.infer<typeof getProjectsResponseSchema>['projects'][number];

export const UpdateTaskFormWrapper = ({ onCancel, id }: UpdateTaskFormWrapperProps) => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const projectId = pathname.split('/').pop();

  const { data: initialValues, isLoading: isLoadingTask } = useGetTask(
    id, // taskId
    projectId || '', // projectId extraído da URL
    workspaceId, // workspaceId do hook
  );
  const { data: projectsData, isLoading: isLoadingProjects } = useGetProjects(workspaceId);
  const { data: membersData, isLoading: isLoadingMembers } = useWorkspaceMembers(workspaceId);

  const projectOptions =
    (projectsData as Project[])?.map((project) => ({
      id: project.id,
      name: project.name,
      emoji: project.emoji ?? '',
    })) ?? [];

  const memberOptions =
    membersData?.map((member) => ({
      id: member._id,
      name: member.userId.name,
    })) ?? [];

    if (!initialValues) {
      return (
        <Card className="w-full h-[714px] border-none shadow-none">
          <CardContent className="flex items-center justify-center h-full">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      );
    }

    const normalizedInitialValues = {
      ...initialValues,
      assignedTo: initialValues.assignedTo?._id ?? null,
    };

  const isLoading = isLoadingProjects || isLoadingMembers;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!projectId) {
    throw new Error('Project ID is missing in the URL.');
  }

  

  console.log('Project ID:', projectId);
  console.log('Workspace ID:', workspaceId);

  return (
    <UpdateTaskForm
      onCancel={onCancel}
      initialValues={normalizedInitialValues}
      projectOptions={projectOptions}
      memberOptions={memberOptions}
      projectId={projectId}
      workspaceId={workspaceId}
    />
  );
};
