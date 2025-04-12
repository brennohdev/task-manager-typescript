import { MemberRepository } from '../../../infrastructure/database/repositories/member';
import { WorkspaceRepository } from '../../../infrastructure/database/repositories/workspace';
import { NotFoundException } from '../../../shared/utils/appError';

export const getWorkspaceDetails = async (workspaceId: string) => {
  const workspaceRepository = new WorkspaceRepository();
  const memberRepository = new MemberRepository();

  const workspace = await workspaceRepository.findById(workspaceId);

  if (!workspace) {
    throw new NotFoundException('Workspace not found.');
  }

  const members = await memberRepository.findMemberByWorkspace(workspaceId);

  return {
    ...workspace,
    members,
  };
};
