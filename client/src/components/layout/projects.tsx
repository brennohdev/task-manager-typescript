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

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading...</div>;
  if (isError) return <div className="text-sm text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-y-1">
      {/* Title and Add Button */}
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] uppercase tracking-wide text-gray-600 font-medium">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-4 text-c cursor-pointer hover:opacity-80 transition"
        />
      </div>

      {/* Empty State */}
      {data && data.length === 0 && (
        <p className="text-xs text-gray-500">No projects yet.</p>
      )}

      {/* Projects List */}
      {data?.map((project: Project) => {
        const href = `/workspace/${workspaceId}/project/${project.id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.id}>
            <div
              className={cn(
                'flex items-center gap-2 p-2 rounded-md text-sm text-gray-800 hover:bg-gray-200 transition',
                isActive && 'bg-gray-300 font-semibold text-cyan-700 shadow-inner'
              )}
              title={project.name}
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
