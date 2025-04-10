import { IMemberRepository } from "../../../domain/repositories/member";
import { Member } from "../../../domain/entities/Member";
import MemberModel, { MemberDocument } from "../models/member";
import { Types, ClientSession } from "mongoose";

export class MemberRepository implements IMemberRepository {
    async add(member: Omit<Member, "id">, session?: ClientSession): Promise<Member> {
        const doc = await MemberModel.create([{
            userId: member.userId,
            workspaceId: member.workspaceId,
            joinedAt: member.joinedAt,
        }], { session });

        return this.toEntity(doc[0]);
    }

    async findByWorkspace(workspaceId: Types.ObjectId): Promise<Member[]> {
        const docs = await MemberModel.find({ workspaceId });
        return docs.map((doc) => this.toEntity(doc));
    }

    async findByUserId(userId: Types.ObjectId): Promise<Member[]> {
        const docs = await MemberModel.find({ userId });
        return docs.map((doc) => this.toEntity(doc));
    }

    async remove(memberId: Types.ObjectId): Promise<void> {
        await MemberModel.findByIdAndDelete(memberId);
    }

    private toEntity(doc: MemberDocument): Member {
        return new Member(
            doc.userId,
            doc.workspaceId,
            doc.joinedAt,
            doc.id
        );
    }
}
