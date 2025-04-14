import { Project } from '../../../domain/entities/Project';
import { IProjectRepository } from '../../../domain/repositories/project';
import { ClientSession, Types } from 'mongoose';

interface CreateProjectDTO {
  name: string;
  description?: string | null;
  emoji?: string;
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
}

export async function createProject(
  data: CreateProjectDTO,
  projectRepository: IProjectRepository,
  session?: ClientSession
): Promise<Project> {
  const { name, description = null, emoji = '📁', workspaceId, userId } = data;

  const project = new Project(
    name,
    description,
    emoji,
    workspaceId,
    userId,
    new Date(),
    new Date(),
  );

  return await projectRepository.create(project);
}
