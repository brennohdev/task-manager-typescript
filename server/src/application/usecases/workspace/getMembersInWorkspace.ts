import { MemberRepository } from '../../../infrastructure/database/repositories/member';
import { NotFoundException } from '../../../shared/utils/appError';
import { getAccessLevelInWorkspace } from '../member/checkUserInWorkspace';

export const getWorkspaceMembers = async (workspaceId: string, userId:string) => {
  const memberRepository = new MemberRepository();

  await getAccessLevelInWorkspace(userId, workspaceId);

  const members = await memberRepository.findManyWithUserByWorkspaceId(workspaceId);
  if (!members || members.length === 0) {
    throw new NotFoundException("There's no members in this repository.");
  }

  return members;
};
