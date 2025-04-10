import { Member } from "../entities/Member";
import { Types } from "mongoose";

export interface IMemberRepository {
    add(member: Omit<Member, "id">): Promise<Member>;
    findByWorkspace(workspaceId: Types.ObjectId): Promise<Member[]>;
    findByUserId(userId: Types.ObjectId): Promise<Member[]>;
    remove(memberId: Types.ObjectId): Promise<void>;
}
