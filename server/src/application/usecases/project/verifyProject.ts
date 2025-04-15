import { ClientSession, Types } from "mongoose";
import { ProjectRepository } from "../../../infrastructure/database/repositories/project";
import { NotFoundException } from "../../../shared/utils/appError";

export const validateProject = async (projectId: string, workspaceId: string, session?: ClientSession) => {
    const projectRepo = new ProjectRepository();
    const foundProject = await projectRepo.findById(new Types.ObjectId(projectId));
    if (!foundProject || foundProject.workspace.toString() !== workspaceId) {
      throw new NotFoundException('Project not found or does not belong to this workspace');
    }
    return foundProject;
  };