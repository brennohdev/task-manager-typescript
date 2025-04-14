import { IProjectRepository } from '../../../domain/repositories/project';
import { Project } from '../../../domain/entities/Project';
import ProjectModel, { ProjectDocuments } from '../models/project';
import { Types, ClientSession } from 'mongoose';

export class ProjectRepository implements IProjectRepository {
  async create(project: Omit<Project, 'id'>, session?: ClientSession): Promise<Project> {
    const doc = await ProjectModel.create(
      [
        {
          name: project.name,
          description: project.description,
          emoji: project.emoji,
          workspace: project.workspace,
          createdBy: project.createdBy,
        },
      ],
      { session },
    );

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

  async findPaginatedByWorkspace(workspaceId: Types.ObjectId, page: number, limit: number) {
    const totalCount = await ProjectModel.countDocuments({ workspace: workspaceId });

    const skip = (page - 1) * limit;

    const docs = await ProjectModel.find({ workspace: workspaceId })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', '_id name profilePicture')
      .sort({ createdAt: -1 });

    return {
      projects: docs.map((doc) => this.toEntity(doc)),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      skip,
    };
  }

  async findByIdAndWorkspace(projectId: string, workspaceId: string) {
    return ProjectModel.findOne({
      _id: projectId,
      workspace: workspaceId,
    })
      .select('_id emoji name description workspace createdBy createdAt updatedAt')
      .populate('createdBy', '_id name profilePicture');
  }

  async update(project: Project): Promise<void> {
    if (!project.id) throw new Error('Project ID is required for update.');
    await ProjectModel.findByIdAndUpdate(project.id, {
      name: project.name,
      description: project.description,
      emoji: project.emoji,
    });
  }

  async updateById(
    projectId: string,
    data: Partial<Pick<Project, 'name' | 'description' | 'emoji'>>,
  ): Promise<Project | null> {
    const updated = await ProjectModel.findByIdAndUpdate(
      projectId,
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { new: true },
    );

    return updated ? this.toEntity(updated) : null;
  }

  async deleteManyByWorkspaceId(
    workspaceId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<void> {
    await ProjectModel.deleteMany({ workspace: workspaceId }).session(session || null);
  }

  async delete(id: Types.ObjectId, session?: ClientSession): Promise<void> {
    await ProjectModel.findByIdAndDelete(id).session(session || null);
  }

  async deleteById(projectId: string, session?: ClientSession): Promise<void> {
    await ProjectModel.findByIdAndDelete(projectId).session(session || null);
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
      doc.id,
    );
  }
}
