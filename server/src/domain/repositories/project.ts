import { Project } from '../entities/Project';
import { Types, ClientSession } from 'mongoose';

export interface IProjectRepository {
  create(project: Omit<Project, 'id'>, session?: ClientSession): Promise<Project>;
  findById(id: Types.ObjectId): Promise<Project | null>;
  findByWorkspace(workspaceId: Types.ObjectId): Promise<Project[]>;
  findPaginatedByWorkspace(
    workspaceId: Types.ObjectId,
    page: number,
    limit: number,
  ): Promise<{
    projects: Project[];
    totalCount: number;
    totalPages: number;
    skip: number;
  }>;
  findByIdAndWorkspace(projectId: string, workspaceId: string): Promise<Project | null>;

  update(project: Project): Promise<void>;

  updateById(
    projectId: string,
    data: Partial<Pick<Project, 'name' | 'description' | 'emoji'>>,
  ): Promise<Project | null>;

  deleteManyByWorkspaceId(workspaceId: Types.ObjectId, session?: ClientSession): Promise<void>;

  delete(id: Types.ObjectId): Promise<void>;
  deleteById(projectId: string): Promise<void>;
}
