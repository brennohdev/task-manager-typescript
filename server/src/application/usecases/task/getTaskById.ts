import { ITaskRepository } from '../../../domain/repositories/task';
import { TaskRepository } from '../../../infrastructure/database/repositories/task';

export const getTaskByIdWithDetailsUseCase = async (
  taskId: string,
  projectId: string,
  workspaceId: string,
  taskRepository: TaskRepository,
) => {
  const task = await taskRepository.findByIdWithDetails(taskId, projectId, workspaceId);
  return task;
};
