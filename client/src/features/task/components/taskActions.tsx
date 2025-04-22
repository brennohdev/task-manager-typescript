import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit2Icon, ExternalLinkIcon, Trash2Icon } from 'lucide-react';
import { useDeleteTask } from '../hook/useDeleteTask';
import { useConfirm } from '@/hook/modals/useConfirm';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { useRouter } from 'next/navigation';

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete task',
    'This action cannot be undone.',
    'destructive',
  );

  const { mutate, isPending } = useDeleteTask();

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate({
      taskId: id,
      workspaceId,
    });
  };

  const onOpenTask = () => {
    router.push(`/workspace/${workspaceId}/task/${id}`);
  };

  return (
    <>
      <div className="flex justify-end">
        <ConfirmDialog />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onOpenTask} className="font-medium p-[10px]">
              <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
              Task Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}} className="font-medium p-[10px]">
              <Edit2Icon className="size-4 mr-2 stroke-2" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={isPending}
              className="text-red-600 focus:text-red-600 font-medium p-[10px]"
            >
              <Trash2Icon className="size-4 mr-2 stroke-2" />
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
