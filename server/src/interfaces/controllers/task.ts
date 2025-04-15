import { Request, Response } from 'express';
import { asyncHandler } from '../../infrastructure/middlewares/asyncHandler';
import { createTaskSchema } from '../validations/task';
import { projectIdSchema } from '../validations/project';
import { workspaceIdSchema } from '../validations/workspace';
import { getAccessLevelInWorkspace } from '../../application/usecases/member/checkUserInWorkspace';
import { createTaskService } from '../../application/services/task';
import { HTTPSTATUS } from '../../infrastructure/config/http';

export const createTaskController = asyncHandler(async (req: Request, res: Response) => {
  const body = createTaskSchema.parse(req.body);
  const projectId = projectIdSchema.parse(req.params.projectId);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const userId = req.user!.id;

  await getAccessLevelInWorkspace(userId, workspaceId);

  const task = await createTaskService({
    workspace: workspaceId,
    project: projectId,
    createdBy: userId,
    ...body,
  });

  return res.status(HTTPSTATUS.CREATED).json({
    message: 'Task created successfully.',
    task,
  });
});
