import { BadRequestException } from '../../../shared/utils/appError';

export const verifyWorkspaceOwnership = (workspace: { owner: string }, userId: string) => {
  if (workspace.owner !== userId) {
    throw new BadRequestException('You are not authorized to delete this workspace.');
  }
};
