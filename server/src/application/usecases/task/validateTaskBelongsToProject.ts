import { Types, ClientSession } from 'mongoose';
import { TaskRepository } from '../../../infrastructure/database/repositories/task';
import { NotFoundException } from '../../../shared/utils/appError';

export const validateTaskBelongsToProject = async (
  taskId: string,
  projectId: string,
  session?: ClientSession,
) => {
  const taskRepo = new TaskRepository();
  const foundTask = await taskRepo.findById(new Types.ObjectId(taskId), session);

  if (!foundTask || foundTask.project.toString() !== projectId) {
    throw new NotFoundException('Task not found or does not belong to this project');
  }

  return foundTask;
};
