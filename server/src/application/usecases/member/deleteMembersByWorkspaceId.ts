import { ClientSession } from 'mongoose';
import { MemberRepository } from '../../../infrastructure/database/repositories/member';

export const deleteMembersByWorkspaceId = async (workspaceId: string, session?: ClientSession) => {
  const memberRepository = new MemberRepository();
  await memberRepository.deleteManyByWorkspaceId(workspaceId, session);
};
