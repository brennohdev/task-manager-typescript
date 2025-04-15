import { ClientSession, Types } from 'mongoose';
import { MemberRepository } from '../../../infrastructure/database/repositories/member';

export const validateMember = async (
  memberId: string,
  workspaceId: string,
  session?: ClientSession,
) => {
  const memberRepo = new MemberRepository();
  const isAssignedMember = await memberRepo.isMemberOfWorkspace(
    new Types.ObjectId(memberId),
    new Types.ObjectId(workspaceId),
  );
  if (!isAssignedMember) {
    throw new Error('Assigned user is not a member of this workspace.');
  }
};
