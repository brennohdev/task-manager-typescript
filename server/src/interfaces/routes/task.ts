import { Router } from 'express';
import { createTaskController, deleteTaskController, getAllTasksInWorkspaceController, getTaskByIdController, updateTaskController } from '../controllers/task';

const taskRoute = Router();

taskRoute.post('/project/:projectId/workspace/:workspaceId/create', createTaskController);
taskRoute.put('/:id/project/:projectId/workspace/:workspaceId/update', updateTaskController);

taskRoute.get('/workspace/:workspaceId/all', getAllTasksInWorkspaceController);
taskRoute.get("/:id/project/:projectId/workspace/:workspaceId", getTaskByIdController);

taskRoute.delete("/:id/workspace/:workspaceId/delete", deleteTaskController)

export default taskRoute;
