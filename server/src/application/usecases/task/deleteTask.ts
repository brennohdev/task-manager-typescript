import mongoose from 'mongoose';
import { TaskRepository } from '../../../infrastructure/database/repositories/task';
import { NotFoundException, UnauthorizedException } from '../../../shared/utils/appError';

export const deleteTask = async (
  workspaceId: string,
  taskId: string,
  userId: string
) => {
  const taskRepository = new TaskRepository();

  const taskObjectId = new mongoose.Types.ObjectId(taskId);
  const workspaceObjectId = new mongoose.Types.ObjectId(workspaceId);
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const task = await taskRepository.findById(taskObjectId);

  if (!task || task.workspace.toString() !== workspaceObjectId.toString()) {
    throw new NotFoundException('Task not found or does not belong to this workspace');
  }

  if (task.createdBy.toString() !== userObjectId.toString()) {
    throw new UnauthorizedException('Only the creator of the task can delete it');
  }

  await taskRepository.delete(taskObjectId);
};