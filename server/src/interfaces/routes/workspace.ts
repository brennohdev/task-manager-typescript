import { Router } from 'express';
import {
  createWorkspaceController,
  deleteWorkspace,
  getAllMembersDetails,
  getAnalytics,
  getUserWorkspaces,
  getWorkspaceById,
  updateWorkspaceById,
} from '../controllers/workspace';
import isAuthenticated from '../../infrastructure/middlewares/Authenticate';
import { deleteWorkspaceService } from '../../application/services/workspace';

const workspaceRoute = Router();

workspaceRoute.post('/', isAuthenticated, createWorkspaceController);

workspaceRoute.put('/update/:id', updateWorkspaceById);

workspaceRoute.delete('/delete/:id', deleteWorkspace)

workspaceRoute.get('/all', getUserWorkspaces);
workspaceRoute.get('/:id', getWorkspaceById);
workspaceRoute.get('/members/:id', getAllMembersDetails);
workspaceRoute.get('/analytics/:id', getAnalytics);

export default workspaceRoute;
