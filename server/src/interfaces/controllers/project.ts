import { asyncHandler } from '../../infrastructure/middlewares/asyncHandler';
import { json, Request, Response } from 'express';
import { createProjectSchema, projectIdSchema, updateProjectSchema } from '../validations/project';
import { workspaceIdSchema } from '../validations/workspace';
import { getAccessLevelInWorkspace } from '../../application/usecases/member/checkUserInWorkspace';
import {
  createProjectService,
  deleteProjectService,
  getProjectAnalyticsService,
  getProjectByIdInWorkspaceService,
  getProjectsInWorkspaceService,
  updateProjectService,
} from '../../application/services/project';
import { HTTPSTATUS } from '../../infrastructure/config/http';

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const body = createProjectSchema.parse(req.body);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const userId = req.user!.id;

  await getAccessLevelInWorkspace(userId, workspaceId);

  const project = await createProjectService(userId, {
    name: body.name,
    description: body.description,
    emoji: body.emoji ?? '🗂️',
    workspaceId: workspaceId,
  });

  res.status(HTTPSTATUS.CREATED).json({
    message: 'Project created successfully.',
    project,
  });
});

export const listProjects = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const pageNumber = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.limit as string) || 10;
  const userId = req.user!.id;

  const { projects, totalCount, totalPages, skip } = await getProjectsInWorkspaceService(
    userId,
    workspaceId,
    pageNumber,
    pageSize,
  );

  res.status(HTTPSTATUS.OK).json({
    message: 'Projects fetched successfully.',
    projects,
    pagination: {
      totalCount,
      pageSize,
      pageNumber,
      totalPages,
      skip,
      limit: pageSize,
    },
  });
});

export const getProjectByIdInWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const projectId = projectIdSchema.parse(req.params.id);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const userId = req.user!.id;

  const project = await getProjectByIdInWorkspaceService(userId, workspaceId, projectId);

  return res.status(HTTPSTATUS.OK).json({
    message: 'Project fetched successfully.',
    project,
  });
});

export const getAnalyticsFromProjects = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const projectId = projectIdSchema.parse(req.params.id);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  await getAccessLevelInWorkspace(userId, workspaceId);

  const result = await getProjectAnalyticsService(userId, workspaceId, projectId);

  return res.status(HTTPSTATUS.OK).json({
    message: 'Project analytics fetched successfully.',
    result,
  });
});

export const updateProjectDetails = asyncHandler(async (req: Request, res: Response) => {
  const data = updateProjectSchema.parse(req.body);
  const userId = req.user!.id;
  const projectId = projectIdSchema.parse(req.params.id);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  await getAccessLevelInWorkspace(userId, workspaceId);

  const updatedProject = await updateProjectService(userId, workspaceId, projectId, data);

  return res.status(HTTPSTATUS.OK).json({
    message: 'Project updated successfully.',
    updatedProject,
  });
});

export const deleteProjectInWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const projectId = projectIdSchema.parse(req.params.id);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  await getAccessLevelInWorkspace(userId, workspaceId);

  await deleteProjectService(userId, workspaceId, projectId);

  return res.status(HTTPSTATUS.OK).json({
    message: 'Project deleted successfully.',
  });
});
