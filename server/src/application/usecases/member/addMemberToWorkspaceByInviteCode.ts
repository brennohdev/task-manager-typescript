import { WorkspaceRepository } from '../../../infrastructure/database/repositories/workspace';
import { MemberRepository } from '../../../infrastructure/database/repositories/member';
import { NotFoundException, BadRequestException } from '../../../shared/utils/appError';
import { ClientSession } from 'mongoose';

export const joinWorkspaceByInvite = async (userId: string, inviteCode: string, session?: ClientSession) => {
  const workspaceRepository = new WorkspaceRepository();
  const memberRepository = new MemberRepository();

  const workspace = await workspaceRepository.findByInviteCode(inviteCode);
  if (!workspace) {
    throw new NotFoundException("Invalid invite code or workspace not found");
  }

  const existingMember = await memberRepository.findByUserIdAndWorkspaceId(userId, workspace.id!);
  if (existingMember) {
    throw new BadRequestException("You are already a member of this workspace");
  }

  const newMember = {
    userId,
    workspaceId: workspace.id!,
    joinedAt: new Date()
  };
  await memberRepository.add(newMember, session);

  return { workspaceId: workspace.id! };
};