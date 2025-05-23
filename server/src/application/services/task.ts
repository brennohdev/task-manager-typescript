import {
  TaskStatusEnum,
  TaskPriorityEnum,
  TaskPriorityEnumType,
  TaskStatusEnumType,
} from '../../domain/enums/taskStatus';
import mongoose, { Types } from 'mongoose';
import { Task } from '../../domain/entities/Task';
import { validateMember } from '../usecases/member/validateMember';
import { validateProject } from '../usecases/project/verifyProject';
import { createTaskUseCase } from '../usecases/task/createTask';
import { generateTaskCodeUseCase } from '../usecases/task/generateTaskCode';
import { validateTaskBelongsToProject } from '../usecases/task/validateTaskBelongsToProject';
import { TaskRepository } from '../../infrastructure/database/repositories/task';
import { BadRequestException, NotFoundException } from '../../shared/utils/appError';
import ProjectModel from '../../infrastructure/database/models/project';
import TaskModel from '../../infrastructure/database/models/task';
import { getAccessLevelInWorkspace } from '../usecases/member/checkUserInWorkspace';
import { MemberRepository } from '../../infrastructure/database/repositories/member';
import { ProjectRepository } from '../../infrastructure/database/repositories/project';
import { validateProjectBelongsToWorkspace } from '../usecases/project/validateProjectBelongsToWorkspace';
import { getTaskByIdWithDetailsUseCase } from '../usecases/task/getTaskById';
import { deleteTask } from '../usecases/task/deleteTask';
import { ITaskRepository } from '../../domain/repositories/task';

interface CreateTaskInput {
  workspace: string;
  project: string;
  createdBy: string;
  title: string;
  description?: string;
  priority: keyof typeof TaskPriorityEnum;
  status: keyof typeof TaskStatusEnum;
  assignedTo?: string | null;
  dueDate?: string;
}

interface Filters {
  projectId?: string;
  status?: string[];
  priority?: string[];
  assignedTo?: string[];
  keyword?: string;
  dueDate?: string;
}

interface Pagination {
  pageSize: number;
  pageNumber: number;
}

export const createTaskService = async (input: CreateTaskInput) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      workspace,
      project,
      createdBy,
      title,
      description,
      priority,
      status,
      assignedTo,
      dueDate,
    } = input;

    await validateProject(project, workspace, session);

    const generatedCode = generateTaskCodeUseCase();

    const taskEntity = new Task(
      generatedCode,
      title,
      description || null,
      new Types.ObjectId(project),
      new Types.ObjectId(workspace),
      status,
      priority,
      assignedTo ? new Types.ObjectId(assignedTo) : null,
      new Types.ObjectId(createdBy),
      dueDate ? new Date(dueDate) : null,
    );

    const createdTask = await createTaskUseCase(taskEntity, session);

    await session.commitTransaction();
    return createdTask;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

interface UpdateTaskInput {
  taskId: string;
  title?: string;
  description?: string | null;
  priority?: keyof typeof TaskPriorityEnum;
  status?: keyof typeof TaskStatusEnum;
  assignedTo?: string | null;
  dueDate?: string;
}

export const updateTaskService = async (input: UpdateTaskInput) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const taskRepository = new TaskRepository();
    const { taskId, title, description, priority, status, assignedTo, dueDate } = input;

    // Verifica se a tarefa existe
    const existingTask = await taskRepository.findById(new Types.ObjectId(taskId), session);
    if (!existingTask) {
      throw new NotFoundException('Task not found.');
    }

    // Atualiza os campos da tarefa
    const updatedTask = new Task(
      existingTask.taskCode,
      title ?? existingTask.title,
      description ?? existingTask.description,
      existingTask.project,
      existingTask.workspace,
      status ?? existingTask.status,
      priority ?? existingTask.priority,
      assignedTo ? new Types.ObjectId(assignedTo) : existingTask.assignedTo,
      existingTask.createdBy,
      dueDate ? new Date(dueDate) : existingTask.dueDate,
      existingTask.createdAt,
      new Date(), // Atualiza a data de modificação
      existingTask.id,
    );

    await taskRepository.update(updatedTask, session);

    await session.commitTransaction();
    return updatedTask;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getAllTasksService = async (
  workspaceId: string,
  filters: Filters,
  pagination: Pagination,
): Promise<{
  tasks: Task[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    totalPages: number;
    skip: number;
  };
}> => {
  const taskRepository = new TaskRepository();

  const query: Record<string, any> = {
    workspace: workspaceId,
  };

  if (filters.projectId) {
    query.project = filters.projectId;
  }

  if (filters.status?.length) {
    query.status = { $in: filters.status };
  }

  if (filters.priority?.length) {
    query.priority = { $in: filters.priority };
  }

  if (filters.assignedTo?.length) {
    query.assignedTo = { $in: filters.assignedTo };
  }

  if (filters.keyword) {
    query.title = { $regex: filters.keyword, $options: 'i' };
  }

  if (filters.dueDate) {
    const date = new Date(filters.dueDate);
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    query.dueDate = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }

  const { pageSize, pageNumber } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const [tasks, totalCount] = await Promise.all([
    taskRepository.findManyWithPagination(query, skip, pageSize),
    taskRepository.count(query),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    tasks,
    pagination: {
      pageSize,
      pageNumber,
      totalCount,
      totalPages,
      skip,
    },
  };
};

/* 
    Get Task by ID
1. Return the full task details by task ID
2. Populate project, assigned members, and creator

    Business rules
Only members of the workspace can access task details
*/

export const getTaskByIdService = async (
  workspaceId: string,
  projectId: string,
  taskId: string,
) => {
  const projectRepository = new ProjectRepository();
  const taskRepository = new TaskRepository();

  await validateProjectBelongsToWorkspace(projectId, workspaceId, projectRepository);

  const task = await getTaskByIdWithDetailsUseCase(taskId, projectId, workspaceId, taskRepository);
  if (!task) {
    throw new NotFoundException('Task not found.');
  }

  return task;
};

/* 
    Delete Task by ID
1. Delete a task permanently from the workspace

    Business rules
Only the user who created the task can delete it
*/

export const deleteTaskService = async (workspaceId: string, taskId: string, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await deleteTask(workspaceId, taskId, userId);

    await session.commitTransaction();
    return;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
