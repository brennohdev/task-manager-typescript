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
  console.log('Data being sent:', data); // Verifique os dados enviados na requisição
  console.log('workspaceId:', workspaceId);

  const response = await api.put(
    `/task/${taskId}/project/${workspaceId}/workspace/${projectId}/update`,
    data,
  );
  console.log('Sending request to:', response);

  const parsed = taskUpdateResponseSchema.parse(response.data);

  return parsed.task;
};
