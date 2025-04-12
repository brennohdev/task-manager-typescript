/* 
    Create Workspace
1. Create a new workspace vinculed to a user(owner)
2. Create automatically a member with owner paper "role"
3. Set created workspace as User's currentWorkspace
*/
/*
    Business rules
Only a real user can create a workspace
The user becomes the owner when workspace is created
The new workspace is saved as currentworkspace
*/
import { Workspace } from '../../../domain/entities/Workspace';
import { MemberRepository } from '../../../infrastructure/database/repositories/member';
import { UserRepository } from '../../../infrastructure/database/repositories/user';
import { WorkspaceRepository } from '../../../infrastructure/database/repositories/workspace';
import { NotFoundException } from '../../../shared/utils/appError';
import { generateInviteCode } from '../../../shared/utils/generateInviteCode';
import { addMemberToWorkspace } from '../member/addMemberToWorkspace';
import { updateUserCurrentWorkspace } from '../user/updateUserCurrentWorkspace';

export const createWorkspace = async (
  userId: string,
  body: {
    name: string;
    description?: string;
  },
  workspaceRepository: WorkspaceRepository,
  session?: any,
): Promise<Workspace> => {

  const userRepository = new UserRepository();
  const memberRepository = new MemberRepository();

  const user = await userRepository.findById(userId)
  if (!user) {
    throw new NotFoundException("User not found.")
  }
  
  const { name, description } = body;

  const workspace = new Workspace(
    name,
    description || `Workspace created for you.`,
    userId,
    generateInviteCode(),
  );

  const createdWorkspace = await workspaceRepository.create(workspace, session);

  await addMemberToWorkspace(userId, createdWorkspace.id!, memberRepository, session);

  await updateUserCurrentWorkspace(user, createdWorkspace.id!, userRepository, session);
  
  return createdWorkspace;
};
