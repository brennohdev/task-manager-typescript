import { Workspace } from "../entities/Workspace";
import { Types } from "mongoose";

export interface IWorkspaceRepository {
    create(workspace: Workspace): Promise<Workspace>;
    findByInviteCode(code: string): Promise<Workspace | null>;
    resetInviteCode(workspaceId: Types.ObjectId): Promise<void>;
    findByOwnerId(ownerId: Types.ObjectId): Promise<Workspace[]>;
}
