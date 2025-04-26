import { api } from '@/lib/axios';
import { taskUpdateResponseSchema, updateTaskSchema } from '@/validator/taskSchema';
import { z } from 'zod';

export const updateTask = async ({
  taskId,
  workspaceId,
  projectId,
  data,
}: {
  taskId: string;
  projectId: string;
  workspaceId: string;
  data: z.infer<typeof updateTaskSchema>;
}) => {

  const response = await api.put(
    `/task/${taskId}/project/${workspaceId}/workspace/${projectId}/update`,
    data,
  );

  const parsed = taskUpdateResponseSchema.parse(response.data);

  return parsed.task;
};
