import { Router } from 'express';
import {
  createTaskController,
  deleteTaskController,
  getAllTasksInWorkspaceController,
  getTaskByIdController,
  updateTaskController,
} from '../controllers/task';

const taskRoute = Router();

taskRoute.post('/project/:projectId/workspace/:workspaceId/create', createTaskController);
taskRoute.put('/:taskId/project/:projectId/workspace/:workspaceId/update', updateTaskController);

taskRoute.get('/workspace/:workspaceId/all', getAllTasksInWorkspaceController);
taskRoute.get('/:taskId/project/:projectId/workspace/:workspaceId', getTaskByIdController);

taskRoute.delete('/:taskId/workspace/:workspaceId/delete', deleteTaskController);

export default taskRoute;
