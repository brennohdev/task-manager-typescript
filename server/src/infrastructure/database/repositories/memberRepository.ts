import { IMemberRepository } from "../../../domain/repositories/memberContract";
import { Member } from "../../../domain/entities/Member";
import MemberModel from "../models/memberModel";
import { Types } from "mongoose";

export class MemberRepository implements IMemberRepository {
    async add(member: Omit<Member, "id">): Promise<Member> {
    const doc = await MemberModel.create({
        userId: member.userId,
        workspaceId: member.workspaceId,
        joinedAt: member.joinedAt,
    });

    return this.toEntity(doc);
    }

    async findByWorkspace(workspaceId: Types.ObjectId): Promise<Member[]> {
    const docs = await MemberModel.find({ workspaceId });
    return docs.map(this.toEntity);
    }

    async findByUserId(userId: Types.ObjectId): Promise<Member[]> {
    const docs = await MemberModel.find({ userId });
    return docs.map(this.toEntity);
    }

    async remove(memberId: Types.ObjectId): Promise<void> {
    await MemberModel.findByIdAndDelete(memberId);
    }

    private toEntity(doc: any): Member {
    return new Member(
        doc.userId,
        doc.workspaceId,
        doc.joinedAt,
        doc._id
    );
    }
}
