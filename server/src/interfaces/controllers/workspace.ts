import { asyncHandler } from '../../infrastructure/middlewares/asyncHandler';
import { Request, Response } from 'express';
import { createWorkspaceSchema, workspaceIdSchema } from '../validations/workspace';
import { HTTPSTATUS } from '../../infrastructure/config/http';
import {
  createWorkspaceService,
  getAllWorkspacesService,
  getWorkspaceDetailsService,
} from '../../application/services/workspace';

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

  const workspaces = await getAllWorkspacesService(userId);

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
    message: "Workspace fetched successfully",
    workspaceDetails,
  });
});
