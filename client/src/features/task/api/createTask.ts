import { api } from '@/lib/axios';
import { createTaskResponseSchema } from '@/validator/taskSchema';

export const createTask = async (projectId: string, workspaceId: string) => {
  const response = await api.post(`task/project/${projectId}/workspace/${workspaceId}/create`);
  const parsed = createTaskResponseSchema.parse(response.data);

  return parsed.task;
};
