import { IWorkspaceRepository } from "../../../domain/repositories/workspaceContract";
import { Workspace } from "../../../domain/entities/Workspace";
import WorkspaceModel from "../models/workspaceModel";
import { Types } from "mongoose";

export class WorkspaceRepository implements IWorkspaceRepository {
    async create(workspace: Workspace): Promise<Workspace> {
        const doc = await WorkspaceModel.create({
            name: workspace.name,
            description: workspace.description,
            owner: workspace.owner,
            inviteCode: workspace.inviteCode,
        });

        return this.toEntity(doc);
    }

    async findByInviteCode(code: string): Promise<Workspace | null> {
        const doc = await WorkspaceModel.findOne({ inviteCode: code });
        return doc ? this.toEntity(doc) : null;
    }

    async resetInviteCode(workspaceId: Types.ObjectId): Promise<void> {
        const doc = await WorkspaceModel.findById(workspaceId);
        if (!doc) return;

        const workspace = this.toEntity(doc);
        workspace.resetInviteCode();

        doc.inviteCode = workspace.inviteCode;
        await doc.save();
    }

    async findByOwnerId(ownerId: Types.ObjectId): Promise<Workspace[]> {
        const docs = await WorkspaceModel.find({ owner: ownerId });
        return docs.map((doc) => this.toEntity(doc));
    }

    private toEntity(doc: any): Workspace {
        return new Workspace(
            doc.name,
            doc.description,
            doc.owner,
            doc.inviteCode,
            doc.createdAt,
            doc.updatedAt,
            doc._id
        );
    }
}
