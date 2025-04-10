import { Workspace } from "../entities/Workspace";
import { Types } from "mongoose";

export interface IWorkspaceRepository {
    create(workspace: Workspace, session?: any): Promise<Workspace>; // Adicionando session como parâmetro opcional
    findByInviteCode(code: string): Promise<Workspace | null>;
    resetInviteCode(workspaceId: string): Promise<void>;
    findByOwnerId(ownerId: string): Promise<Workspace[]>;
}