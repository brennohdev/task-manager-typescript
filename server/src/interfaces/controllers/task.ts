import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../../infrastructure/middlewares/asyncHandler';
import { createTaskSchema, taskIdSchema, updateTaskSchema } from '../validations/task';
import { projectIdSchema, updateProjectSchema } from '../validations/project';
import { workspaceIdSchema } from '../validations/workspace';
import { getAccessLevelInWorkspace } from '../../application/usecases/member/checkUserInWorkspace';
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
} from '../../application/services/task';
import { HTTPSTATUS } from '../../infrastructure/config/http';
import { ZodError } from 'zod';
import { Types } from 'mongoose';

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

export const updateTaskController = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = req.params.workspaceId;
  const taskId = req.params.taskId;
  const userId = req.user!.id;

  // Verifica se o usuário tem acesso ao workspace
  await getAccessLevelInWorkspace(userId, workspaceId);

  // Validação do corpo da requisição
  const body = updateTaskSchema.parse(req.body);

  // Chama o serviço de atualização de tarefa
  const updatedTask = await updateTaskService({
    taskId,
    ...body,
  });

  // Retorna a resposta com a tarefa atualizada
  return res.status(HTTPSTATUS.OK).json({
    message: 'Task updated successfully.',
    task: updatedTask,
  });
});

export const getAllTasksInWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const filters = {
      projectId: req.query.projectId as string | undefined,
      status: req.query.status ? (req.query.status as string)?.split(',') : undefined,
      priority: req.query.priority ? (req.query.priority as string)?.split(',') : undefined,
      assignedTo: req.query.assignedTo ? (req.query.assignedTo as string)?.split(',') : undefined,
      keyword: req.query.keyword as string | undefined,
      dueDate: req.query.dueDate as string | undefined,
    };

    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 10,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    await getAccessLevelInWorkspace(userId, workspaceId);

    const result = await getAllTasksService(workspaceId, filters, pagination);

    return res.status(HTTPSTATUS.OK).json({
      message: 'All tasks fetched successfully.',
      result,
    });
  },
);

export const getTaskByIdController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const projectId = projectIdSchema.parse(req.params.projectId);
  const taskId = taskIdSchema.parse(req.params.id);

  await getAccessLevelInWorkspace(userId, workspaceId);

  const task = await getTaskByIdService(workspaceId, projectId, taskId);

  return res.status(HTTPSTATUS.OK).json({
    message: 'Task fetched successfully.',
    task,
  });
});

export const deleteTaskController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const taskId = taskIdSchema.parse(req.params.taskId);

  await getAccessLevelInWorkspace(userId, workspaceId);

  await deleteTaskService(workspaceId, taskId, userId);

  return res.status(HTTPSTATUS.OK).json({
    message: 'Task deleted successfully',
  });
});
