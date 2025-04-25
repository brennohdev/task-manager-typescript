// src/features/task/hook/useTaskDetailsModal.ts
import { useQueryState, parseAsString } from 'nuqs';

export const useTaskDetailsModal = () => {
  const [taskId, setTaskId] = useQueryState('task-details', parseAsString);
  const [projectId, setProjectId] = useQueryState('project-id', parseAsString);

  const open = (taskId: string, projectId: string) => {
    setTaskId(taskId);
    setProjectId(projectId);
  };

  const close = () => {
    setTaskId(null);
    setProjectId(null);
  };

  return {
    taskId,
    projectId,
    open,
    close,
  };
};
