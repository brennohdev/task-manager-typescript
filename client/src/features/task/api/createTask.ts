import { z } from 'zod';
import { createTaskSchema } from '@/validator/taskSchema';
import { api } from '@/lib/axios';

type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const createTask = async (
  projectId: string,
  workspaceId: string,
  data: z.infer<typeof createTaskSchema>,
) => {
  console.log('data to be validated:', data);
  const parsedData = createTaskSchema.parse(data); 

  const response = await api.post(
    `/task/project/${projectId}/workspace/${workspaceId}/create`,
    parsedData,
  );

  return response.data.task;
};
