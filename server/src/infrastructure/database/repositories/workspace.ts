import { IWorkspaceRepository } from '../../../domain/repositories/workspace';
import { Workspace } from '../../../domain/entities/Workspace';
import WorkspaceModel from '../models/workspace';
import { ClientSession, Types } from 'mongoose';

export class WorkspaceRepository implements IWorkspaceRepository {
  // Mapeia o documento do Mongoose para a entidade Workspace
  private mapToEntity(doc: any): Workspace {
    return new Workspace(
      doc.name,
      doc.description,
      doc.owner.toString(), // Converte ObjectId para string
      doc.inviteCode,
      doc._id.toString(), // Converte ObjectId para string
      doc.createdAt,
      doc.updatedAt,
    );
  }

  // Mapeia a entidade Workspace para o formato persistido no MongoDB
  private mapToPersistence(workspace: Workspace) {
    return {
      name: workspace.name,
      description: workspace.description,
      owner: new Types.ObjectId(workspace.owner), // Converte string para ObjectId
      inviteCode: workspace.inviteCode,
    };
  }

  // Cria um novo workspace no banco de dados
  async create(workspace: Workspace, session?: ClientSession): Promise<Workspace> {
    const [doc] = await WorkspaceModel.create([this.mapToPersistence(workspace)], { session });
    return this.mapToEntity(doc);
  }

  // Atualiza um workspace existente
  async update(workspace: Workspace, session?: ClientSession): Promise<void> {
    await WorkspaceModel.findByIdAndUpdate(
      workspace.id, // A id é string, e Mongoose lida com isso corretamente
      {
        name: workspace.name,
        description: workspace.description,
      },
      { session }
    );
  }

  async delete(workspaceId: string, session?: ClientSession): Promise<void> {
    const workspaceObjectId = new Types.ObjectId(workspaceId);

    await WorkspaceModel.deleteOne({ _id: workspaceObjectId }, { session });
  }


  // Encontra um workspace pelo ID
  async findById(id: string): Promise<Workspace | null> {
    if (!Types.ObjectId.isValid(id)) return null; // Verifica se o id é válido

    const doc = await WorkspaceModel.findById(id); // Encontra pelo ID string
    return doc ? this.mapToEntity(doc) : null;
  }

  // Encontra um workspace pelo código de convite
  async findByInviteCode(code: string): Promise<Workspace | null> {
    const doc = await WorkspaceModel.findOne({ inviteCode: code });
    return doc ? this.mapToEntity(doc) : null;
  }

  // Reseta o código de convite de um workspace
  async resetInviteCode(workspaceId: string): Promise<void> {
    if (!Types.ObjectId.isValid(workspaceId)) return; // Verifica se o id é válido

    const doc = await WorkspaceModel.findById(workspaceId);
    if (!doc) return;

    const workspace = this.mapToEntity(doc);
    workspace.resetInviteCode();

    doc.inviteCode = workspace.inviteCode;
    await doc.save();
  }

  // Encontra workspaces pelo ID do proprietário
  async findByOwnerId(ownerId: string): Promise<Workspace[]> {
    if (!Types.ObjectId.isValid(ownerId)) return []; // Verifica se o ownerId é válido

    const docs = await WorkspaceModel.find({ owner: new Types.ObjectId(ownerId) });
    return docs.map((doc) => this.mapToEntity(doc));
  }

  // Encontra múltiplos workspaces pelos IDs
  async findManyByIds(ids: string[]): Promise<Workspace[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const docs = await WorkspaceModel.find({ _id: { $in: objectIds } });
    return docs.map((doc) => this.mapToEntity(doc));
  }
}
