import { ProjectRepository } from '../../../infrastructure/database/repositories/project';
import { NotFoundException } from '../../../shared/utils/appError';
import { getAccessLevelInWorkspace } from '../member/checkUserInWorkspace';

type UpdateProjectData = {
    name?: string;
    emoji?: string;
    description?: string;
  };
  

export const updateProject = async (
    userId: string,
    workspaceId: string,
    projectId: string,
    updates: UpdateProjectData
  ) => {
    const projectRepository = new ProjectRepository();
  
    await getAccessLevelInWorkspace(userId, workspaceId);
  
    const project = await projectRepository.findByIdAndWorkspace(projectId, workspaceId);
    if (!project) {
      throw new NotFoundException('Project not found or does not belong to the workspace.');
    }
  
    const updatedProject = await projectRepository.updateById(projectId, updates);
    return updatedProject; 
  };
