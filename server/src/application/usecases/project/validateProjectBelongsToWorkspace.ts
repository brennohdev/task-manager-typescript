import { NotFoundException } from '../../../shared/utils/appError';
import { ProjectRepository } from '../../../infrastructure/database/repositories/project';

export const validateProjectBelongsToWorkspace = async (
  projectId: string,
  workspaceId: string,
  projectRepository: ProjectRepository,
) => {
  const project = await projectRepository.findByIdAndWorkspace(projectId, workspaceId);

  if (!project) {
    throw new NotFoundException('Project not found or does not belong to this workspace');
  }

  return project;
};
