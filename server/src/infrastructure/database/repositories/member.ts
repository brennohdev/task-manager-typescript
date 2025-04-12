import { IMemberRepository } from '../../../domain/repositories/member';
import { Member } from '../../../domain/entities/Member';
import MemberModel, { MemberDocument } from '../models/member';
import { Types, ClientSession } from 'mongoose';

export class MemberRepository implements IMemberRepository {
  async add(member: Omit<Member, 'id'>, session?: ClientSession): Promise<Member> {
    const [doc] = await MemberModel.create(
      [
        {
          userId: new Types.ObjectId(member.userId),
          workspaceId: new Types.ObjectId(member.workspaceId),
          joinedAt: member.joinedAt,
        },
      ],
      { session },
    );

    return this.toEntity(doc);
  }

  async findMemberByWorkspace(workspaceId: string): Promise<Member[]> {
    const docs = await MemberModel.find({ workspaceId: new Types.ObjectId(workspaceId) });
    return docs.map((doc) => this.toEntity(doc));
  }

  async findByUserId(userId: string): Promise<Member[]> {
    const docs = await MemberModel.find({ userId: new Types.ObjectId(userId) });
    return docs.map((doc) => this.toEntity(doc));
  }

  async findByUserIdAndWorkspaceId(userId: string, workspaceId: string): Promise<Member | null> {
    const doc = await MemberModel.findOne({
      userId: new Types.ObjectId(userId),
      workspaceId: new Types.ObjectId(workspaceId),
    });
  
    return doc ? this.toEntity(doc) : null;
  }

  async remove(memberId: string): Promise<void> {
    await MemberModel.findByIdAndDelete(new Types.ObjectId(memberId));
  }

  private toEntity(doc: MemberDocument): Member {
    return new Member(
      doc.userId.toString(),
      doc.workspaceId.toString(),
      doc.joinedAt,
      doc.id.toString(),
    );
  }
}
