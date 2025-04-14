import { IWorkspaceRepository } from '../../../domain/repositories/workspace';
import { Workspace } from '../../../domain/entities/Workspace';
import WorkspaceModel from '../models/workspace';
import { ClientSession, Types } from 'mongoose';

export class WorkspaceRepository implements IWorkspaceRepository {
  private mapToEntity(doc: any): Workspace {
    return new Workspace(
      doc.name,
      doc.description,
      doc.owner.toString(),
      doc.inviteCode,
      doc._id.toString(),
      doc.createdAt,
    );
  }

  private mapToPersistence(workspace: Workspace) {
    return {
      name: workspace.name,
      description: workspace.description,
      owner: new Types.ObjectId(workspace.owner),
      inviteCode: workspace.inviteCode,
    };
  }

  async create(workspace: Workspace, session?: ClientSession): Promise<Workspace> {
    const [doc] = await WorkspaceModel.create([this.mapToPersistence(workspace)], { session });
    return this.mapToEntity(doc);
  }

  async update(workspace: Workspace, session?: ClientSession): Promise<void> {
    await WorkspaceModel.findByIdAndUpdate(
      workspace.id,
      {
        name: workspace.name,
        description: workspace.description,
      },
      { new: true, session: session as ClientSession }
    );
  }

  async delete(workspaceId: string, session?: ClientSession): Promise<void> {
    const workspaceObjectId = new Types.ObjectId(workspaceId);
    await WorkspaceModel.deleteOne({ _id: workspaceObjectId }, { session });
  }

  async findById(id: string): Promise<Workspace | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const doc = await WorkspaceModel.findById(id);
    return doc ? this.mapToEntity(doc) : null;
  }

  async findByInviteCode(code: string): Promise<Workspace | null> {
    const doc = await WorkspaceModel.findOne({ inviteCode: code });
    return doc ? this.mapToEntity(doc) : null;
  }

  async resetInviteCode(workspaceId: string): Promise<void> {
    if (!Types.ObjectId.isValid(workspaceId)) return;
    const doc = await WorkspaceModel.findById(workspaceId);
    if (!doc) return;
    const workspace = this.mapToEntity(doc);
    workspace.resetInviteCode();
    doc.inviteCode = workspace.inviteCode;
    await doc.save();
  }

  async findByOwnerId(ownerId: string): Promise<Workspace[]> {
    if (!Types.ObjectId.isValid(ownerId)) return [];
    const docs = await WorkspaceModel.find({ owner: new Types.ObjectId(ownerId) });
    return docs.map((doc) => this.mapToEntity(doc));
  }

  async findManyByIds(ids: string[]): Promise<Workspace[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const docs = await WorkspaceModel.find({ _id: { $in: objectIds } });
    return docs.map((doc) => this.mapToEntity(doc));
  }
}
