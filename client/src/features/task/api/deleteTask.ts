import { api } from '@/lib/axios';

export const deleteTask = async (
  taskId: string,
  workspaceId: string,
): Promise<{ message: string }> => {
  const response = await api.delete(`/task/${taskId}/workspace/${workspaceId}/delete`);

  return response.data;
};
