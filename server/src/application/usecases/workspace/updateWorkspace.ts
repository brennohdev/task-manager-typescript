import { ClientSession } from 'mongoose';
import { WorkspaceRepository } from '../../../infrastructure/database/repositories/workspace';
import { NotFoundException } from '../../../shared/utils/appError';

export const updateWorkspaceNameAndDescription = async (
  workspaceId: string,
  body: {
    name: string;
    description?: string;
  },
  session?: ClientSession
) => {
  const workspaceRepository = new WorkspaceRepository();

  const workspace = await workspaceRepository.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException('Workspace not found.');
  }

  const { name, description } = body;

  workspace.name = name || workspace.name;
  workspace.description = description || workspace.description;

  await workspaceRepository.update(workspace, session);

  return {
    id: workspace.id, 
    name: workspace.name,
    description: workspace.description,
    owner: workspace.owner,
    inviteCode: workspace.inviteCode,
    updatedAt: workspace.updatedAt,
  };
};
