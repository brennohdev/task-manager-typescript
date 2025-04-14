import { Workspace } from '../../../domain/entities/Workspace';
import { WorkspaceRepository } from '../../../infrastructure/database/repositories/workspace';
import { generateInviteCode } from '../../../shared/utils/generateInviteCode';

export const createWorkspaceForUserSignUp = async (
  userId: string,
  userName: string,
  workspaceRepository: WorkspaceRepository,
  session?: any,
): Promise<Workspace> => {
  const workspace = new Workspace(
    'My Workspace',
    `Workspace created for ${userName}`,
    userId,
    generateInviteCode(),
  );

  const savedWorkspace = await workspaceRepository.create(workspace, session);

  if (!savedWorkspace.id || !savedWorkspace.id.toString()) {
    throw new Error('Invalid workspace ID');
  }

  return savedWorkspace;
};
