"use client"

import { useGetProjectById } from '@/features/project/hooks/useGetProjectById';
import { useState } from 'react';
import { Button } from '../ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import ErrorPage from '../../app/error';
import { useConfirm } from '@/hook/modals/useConfirm';
import { useDeleteProject } from '@/features/project/hooks/useDeleteProject';
import { TaskViewSwitcher } from '@/features/task/components/taskViewSwitcher';
import { useGetProjectAnalytics } from '@/features/project/hooks/useGetProjectAnalytics';
import { Analytics } from '../layout/analytics';
import ProgressBar from '../analytics/progressBar';

interface Props {
  projectId: string;
  workspaceId: string;
}

const ProjectClient = ({ projectId, workspaceId }: Props) => {
  const { data: project, isLoading: isLoadingProject } = useGetProjectById(projectId, workspaceId);
  const { mutate: deleteProject } = useDeleteProject(workspaceId);
  const { data: analytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics(
    projectId,
    workspaceId,
  );

  const isLoading = isLoadingAnalytics || isLoadingProject;

  const [ConfirmDialog, confirmDelete] = useConfirm(
    'Are you sure?',
    'Do you really want to delete this project? This action is irreversible.',
    'destructive',
  );

  const handleDelete = async () => {
    const confirmed = await confirmDelete();
    if (confirmed) {
      deleteProject(projectId);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!project) return <ErrorPage />;

  const completedPercentage = analytics ? Math.round((analytics.completedTasks / analytics.totalTasks) * 100) : 0;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-transparent p-4 rounded-2xl shadow-sm dark:border-zinc-800">
          <div className="flex items-center gap-x-3 mb-4 sm:mb-0">
            <div className="text-3xl">{project.emoji}</div>
            <h1 className="text-xl font-semibold text-zinc-800">
              {project.name}
              {project.description && (
                <p className="text-zinc-500 text-sm mt-1">{project.description}</p>
              )}
            </h1>
          </div>

          <ProgressBar value={completedPercentage} label="Project Progress" />

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

        <ConfirmDialog />
      </div>
      <div>
        <Analytics data={analytics} />
        <TaskViewSwitcher />
      </div>
    </div>
  );
};

export default ProjectClient;
