import { IProjectRepository } from "../../../domain/repositories/project";
import { Project } from "../../../domain/entities/Project";
import ProjectModel, { ProjectDocuments } from "../models/project";
import { Types, ClientSession } from "mongoose";

export class ProjectRepository implements IProjectRepository {
    async create(project: Omit<Project, 'id'>, session?: ClientSession): Promise<Project> {
        const doc = await ProjectModel.create([{
            name: project.name,
            description: project.description,
            emoji: project.emoji,
            workspace: project.workspace,
            createdBy: project.createdBy,
        }], { session });

        return this.toEntity(doc[0]);
    }

    async findById(id: Types.ObjectId): Promise<Project | null> {
        const doc = await ProjectModel.findById(id);
        return doc ? this.toEntity(doc) : null;
    }

    async findByWorkspace(workspaceId: Types.ObjectId): Promise<Project[]> {
        const docs = await ProjectModel.find({ workspace: workspaceId });
        return docs.map((doc) => this.toEntity(doc));
    }

    async update(project: Project): Promise<void> {
        if (!project.id) throw new Error("Project ID is required for update.");
        await ProjectModel.findByIdAndUpdate(project.id, {
            name: project.name,
            description: project.description,
            emoji: project.emoji,
        });
    }

    async delete(id: Types.ObjectId): Promise<void> {
        await ProjectModel.findByIdAndDelete(id);
    }

    private toEntity(doc: ProjectDocuments): Project {
        return new Project(
            doc.name,
            doc.description,
            doc.emoji,
            doc.workspace,
            doc.createdBy,
            doc.createdAt,
            doc.updatedAt,
            doc.id
        );
    }
}
