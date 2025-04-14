import { ClientSession, Types } from 'mongoose';
import { ProjectRepository } from '../../../infrastructure/database/repositories/project';
import { TaskRepository } from '../../../infrastructure/database/repositories/task';
import { BadRequestException, NotFoundException } from '../../../shared/utils/appError';
import { getAccessLevelInWorkspace } from '../member/checkUserInWorkspace';

export const deleteProject = async (
    userId: string,
    workspaceId: string,
    projectId: string,
    session: ClientSession,
  ) => {
    const projectRepository = new ProjectRepository();
    const taskRepository = new TaskRepository();
  
    await getAccessLevelInWorkspace(userId, workspaceId); 
  
    const project = await projectRepository.findByIdAndWorkspace(projectId, workspaceId);
    if (!project) {
      throw new NotFoundException('Project not found or does not belong to the workspace');
    }
  
    await projectRepository.delete(new Types.ObjectId(projectId), session);
    await taskRepository.deleteManyByProject(projectId, session);
  
    return project;
  };
