import { ClientSession } from 'mongoose';
import { WorkspaceRepository } from '../../../infrastructure/database/repositories/workspace';

export const deleteWorkspaceById = async (workspaceId: string, session?: ClientSession) => {
  const workspaceRepository = new WorkspaceRepository();
  await workspaceRepository.delete(workspaceId, session);
};
