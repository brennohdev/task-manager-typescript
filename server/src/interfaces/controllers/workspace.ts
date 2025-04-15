import { asyncHandler } from '../../infrastructure/middlewares/asyncHandler';
import { Request, Response } from 'express';
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
  workspaceIdSchema,
} from '../validations/workspace';
import { HTTPSTATUS } from '../../infrastructure/config/http';
import {
  createWorkspaceService,
  deleteWorkspaceService,
  getAllMembersDetailsService,
  getAllUserWorkspacesService,
  getAnalyticsService,
  getWorkspaceDetailsService,
  updateWorkspaceService,
} from '../../application/services/workspace';
import { UnauthorizedException } from '../../shared/utils/appError';
import { getAccessLevelInWorkspace } from '../../application/usecases/member/checkUserInWorkspace';

export const createWorkspaceController = asyncHandler(async (req: Request, res: Response) => {
  const body = createWorkspaceSchema.parse(req.body);
  const userId = req.user!.id;

  const workspace = await createWorkspaceService(userId, body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: 'Workspace created successfully',
    workspace,
  });
});

export const getUserWorkspaces = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const workspaces = await getAllUserWorkspacesService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: 'User workspaces fetched successfully',
    workspaces,
  });
});

export const getWorkspaceById = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user!.id;

  const workspaceDetails = await getWorkspaceDetailsService(userId, workspaceId);

  return res.status(200).json({
    message: 'Workspace fetched successfully.',
    workspaceDetails,
  });
});

export const getAllMembersDetails = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user!.id;

  await getAccessLevelInWorkspace(userId, workspaceId);

  const members = await getAllMembersDetailsService(userId, workspaceId);

  return res.status(200).json({
    message: 'All members fetched successfully.',
    members,
  });
});

export const getAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user!.id;

  await getAccessLevelInWorkspace(userId, workspaceId);

  const workspaceAnalytics = await getAnalyticsService(workspaceId);

  return res.status(200).json({
    message: 'Workspace analytics fetched successfully.',
    workspaceAnalytics,
  });
});

export const updateWorkspaceById = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user!.id;
  const body = updateWorkspaceSchema.parse(req.body);

  await getAccessLevelInWorkspace(userId, workspaceId);

  const updatedWorkspace = await updateWorkspaceService(workspaceId, body);

  return res.status(200).json({
    message: 'Workspace updated successfully.',
    updatedWorkspace,
  });
});

export const deleteWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.id);
  const userId = req.user!.id;

  await getAccessLevelInWorkspace(userId, workspaceId);

  const { currentWorkspace } = await deleteWorkspaceService(workspaceId, userId);

  return res.status(200).json({
    message: 'Workspace deleted successfully.',
    currentWorkspace,
  });
});
