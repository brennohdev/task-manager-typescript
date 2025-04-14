import { ProjectRepository } from '../../../infrastructure/database/repositories/project';
import { NotFoundException } from '../../../shared/utils/appError';
import { getAccessLevelInWorkspace } from '../member/checkUserInWorkspace';

export const getProjectById = async (userId: string, workspaceId: string, projectId: string) => {
  const projectRepository = new ProjectRepository();

  await getAccessLevelInWorkspace(userId, workspaceId);

  const project = await projectRepository.findByIdAndWorkspace(projectId, workspaceId);

  if (!project) {
    throw new NotFoundException('Project not found.');
  }

  return { project };
};
