import { Router } from 'express';
import {
  createProject,
  deleteProjectInWorkspace,
  getAnalyticsFromProjects,
  getProjectByIdInWorkspace,
  listProjects,
  updateProjectDetails,
} from '../controllers/project';

const projectRoute = Router();

projectRoute.post('/workspace/:workspaceId/create', createProject);

projectRoute.get('/workspace/:workspaceId/all', listProjects);
projectRoute.get('/:id/workspace/:workspaceId', getProjectByIdInWorkspace);
projectRoute.get('/:id/workspace/:workspaceId/analytics', getAnalyticsFromProjects);

projectRoute.put('/:id/workspace/:workspaceId/update', updateProjectDetails);

projectRoute.delete('/:id/workspace/:workspaceId/delete', deleteProjectInWorkspace);

export default projectRoute;
