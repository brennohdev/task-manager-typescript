'use client';

import { useGetProjectById } from '@/features/project/hooks/useGetProjectById';
import { useState } from 'react';
import { Button } from '../ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import ErrorPage from '../../app/error';
import { useConfirm } from '@/hook/modals/useConfirm';
import { useDeleteProject } from '@/features/project/hooks/useDeleteProject';
import { TaskViewSwitcher } from '@/features/task/components/taskViewSwitcher';

interface Props {
  projectId: string;
  workspaceId: string;
}

const ProjectClient = ({ projectId, workspaceId }: Props) => {
  const { data: project, isLoading } = useGetProjectById(projectId, workspaceId);
  const { mutate: deleteProject } = useDeleteProject(workspaceId);

  const [ConfirmDialog, confirmDelete] = useConfirm(
    'Are you sure?',
    'Do you really want to delete this project? This action is irreversible.',
    'destructive',
  );

  const handleDelete = async () => {
    const confirmed = await confirmDelete(); // Aqui o confirmDelete vai abrir a modal e retornar um booleano
    if (confirmed) {
      deleteProject(projectId);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!project) return <ErrorPage />;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-transparent p-4 rounded-2xl shadow-sm   dark:border-zinc-800">
          <div className="flex items-center gap-x-3 mb-4 sm:mb-0">
            <div className="text-3xl">{project.emoji}</div>
            <h1 className="text-xl font-semibold text-zinc-800 ">
              {project.name}
              {project.description && (
                <p className="text-zinc-500  text-sm mt-1">
                  {project.description}
                </p>
              )}
            </h1>
            
          </div>

          <div className="flex gap-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/workspace/${workspaceId}/project/${project._id}/update`}>
                <PencilIcon />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <TrashIcon className="w-6 h-6" />
              Delete
            </Button>
          </div>
        </div>

        {/* Modal de Confirmação */}
        <ConfirmDialog />
      </div>
      <div>
      <TaskViewSwitcher />
      </div>
    </div>
  );
};

export default ProjectClient;
