import { ClientSession, Types } from 'mongoose';
import { TaskRepository } from '../../../infrastructure/database/repositories/task';

export const deleteTaskByWorkspaceId = async (workspaceId: string, session?: ClientSession) => {
  const taskRepository = new TaskRepository();
  const objectId = new Types.ObjectId(workspaceId);
  await taskRepository.deleteManyByWorkspaceId(objectId, session);
};
