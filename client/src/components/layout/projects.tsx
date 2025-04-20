import { useGetProjects } from '@/features/project/hooks/useGetProjects';
import { usePathname } from 'next/navigation';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import Link from 'next/link';
import { RiAddCircleFill } from 'react-icons/ri';
import { cn } from '@/lib/utils';
import { useCreateProjectModal } from '@/features/project/hooks/useCreateProjectModal';

interface Project {
  id: string;
  name: string;
  description: string | null;
  emoji: string | null;
  workspace: string;
  createdBy: {
    id: string;
    name: string;
    profilePicture: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export const Projects = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const { open } = useCreateProjectModal();
  const { data, isLoading, isError, error } = useGetProjects(workspaceId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-blue-950 font-semibold">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-blue-600 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {data && data.length === 0 && <div>No projects available</div>}
      {data?.map((project: Project) => {
        const href = `/workspace/${workspaceId}/project/${project.id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.id}>
            <div
              className={cn(
                'flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-90 hover:bg-slate-200 transition cursor-pointer text-blue-950',
                isActive && 'bg-slate-300 shadow-sm hover:opacity-100 text-primary',
              )}
            >
              <span className="truncate">{project.emoji}</span>
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
