import { Router } from 'express';
import { createWorkspaceController, getUserWorkspaces, getWorkspaceById } from '../controllers/workspace';
import isAuthenticated from '../../infrastructure/middlewares/Authenticate';

const workspaceRoute = Router();

workspaceRoute.post('/create/new', isAuthenticated, createWorkspaceController);

workspaceRoute.get('/all', getUserWorkspaces);

workspaceRoute.get('/:id', getWorkspaceById);


export default workspaceRoute;
