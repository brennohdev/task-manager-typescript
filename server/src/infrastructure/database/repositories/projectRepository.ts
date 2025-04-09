import { IProjectRepository } from "../../../domain/repositories/projectContract";
import { Project } from "../../../domain/entities/Project";
import ProjectModel from "../models/projectModel";
import { Types } from "mongoose";

export class ProjectRepository implements IProjectRepository {
    async create(project: Omit<Project, 'id'>): Promise<Project> {
    const doc = await ProjectModel.create({
        name: project.name,
        description: project.description,
        emoji: project.emoji,
        workspace: project.workspace,
        createdBy: project.createdBy,
    });
    return this.toEntity(doc);
}

    async findById(id: Types.ObjectId): Promise<Project | null> {
    const doc = await ProjectModel.findById(id);
    return doc ? this.toEntity(doc) : null;
}

    async findByWorkspace(workspaceId: Types.ObjectId): Promise<Project[]> {
    const docs = await ProjectModel.find({ workspace: workspaceId });
    return docs.map(this.toEntity);
}

    async update(project: Project): Promise<void> {
    await ProjectModel.findByIdAndUpdate(project.id, {
        name: project.name,
        description: project.description,
        emoji: project.emoji,
    });
}

    async delete(id: Types.ObjectId): Promise<void> {
    await ProjectModel.findByIdAndDelete(id);
}

    private toEntity(doc: any): Project {
    return new Project(
        doc.name,
        doc.description,
        doc.emoji,
        doc.workspace,
        doc.createdBy,
        doc.createdAt,
        doc.updatedAt,
        doc._id
    );
}
}
