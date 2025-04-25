'use client';

import { useGetProjects } from '@/features/project/hooks/useGetProjects';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { PageLoader } from '../pageLoader';
import Link from 'next/link';
import { DottedSeparator } from '../separator';
import { Button } from '../ui/button';

export const ProjectList = () => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading } = useGetProjects(workspaceId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-muted rounded-lg p-4">
        <p className="text-lg font-semibold">Projects ({projects.length})</p>
        <DottedSeparator className='my-4' />
        <p className="text-sm text-muted-foreground text-center">No projects found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Projects ({projects.length})</p>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="flex flex-col divide-y divide-muted-foreground/10">
          {projects.slice(0, 5).map((project: { id: string; name: string; emoji: string }) => (
            <li key={project.id}>
              <Link
                href={`/workspace/${workspaceId}/project/${project.id}`}
                className="block py-2 px-1 hover:bg-muted/50 rounded transition"
              >
                <p className="text-sm font-medium truncate">
                  {project.emoji} {project.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
