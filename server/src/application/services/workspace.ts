import mongoose, { mongo } from 'mongoose';
import { MemberRepository } from '../../infrastructure/database/repositories/member';
import { UserRepository } from '../../infrastructure/database/repositories/user';
import { WorkspaceRepository } from '../../infrastructure/database/repositories/workspace';
import { NotFoundException } from '../../shared/utils/appError';
import { createWorkspace } from '../usecases/workspace/createWorkspaceForUser';
import { getAllWorkspaces } from '../usecases/workspace/getAllWorkspaces';
import { getWorkspaceDetails } from '../usecases/workspace/getWorkspaceDetails';
import { getAccessLevelInWorkspace } from '../usecases/member/checkUserInWorkspace';
import { getWorkspaceMembers } from '../usecases/workspace/getMembersInWorkspace';
import { getWorkspaceAnalytics } from '../usecases/workspace/getWorkspaceAnalytics';
import { updateWorkspaceNameAndDescription } from '../usecases/workspace/updateWorkspace';
import { getWorkspaceById } from '../usecases/workspace/getWorkspaceById';
import { verifyWorkspaceOwnership } from '../usecases/workspace/verifyWorkspaceOwnership';
import { getUserById } from '../usecases/user/getUserById';
import { deleteProjectByWorkspaceId } from '../usecases/project/deleteProjectsByWorkspaceId';
import { deleteTaskByWorkspaceId } from '../usecases/task/deleteTaskByWorkspaceId';
import { deleteMembersByWorkspaceId } from '../usecases/member/deleteMembersByWorkspaceId';
import { updateUserCurrentWorkspaceIfNeeded } from '../usecases/user/updateUserCurrentWorkspaceIfNeeded';
import { deleteWorkspaceById } from '../usecases/workspace/deleteWorkspaceById';

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

export const getAllUserWorkspacesService = async (userId: string) => {
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
    const accessLevel = await getAccessLevelInWorkspace(userId, workspaceId);
    const workspaceDetails = await getWorkspaceDetails(workspaceId);

    await session.commitTransaction();

    return {
      accessLevel,
      ...workspaceDetails,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getAllMembersDetailsService = async (userId: string, workspaceId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const members = await getWorkspaceMembers(workspaceId, userId);

    await session.commitTransaction();

    return { members };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getAnalyticsService = async (workspaceId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const analytics = await getWorkspaceAnalytics(workspaceId);

    await session.commitTransaction();

    return analytics;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const updateWorkspaceService = async (
  workspaceId: string,
  body: {
    name: string;
    description?: string;
  },
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updatedWorkspace = await updateWorkspaceNameAndDescription(workspaceId, body, session);

    await session.commitTransaction();
    return updatedWorkspace;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const deleteWorkspaceService = async (workspaceId: string, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const workspace = await getWorkspaceById(workspaceId);

    verifyWorkspaceOwnership({ owner: workspace.owner }, userId);

    const user = await getUserById(userId);
    if (!user) throw new Error('User not found');

    await deleteProjectByWorkspaceId(workspaceId, session);
    await deleteTaskByWorkspaceId(workspaceId, session);
    await deleteMembersByWorkspaceId(workspaceId, session);

    await updateUserCurrentWorkspaceIfNeeded(user, workspaceId, session);

    await deleteWorkspaceById(workspaceId, session);

    await session.commitTransaction();
    return {
      currentWorkspace: user.currentWorkspace,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
