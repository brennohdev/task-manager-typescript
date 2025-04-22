import { api } from '@/lib/axios';
import { getTaskByIdResponseSchema } from '@/validator/taskSchema';

export const getTaskById = async (taskId: string, projectId: string, workspaceId: string) => {
  const response = await api.get(`/task/${taskId}/project/${projectId}/workspace/${workspaceId}`);
  const parsed = getTaskByIdResponseSchema.parse(response.data);

  return parsed.task;
};
