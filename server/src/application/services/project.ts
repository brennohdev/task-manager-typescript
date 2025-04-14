import mongoose from 'mongoose';
import { ProjectRepository } from '../../infrastructure/database/repositories/project';
import { createProject } from '../usecases/project/createProject';
import { getAccessLevelInWorkspace } from '../usecases/member/checkUserInWorkspace';
import { getPaginatedProjects } from '../usecases/project/getPaginatedProjects';
import { getProjectById } from '../usecases/project/getProjectById';
import { getProjectAnalytics } from '../usecases/project/getProjectAnalytics';
import { updateProject } from '../usecases/project/updateProject';
import { deleteProject } from '../usecases/project/deleteProject';

export const createProjectService = async (
  userId: string,
  body: {
    name: string;
    description?: string;
    emoji: string;
    workspaceId: string;
  },
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const projectRepository = new ProjectRepository();

  try {
    const workspaceObjectId = new mongoose.Types.ObjectId(body.workspaceId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const project = await createProject(
      {
        name: body.name,
        description: body.description,
        emoji: body.emoji,
        workspaceId: workspaceObjectId,
        userId: userObjectId,
      },
      projectRepository,
      session,
    );

    await session.commitTransaction();
    return project;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getProjectsInWorkspaceService = async (
  userId: string,
  workspaceId: string,
  page: number = 1,
  limit: number = 10,
) => {
  const projectRepository = new ProjectRepository();

  await getAccessLevelInWorkspace(userId, workspaceId);

  return await getPaginatedProjects(
    new mongoose.Types.ObjectId(workspaceId),
    page,
    limit,
    projectRepository,
  );
};

export const getProjectByIdInWorkspaceService = async (
  userId: string,
  workspaceId: string,
  projectId: string,
) => {
  const project = await getProjectById(userId, workspaceId, projectId);

  return project;
};

export const getProjectAnalyticsService = async (
  userId: string,
  workspaceId: string,
  projectId: string,
) => {
  const analytics = await getProjectAnalytics(userId, workspaceId, projectId);
  return analytics;
};

type UpdateProjectData = {
  name?: string;
  emoji?: string;
  description?: string;
};

export const updateProjectService = async (
  userId: string,
  workspaceId: string,
  projectId: string,
  data: UpdateProjectData,
) => {
  const updated = await updateProject(userId, workspaceId, projectId, data);
  return { project: updated };
};

export const deleteProjectService = async (
  userId: string,
  workspaceId: string,
  projectId: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deletedProject = await deleteProject(userId, workspaceId, projectId, session);

    await session.commitTransaction();
    return deletedProject;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
