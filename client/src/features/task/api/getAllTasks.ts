import { api } from '@/lib/axios';
import { getAllTasksResponseSchema } from '@/validator/taskSchema';

export const getTasks = async (
  workspaceId: string,
  projectId?: string,
  filters: any = {},
  pagination: any = { pageSize: 10, pageNumber: 1 },
) => {
  const response = await api.get(`/task/workspace/${workspaceId}/all`, {
    params: {
      projectId,
      ...filters,
      pageSize: pagination.pageSize,
      pageNumber: pagination.pageNumber,
    },
  });

  const parsed = getAllTasksResponseSchema.parse(response.data);
  return parsed.result;
};
