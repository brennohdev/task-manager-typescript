import { DottedSeparator } from '@/components/separator';
import { Button } from '@/components/ui/button';
import { getTaskByIdResponseSchema } from '@/validator/taskSchema';
import { PencilIcon } from 'lucide-react';
import { z } from 'zod';
import { OverviewProperty } from './taskOverview';
import { MemberAvatar } from '@/features/member/components/memberAvatar';
import { TaskDate } from '../taskDate';
import { Badge } from '@/components/ui/badge';
import { snakeCaseToTitleCase } from '@/util/snakeCaseToTitleCase';
import { TaskPriorityEnumType, TaskStatusEnumType } from '@/domain/enums/taskEnums';
import { useUpdateTaskModal } from '../../hook/useUpdateTaskModal';

type Task = z.infer<typeof getTaskByIdResponseSchema>['task'];

interface TaskDetailsProps {
  task: Task;
}

export const TaskDetails = ({ task }: TaskDetailsProps) => {
    const { open } = useUpdateTaskModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1 bg-background rounded-2xl shadow-md p-6 border transition-all duration-300">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Task's Details</p>
          <Button onClick={()=> open(task.id)} size="sm" variant="secondary">
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate!} classname="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status as TaskStatusEnumType}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
          <OverviewProperty label="Priority">
            <Badge variant={task.priority as TaskPriorityEnumType}>
              {snakeCaseToTitleCase(task.priority)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};
