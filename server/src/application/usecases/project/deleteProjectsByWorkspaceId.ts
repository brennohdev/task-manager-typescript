import { Types, ClientSession } from 'mongoose';
import { ProjectRepository } from '../../../infrastructure/database/repositories/project';

export const deleteProjectByWorkspaceId = async (workspaceId: string, session?: ClientSession) => {
  if (!Types.ObjectId.isValid(workspaceId)) {
    throw new Error('Invalid workspace ID');
  }

  const projectRepository = new ProjectRepository();
  const objectId = new Types.ObjectId(workspaceId);
  await projectRepository.deleteManyByWorkspaceId(objectId, session);
};