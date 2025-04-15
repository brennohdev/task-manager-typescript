import mongoose from 'mongoose';
import { IProjectRepository } from '../../../domain/repositories/project';
import { NotFoundException } from '../../../shared/utils/appError';
import { ProjectRepository } from '../../../infrastructure/database/repositories/project';

export const validateProjectBelongsToWorkspace = async (
  projectId: string,
  workspaceId: string,
  projectRepository: ProjectRepository,
) => {
  const projectObjectId = new mongoose.Types.ObjectId(projectId);

  const project = await projectRepository.findById(projectObjectId);

  if (!project || project.workspace.toString() !== workspaceId.toString()) {
    throw new NotFoundException('Project not found or does not belong to this workspace');
  }

  return project;
};
