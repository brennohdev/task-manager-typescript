import { TaskStatusEnum, TaskPriorityEnum } from '../../domain/enums/taskStatus';
import mongoose, { Types } from 'mongoose';
import { Task } from '../../domain/entities/Task';
import { MemberRepository } from '../../infrastructure/database/repositories/member';
import { ProjectRepository } from '../../infrastructure/database/repositories/project';
import { TaskRepository } from '../../infrastructure/database/repositories/task';
import { NotFoundException } from '../../shared/utils/appError';
import { generateTaskCode } from '../../shared/utils/generateInviteCode';
import { validateMember } from '../usecases/member/validateMember';
import { validateProject } from '../usecases/project/verifyProject';
import { createTaskUseCase } from '../usecases/task/createTask';
import { generateTaskCodeUseCase } from '../usecases/task/generateTaskCode';

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

    if (assignedTo) {
      await validateMember(assignedTo, workspace, session);
    }

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
    throw error; // Lidar com o erro conforme necessário
  } finally {
    session.endSession();
  }
};
/* 
    Get all Tasks by Workspace
1. Return all tasks that belong to a specific workspace
2. Supports filtering by status, priority, and search by title

    Business rules
Only members of the workspace can see tasks
*/

/* 
    Get Task by ID
1. Return the full task details by task ID
2. Populate project, assigned members, and creator

    Business rules
Only members of the workspace can access task details
*/

/* 
    Update Task by ID
1. Update task fields (title, description, status, due date, etc.)

    Business rules
Only members of the workspace can update tasks
*/

/* 
    Delete Task by ID
1. Delete a task permanently from the workspace

    Business rules
Only the user who created the task can delete it
*/

/* 
    Get Tasks by Project ID
1. Return all tasks that are linked to a specific project
2. Useful for project dashboards or Kanban views

    Business rules
Only members of the workspace/project can view the tasks
*/

/* 
    Change Task Status
1. Change the current status of a task (e.g., from TODO to DONE)

    Business rules
Only assigned members or the creator can change the status
*/
