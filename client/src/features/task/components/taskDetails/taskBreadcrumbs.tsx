import { Button } from '@/components/ui/button';
import { useProjectId } from '@/features/project/hooks/useProjectId';
import { useDeleteTask } from '@/features/task/hook/useDeleteTask';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { useConfirm } from '@/hook/modals/useConfirm';
import { getProjectByIdResponseSchema } from '@/validator/projectSchema';
import { getTaskByIdResponseSchema } from '@/validator/taskSchema';
import { ChevronRightIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

type Project = z.infer<typeof getProjectByIdResponseSchema>['project']['project'];
type Task = z.infer<typeof getTaskByIdResponseSchema>['task'];

interface TaskBreadcrumbsProps {
  project: Project;
  task: Task;
}

export const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumbsProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const taskId = task.id;

  const { mutate, isPending } = useDeleteTask();
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete Task',
    'This action cannot be undone',
    'destructive',
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate(
      { taskId, workspaceId, projectId },
      {
        onSuccess: () => {
          toast.success('Task successfully deleted.');
          router.push(`/workspace/${workspaceId}/tasks`);
        },
      },
    );
  };

  return (
    <div className="w-full bg-muted/40 rounded-2xl px-4 py-3 border-b shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <ConfirmDialog />
      <div className="flex items-center gap-3 overflow-x-auto">
        <div className="text-xl lg:text-2xl transition-transform hover:scale-110">
          {project.emoji}
        </div>

        <Link
          href={`/workspace/${workspaceId}/project/${project._id}`}
          className="text-muted-foreground hover:text-primary transition-colors font-medium text-base lg:text-lg whitespace-nowrap"
        >
          {project.name}
        </Link>

        <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />

        <span className="font-semibold text-base lg:text-lg whitespace-nowrap">{task.title}</span>
      </div>

      <Button
        onClick={handleDeleteTask}
        disabled={isPending}
        className="flex items-center gap-1 text-sm w-full sm:w-auto justify-center"
        variant="destructive"
        size="sm"
      >
        <TrashIcon className="size-4 text-white" />
        <span className="text-white">Delete</span>
      </Button>
    </div>
  );
};
