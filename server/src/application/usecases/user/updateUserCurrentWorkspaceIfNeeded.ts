import { UserRepository } from '../../../infrastructure/database/repositories/user';
import { MemberRepository } from '../../../infrastructure/database/repositories/member';
import { User } from '../../../domain/entities/User';
import { ClientSession } from 'mongoose';

export const updateUserCurrentWorkspaceIfNeeded = async (
  user: User,
  workspaceId: string,
  session?: ClientSession,
) => {
  if (!user.currentWorkspace || user.currentWorkspace !== workspaceId) return;
  if (!user.id) return; // ou throw new Error("User ID is required");

  const memberRepository = new MemberRepository();
  const userRepository = new UserRepository();

  const anotherMembership = await memberRepository.findFirstByUserId(user.id);

  const newWorkspaceId = anotherMembership?.workspaceId ?? null;
  await userRepository.updateCurrentWorkspace(user.id!, newWorkspaceId, session);
};
