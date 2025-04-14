import mongoose from 'mongoose';
import { ProjectRepository } from '../../../infrastructure/database/repositories/project';
import { getAccessLevelInWorkspace } from '../member/checkUserInWorkspace';
import { NotFoundException } from '../../../shared/utils/appError';
import TaskModel from '../../../infrastructure/database/models/task';
import { TaskStatusEnum } from '../../../domain/enums/taskStatus';

export const getProjectAnalytics = async (
  userId: string,
  workspaceId: string,
  projectId: string,
) => {
  const projectRepository = new ProjectRepository();
  const projectObjectId = new mongoose.Types.ObjectId(projectId);

  await getAccessLevelInWorkspace(userId, workspaceId);

  const project = await projectRepository.findById(projectObjectId);
  if (!project) {
    throw new NotFoundException('Project not found or does not belong to this workspace.');
  }

  const currentDate = new Date();
  const taskAnalytics = await TaskModel.aggregate([
    {
      $match: {
        project: new mongoose.Types.ObjectId(projectId),
      },
    },
    {
      $facet: {
        totalTasks: [{ $count: 'count' }],
        overdueTasks: [
          {
            $match: {
              dueDate: { $lt: currentDate },
              status: { $ne: TaskStatusEnum.DONE },
            },
          },
          { $count: 'count' },
        ],
        completedTasks: [
          {
            $match: {
              status: TaskStatusEnum.DONE,
            },
          },
          { $count: 'count' },
        ],
      },
    },
  ]);

  const _analytics = taskAnalytics[0];

  const analytics = {
    totalTasks: _analytics.totalTasks[0]?.count || 0,
    overdueTasks: _analytics.overdueTasks[0]?.count || 0,
    completedTasks: _analytics.completedTasks[0]?.count || 0,
  };

  return { analytics };
};
