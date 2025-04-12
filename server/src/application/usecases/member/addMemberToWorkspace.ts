import { Types } from 'mongoose';
import { Member } from '../../../domain/entities/Member';
import { MemberRepository } from '../../../infrastructure/database/repositories/member';

export const addMemberToWorkspace = async (
  userId: string,
  workspaceId: string,
  memberRepository: MemberRepository,
  session?: any,
) => {
  const member = new Member(
    userId,
    workspaceId,
    new Date(),
  );

  return memberRepository.add(member, session);
};
