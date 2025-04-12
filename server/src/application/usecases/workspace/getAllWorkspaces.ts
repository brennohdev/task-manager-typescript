import { MemberRepository } from '../../../infrastructure/database/repositories/member';
import { WorkspaceRepository } from '../../../infrastructure/database/repositories/workspace';
import { NotFoundException } from '../../../shared/utils/appError';

export const getAllWorkspaces = async (userId: string) => {
  const memberRepository = new MemberRepository();
  const workspaceRepository = new WorkspaceRepository();

  const memberRecords = await memberRepository.findByUserId(userId);

  if (!memberRecords || memberRecords.length === 0) {
    throw new NotFoundException('User is not a member of any workspace.');
  }

  const workspaceIds = memberRecords.map((member) => member.workspaceId);

  const workspaces = await workspaceRepository.findManyByIds(workspaceIds);

  return workspaces;
};
