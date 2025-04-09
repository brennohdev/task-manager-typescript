import { Project } from "../../domain/entities/Project";
import { Types } from "mongoose";

export interface IProjectRepository {
    create(project: Omit<Project, 'id'>): Promise<Project>;
    findById(id: Types.ObjectId): Promise<Project | null>;
    findByWorkspace(workspaceId: Types.ObjectId): Promise<Project[]>;
    update(project: Project): Promise<void>;
    delete(id: Types.ObjectId): Promise<void>;
}
