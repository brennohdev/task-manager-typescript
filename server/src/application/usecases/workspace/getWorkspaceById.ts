import { WorkspaceRepository } from '../../../infrastructure/database/repositories/workspace';
import { NotFoundException } from '../../../shared/utils/appError';

export const getWorkspaceById = async (workspaceId: string) => {
  const workspaceRepo = new WorkspaceRepository();
  const workspace = await workspaceRepo.findById(workspaceId);

  if (!workspace) {
    throw new NotFoundException('Workspace not found');
  }

  return workspace;
};
