import { ITaskRepository } from '../../../domain/repositories/task';
import { Task } from '../../../domain/entities/Task';
import TaskModel, { TaskDocument } from '../models/task';
import { Types, ClientSession } from 'mongoose';
import { TaskStatusEnum } from '../../../domain/enums/taskStatus';

export class TaskRepository implements ITaskRepository {
  async create(task: Omit<Task, 'id'>, session?: ClientSession): Promise<Task> {
    const doc = await TaskModel.create(
      [
        {
          taskCode: task.taskCode,
          title: task.title,
          description: task.description,
          project: task.project,
          workspace: task.workspace,
          status: task.status,
          priority: task.priority,
          assignedTo: task.assignedTo,
          createdBy: task.createdBy,
          dueDate: task.dueDate,
        },
      ],
      { session },
    );

    return this.toEntity(doc[0]);
  }

  async findById(id: Types.ObjectId, session?: ClientSession): Promise<Task | null> {
    const doc = await TaskModel.findById(id).session(session || null);
    return doc ? this.toEntity(doc) : null;
  }

  async findManyWithPagination(
    query: Record<string, any>,
    skip: number,
    limit: number
  ): Promise<Task[]> {
    const taskDocs = await TaskModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("assignedTo", "_id name profilePicture")
      .populate("project", "_id emoji name");
  
    return taskDocs.map((doc) => this.toEntity(doc));  
  }

  async count(query: Record<string, any>): Promise<number> {
    return TaskModel.countDocuments(query);
  }

  async findByIdWithDetails(taskId: string, projectId: string, workspaceId: string) {
    const task = await TaskModel.findOne({
      _id: taskId,
      project: projectId,
      workspace: workspaceId,
    }).populate("assignedTo", "_id name profilePicture ");
  
    return task ? this.toEntity(task) : null;
  }


  async countTotalTasks(workspaceId: Types.ObjectId): Promise<number> {
    return await TaskModel.countDocuments({ workspace: workspaceId });
  }

  async countOverdueTasks(workspaceId: Types.ObjectId, currentDate: Date): Promise<number> {
    return await TaskModel.countDocuments({
      workspace: workspaceId,
      dueDate: { $lt: currentDate },
      status: { $ne: TaskStatusEnum.DONE },
    });
  }

  async countCompletedTasks(workspaceId: Types.ObjectId): Promise<number> {
    return await TaskModel.countDocuments({
      workspace: workspaceId,
      status: TaskStatusEnum.DONE,
    });
  }

  async findByProject(projectId: Types.ObjectId): Promise<Task[]> {
    const docs = await TaskModel.find({ project: projectId });
    return docs.map((doc) => this.toEntity(doc));
  }

  async findByWorkspace(workspaceId: Types.ObjectId): Promise<Task[]> {
    const docs = await TaskModel.find({ workspace: workspaceId });
    return docs.map((doc) => this.toEntity(doc));
  }

  async deleteManyByWorkspaceId(
    workspaceId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<void> {
    await TaskModel.deleteMany({ workspace: workspaceId }).session(session || null);
  }

  async deleteManyByProject(projectId: string, session?: ClientSession): Promise<void> {
    await TaskModel.deleteMany({ project: projectId }).session(session || null);
  }

  async update(task: Task, session?: ClientSession): Promise<void> {
    await TaskModel.findByIdAndUpdate(
      task.id,
      {
        taskCode: task.taskCode,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignedTo: task.assignedTo,
        dueDate: task.dueDate,
      },
      { session },
    );
  }

  async delete(id: Types.ObjectId, session?: ClientSession): Promise<void> {
    await TaskModel.findByIdAndDelete(id).session(session || null);
  }

  private toEntity(doc: TaskDocument): Task {
    return new Task(
      doc.taskCode,
      doc.title,
      doc.description,
      doc.project,
      doc.workspace,
      doc.status,
      doc.priority,
      doc.assignedTo,
      doc.createdBy,
      doc.dueDate,
      doc.createdAt,
      doc.updatedAt,
      doc.id,
    );
  }
}
