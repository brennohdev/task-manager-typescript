import { ITaskRepository } from '../../../domain/repositories/task';
import { Task } from '../../../domain/entities/Task';
import TaskModel, { TaskDocument } from '../models/task';
import { Types, ClientSession } from 'mongoose';

export class TaskRepository implements ITaskRepository {
  async create(task: Omit<Task, 'id'>, session?: ClientSession): Promise<Task> {
    const doc = await TaskModel.create(
      [
        {
          taskCode: task.taskCode,
          tittle: task.tittle,
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

  async findById(id: Types.ObjectId): Promise<Task | null> {
    const doc = await TaskModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async findByProject(projectId: Types.ObjectId): Promise<Task[]> {
    const docs = await TaskModel.find({ project: projectId });
    return docs.map((doc) => this.toEntity(doc));
  }

  async findByWorkspace(workspaceId: Types.ObjectId): Promise<Task[]> {
    const docs = await TaskModel.find({ workspace: workspaceId });
    return docs.map((doc) => this.toEntity(doc));
  }

  async update(task: Task, session?: ClientSession): Promise<void> {
    await TaskModel.findByIdAndUpdate(
      task.id,
      {
        taskCode: task.taskCode,
        tittle: task.tittle,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignedTo: task.assignedTo,
        dueDate: task.dueDate,
      },
      { session },
    );
  }

  async delete(id: Types.ObjectId): Promise<void> {
    await TaskModel.findByIdAndDelete(id);
  }

  private toEntity(doc: TaskDocument): Task {
    return new Task(
      doc.taskCode,
      doc.tittle,
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
