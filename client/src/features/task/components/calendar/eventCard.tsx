import {
  TaskPriorityEnum,
  TaskPriorityEnumType,
  TaskStatusEnum,
  TaskStatusEnumType,
} from '@/domain/enums/taskEnums';
import { MemberAvatar } from '@/features/member/components/memberAvatar';
import { useProjectId } from '@/features/project/hooks/useProjectId';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface EventCardProps {
  title: string;
  assignedTo: any;
  status: TaskStatusEnumType;
  priority: TaskPriorityEnumType;
  id: string;
}

const statusColorMap: Record<TaskStatusEnumType, string> = {
  [TaskStatusEnum.BACKLOG]: 'border-l-gray-300',
  [TaskStatusEnum.TODO]: 'border-l-rose-400',
  [TaskStatusEnum.IN_PROGRESS]: 'border-l-emerald-400',
  [TaskStatusEnum.IN_REVIEW]: 'border-l-amber-200',
  [TaskStatusEnum.DONE]: 'border-l-sky-400',
};

const priorityColorMap: Record<TaskPriorityEnumType, string> = {
  [TaskPriorityEnum.LOW]: 'border-t-sky-200',
  [TaskPriorityEnum.MEDIUM]: 'border-t-sky-600',
  [TaskPriorityEnum.HIGH]: 'border-t-rose-500',
};

export const EventCard = ({ title, assignedTo, status, priority, id }: EventCardProps) => {
  const projectId = useProjectId();
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    router.push(`/workspace/${workspaceId}/project/${projectId}/task/${id}`);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          'p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 border-b-4 border-t-8 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition',
          statusColorMap[status],
          priorityColorMap[priority],
        )}
      >
        <p>{title}</p>
      </div>
    </div>
  );
};
