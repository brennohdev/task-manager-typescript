import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';
import { TaskStatusEnum, TaskPriorityEnum } from '@/domain/enums/taskEnums';

export const useTaskFilters = () => {
  return useQueryStates({
    status: parseAsStringEnum(Object.values(TaskStatusEnum)),
    priority: parseAsStringEnum(Object.values(TaskPriorityEnum)),
    assignedTo: parseAsString,
    projectId: parseAsString,
    dueDate: parseAsString,
  });
};
