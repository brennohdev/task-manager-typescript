'use client';

import { useGetProjectById } from '@/features/project/hooks/useGetProjectById';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  projectId: string;
  workspaceId: string;
}

const ProjectClient = ({ projectId, workspaceId }: Props) => {
  const { data: project, isLoading } = useGetProjectById(projectId, workspaceId);
  console.log('project', project);
  console.log('isLoading', isLoading);

  useEffect(() => {
    console.log('[ProjectClient]', { projectId, workspaceId });
  }, [projectId, workspaceId]);

  if (isLoading) return <p>Loading...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between bg-slate-100 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-x-3">
          <div className="text-3xl">{project.emoji}</div>
          <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            {project.name}
            {project.description && (
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">{project.description}</p>
            )}
          </h1>
        </div>

        <div className="flex gap-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/workspace/${workspaceId}/project/${project._id}/settings`}>
            <PencilIcon />
            Edit
            </Link>
          </Button>
          <Button variant="destructive" size="sm">
            <TrashIcon className='size-6'/>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectClient;
