import mongoose from 'mongoose';
import { getAccessLevelInWorkspace } from '../usecases/member/checkUserInWorkspace';
import { joinWorkspaceByInvite } from '../usecases/member/addMemberToWorkspaceByInviteCode';

export const getMemberAccessLevelInWorkspaceService = async (
  userId: string,
  workspaceId: string,
): Promise<'owner' | 'member'> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const accessLevel = await getAccessLevelInWorkspace(userId, workspaceId);
    await session.commitTransaction();
    return accessLevel;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

/* 
    Join Workspace by Invite Code (no role)
1. Find workspace using inviteCode
2. Check if user is already a member
3. Add user as a member to the workspace

    Business rules
Invite code must be valid
User can't join the same workspace twice
No role or hierarchy involved
*/

export const addMemberByInviteCodeService = async (userId: string, inviteCode: string): Promise<{ workspaceId: string}> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const addMember = await joinWorkspaceByInvite(userId, inviteCode, session);

    await session.commitTransaction();
    return addMember;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
