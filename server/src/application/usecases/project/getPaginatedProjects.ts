import { Types } from 'mongoose';
import { IProjectRepository } from '../../../domain/repositories/project';

export async function getPaginatedProjects(
  workspaceId: Types.ObjectId,
  page: number,
  limit: number,
  projectRepository: IProjectRepository,
) {
  return projectRepository.findPaginatedByWorkspace(workspaceId, page, limit);
}
