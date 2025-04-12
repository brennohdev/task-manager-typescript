import mongoose from 'mongoose';
import { MemberRepository } from '../../infrastructure/database/repositories/member';
import { UserRepository } from '../../infrastructure/database/repositories/user';
import { WorkspaceRepository } from '../../infrastructure/database/repositories/workspace';
import { NotFoundException } from '../../shared/utils/appError';
import { createWorkspace } from '../usecases/workspace/createWorkspaceForUser';
import { getAllWorkspaces } from '../usecases/workspace/getAllWorkspaces';
import { getWorkspaceDetails } from '../usecases/workspace/getWorkspaceDetails';
import { checkUserMembershipInWorkspace } from '../usecases/member/checkUserInWorkspace';

export const createWorkspaceService = async (
  userId: string,
  body: {
    name: string;
    description?: string;
  },
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  console.log('Session started..');

  const workspaceRepository = new WorkspaceRepository();
  const userRepository = new UserRepository();
  const memberRepository = new MemberRepository();

  try {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const workspace = await createWorkspace(userId, body, workspaceRepository, session);

    await session.commitTransaction();
    console.log('Good job!');
    return workspace;
  } catch (error) {
    await session.abortTransaction();
    console.log('Session error..');
    throw error;
  } finally {
    session.endSession();
    console.log('Session end.');
  }
};

export const getAllWorkspacesService = async (userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  console.log('Session started..');

  try {
    const workspaces = await getAllWorkspaces(userId);

    await session.commitTransaction();
    console.log('Transaction comitted.');

    return workspaces;
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction aborted due to error:', error);
    throw error;
  } finally {
    session.endSession();
    console.log('Session ended.');
  }
};

export const getWorkspaceDetailsService = async (userId: string, workspaceId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await checkUserMembershipInWorkspace(userId, workspaceId);

    const workspaceDetails = await getWorkspaceDetails(workspaceId);

    await session.commitTransaction();

    return workspaceDetails;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

/* 
    List members datas
1. Return all member's data from a workspace (name, email,...) 
*/

/* 
    Read Statistcs about tasks from a workspace
1. Return statistcs: Total of tasks, late tasks, done tasks 
*/

/* 
    Update name or description of workspace
1. Update details 
*/

/* 
    Delete workspace
1. Delete a workspace
2. remove projects, tasks and members vinculed to this workspace
3. update currentWorkspace of the user, if necessary

    Business rules
Only the createdBy can delete a workspace
Delete all the data from a transaction
If the user doesn't have another workspace, currentWorkspace becomes null.
*/
